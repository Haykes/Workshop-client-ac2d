import { AppShell } from "@/interfaces/components/layout/AppShell";
import {
        Box,
        Button,
        Heading,
        Input,
        Textarea,
        HStack,
        Text,
        Select,
        VStack,
} from "@chakra-ui/react";
import type { ReactNode } from "react";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { RequireAuth } from "@/interfaces/components/auth/RequireAuth";
import { toaster } from "@/interfaces/components/ui/Toaster";
import { useFieldOptionGroups } from "@/interfaces/hooks/useFields";

interface SelectionState {
        fieldId: number;
        optionId?: number;
}

type Step = 1 | 2 | 3;

// Composant FormControl custom
const FormControl = ({
        children,
        ...props
}: {
        children: ReactNode;
        [key: string]: unknown;
}) => (
        <Box w="full" {...props}>
                {children}
        </Box>
);

// Composant FormLabel custom
const FormLabel = ({
        children,
        ...props
}: {
        children: ReactNode;
        [key: string]: unknown;
}) => (
        <Text fontSize="sm" fontWeight="medium" mb={2} {...props}>
                {children}
        </Text>
);

export default function BulletinCreatePage() {
        const [step, setStep] = useState<Step>(1);
        const [selections, setSelections] = useState<SelectionState[]>([]);
        const [expectedResult, setExpectedResult] = useState("");
        const [actualResult, setActualResult] = useState("");
        const [comment, setComment] = useState("");

        const now = useMemo(
                () =>
                        new Date().toLocaleString("fr-FR", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                                timeZoneName: "short",
                        }),
                []
        );

        const handleSubmit = () => {
                const summary = {
                        selections: selections.map((sel) => sel.optionId ?? null),
                        expectedResult,
                        actualResult,
                        comment: comment || null,
                };

                toaster.create({
                        title: "Création non disponible côté API",
                        description:
                                "L'API Symfony expose uniquement les lectures pour l'instant. Ajoutez un POST /api/reports pour activer la soumission.",
                        status: "info",
                });

                console.info("Submission payload prêt pour l'API:", summary);
        };

        return (
        <AppShell>
                <RequireAuth>
                        <Heading size="lg" mb={6}>
                                Création d&apos;un bulletin
                        </Heading>
                        <Box
                                mb={6}
                                borderRadius="lg"
                                borderWidth="1px"
                                borderColor="blue.200"
                                bg="blue.50"
                                p={4}>
                                <Heading as="h3" size="sm" mb={1} color="blue.900">
                                        API en lecture seule
                                </Heading>
                                <Text fontSize="sm" color="blue.900">
                                        La création nécessite un endpoint POST sur /api/reports. Les sélections et valeurs saisies sont préparées,
                                        mais aucune requête n&apos;est envoyée tant que le backend ne l&apos;expose pas.
                                </Text>
                        </Box>
                        {/* Progress simplified */}
                                <HStack mb={6}>
                                        <Box flex={1} h="1" bg={step >= 1 ? "primary" : "gray.200"} />
                                        <Box flex={1} h="1" bg={step >= 2 ? "primary" : "gray.200"} />
                                        <Box flex={1} h="1" bg={step >= 3 ? "primary" : "gray.200"} />
                                </HStack>
                                {step === 1 && (
                                        <StepSelection
                                                selections={selections}
                                                setSelections={setSelections}
                                        />
                                )}
                                {step === 2 && (
                                        <StepResults
                                                expectedResult={expectedResult}
                                                actualResult={actualResult}
                                                onChangeExpected={setExpectedResult}
                                                onChangeActual={setActualResult}
                                        />
                                )}
                                {step === 3 && (
                                        <StepComment
                                                comment={comment}
                                                onChange={setComment}
                                                now={now}
                                        />
                                )}
                                <Box mt={8} display="flex" justifyContent="space-between">
                                        <Button
                                                onClick={() => setStep((s) => (s > 1 ? ((s - 1) as Step) : s))}
                                                variant="subtle"
                                                disabled={step === 1}>
                                                Précédent
                                        </Button>
                                        <Button
                                                colorScheme="blue"
                                                onClick={() => {
                                                        if (step < 3) {
                                                                setStep((s) => (s + 1) as Step);
                                                                return;
                                                        }
                                                        handleSubmit();
                                                }}>
                                                {step === 3 ? "Préparer l'envoi" : "Suivant"}
                                        </Button>
                                </Box>
                        </RequireAuth>
                </AppShell>
        );
}

function StepSelection({
        selections,
        setSelections,
}: {
        selections: SelectionState[];
        setSelections: Dispatch<SetStateAction<SelectionState[]>>;
}) {
        const { data: groupedFields, isLoading } = useFieldOptionGroups();

        const updateSelection = (fieldId: number, optionId?: number) => {
                        setSelections((prev) => {
                                const next = prev.filter((s) => s.fieldId !== fieldId);
                                return [...next, { fieldId, optionId }];
                        });
                };

        return (
                <Box display="grid" gap={4}>
                        {isLoading && (
                                <FormControl>
                                        <FormLabel>Chargement des champs…</FormLabel>
                                        <Select placeholder="Chargement" isDisabled />
                                </FormControl>
                        )}

                        {!isLoading && groupedFields?.length === 0 && (
                                <FormControl>
                                        <FormLabel>Aucun champ disponible</FormLabel>
                                        <Select placeholder="Aucune donnée" isDisabled />
                                </FormControl>
                        )}

                        {groupedFields?.map((field) => {
                                const selected = selections.find((s) => s.fieldId === field.id)?.optionId;
                                return (
                                        <FormControl key={field.id}>
                                                <FormLabel>{field.label}</FormLabel>
                                                <Select
                                                        placeholder="Sélectionner une option"
                                                        value={selected ?? ""}
                                                        onChange={(e) =>
                                                                updateSelection(
                                                                        field.id,
                                                                        e.target.value ? Number(e.target.value) : undefined
                                                                )
                                                        }
                                                        isDisabled={field.options.length === 0}>
                                                        <option value="">Aucune</option>
                                                        {field.options.map((option) => (
                                                                <option key={option.id} value={option.id}>
                                                                        {option.label}
                                                                </option>
                                                        ))}
                                                </Select>
                                        </FormControl>
                                );
                        })}
                </Box>
        );
}

function StepResults({
        expectedResult,
        actualResult,
        onChangeExpected,
        onChangeActual,
}: {
        expectedResult: string;
        actualResult: string;
        onChangeExpected: (value: string) => void;
        onChangeActual: (value: string) => void;
}) {
        return (
                <Box display="grid" gap={4}>
                        <FormControl>
                                <FormLabel>Résultat attendu</FormLabel>
                                <Input
                                        placeholder="Ex: 230V, 16A, 0.5Ω..."
                                        value={expectedResult}
                                        onChange={(e) => onChangeExpected(e.target.value)}
                                />
                        </FormControl>
                        <FormControl>
                                <FormLabel>Résultat obtenu</FormLabel>
                                <Input
                                        placeholder="Ex: 228V, 15.8A, 0.6Ω..."
                                        value={actualResult}
                                        onChange={(e) => onChangeActual(e.target.value)}
                                />
                        </FormControl>
                </Box>
        );
}

function StepComment({
        comment,
        onChange,
        now,
}: {
        comment: string;
        onChange: (value: string) => void;
        now: string;
}) {
        return (
                <VStack align="stretch" spacing={4}>
                        <FormControl>
                                <FormLabel>Commentaire</FormLabel>
                                <Textarea
                                        rows={3}
                                        placeholder="Observations, remarques particulières..."
                                        value={comment}
                                        onChange={(e) => onChange(e.target.value)}
                                />
                        </FormControl>
                        <FormControl>
                                <FormLabel>Date et heure du test</FormLabel>
                                <Input readOnly value={now} />
                        </FormControl>
                </VStack>
        );
}
