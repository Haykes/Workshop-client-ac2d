import { AppShell } from "@/interfaces/components/layout/AppShell";
import {
	Box,
	Button,
	Heading,
	Input,
	Textarea,
	HStack,
	Text,
	NativeSelectRoot,
	NativeSelectField,
} from "@chakra-ui/react";
import { useState } from "react";
import { useCreateReport } from "@/interfaces/hooks/useReports";
import { useRouter } from "next/router";
import { RequireAuth } from "@/interfaces/components/auth/RequireAuth";
import { toaster } from "@/interfaces/components/ui/Toaster";

type Step = 1 | 2 | 3;

// Composant FormControl custom
const FormControl = ({
	children,
	...props
}: {
	children: React.ReactNode;
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
	children: React.ReactNode;
	[key: string]: unknown;
}) => (
	<Text fontSize="sm" fontWeight="medium" mb={2} {...props}>
		{children}
	</Text>
);

export default function BulletinCreatePage() {
	const [step, setStep] = useState<Step>(1);
	const createReport = useCreateReport();
	const router = useRouter();

	return (
		<AppShell>
			<RequireAuth>
				<Heading size="lg" mb={6}>
					Création d&apos;un bulletin
				</Heading>
				{/* Progress simplified */}
				<HStack mb={6}>
					<Box flex={1} h="1" bg={step >= 1 ? "primary" : "gray.200"} />
					<Box flex={1} h="1" bg={step >= 2 ? "primary" : "gray.200"} />
					<Box flex={1} h="1" bg={step >= 3 ? "primary" : "gray.200"} />
				</HStack>
				{step === 1 && <StepSelection />}
				{step === 2 && <StepResults />}
				{step === 3 && <StepComment />}
				<Box mt={8} display="flex" justifyContent="space-between">
					<Button
						onClick={() => setStep((s) => (s > 1 ? ((s - 1) as Step) : s))}
						variant="subtle"
						disabled={step === 1}>
						Précédent
					</Button>
					<Button
						colorScheme="blue"
						onClick={async () => {
							if (step < 3) {
								setStep((s) => (s + 1) as Step);
								return;
							}
							// Submit - demo payload; wire inputs if needed
							await createReport
								.mutateAsync({
									selection: ["phase-1"],
									expectedResult: "230V",
									actualResult: "230V",
									comment: "",
								})
								.then(async (r) => {
									toaster.create({
										title: "Bulletin créé",
										status: "success",
									});
									await router.push(`/bulletins/${r.id}`);
								})
								.catch(() =>
									toaster.create({
										title: "Erreur de création",
										status: "error",
									})
								);
						}}
						loading={createReport.isPending}>
						{step === 3 ? "Soumettre" : "Suivant"}
					</Button>
				</Box>
			</RequireAuth>
		</AppShell>
	);
}

function StepSelection() {
	return (
		<Box display="grid" gap={4}>
			<FormControl>
				<FormLabel>Tension</FormLabel>
				<NativeSelectRoot>
					<NativeSelectField placeholder="Sélectionner une option">
						<option value="phase-1">Phase 1</option>
						<option value="phase-2">Phase 2</option>
						<option value="phase-3">Phase 3</option>
						<option value="neutre">Neutre</option>
						<option value="terre">Terre</option>
					</NativeSelectField>
				</NativeSelectRoot>
			</FormControl>
			<FormControl>
				<FormLabel>Courant</FormLabel>
				<NativeSelectRoot>
					<NativeSelectField placeholder="Sélectionner une option">
						<option value="phase-1">Phase 1</option>
						<option value="phase-2">Phase 2</option>
						<option value="phase-3">Phase 3</option>
						<option value="neutre">Neutre</option>
					</NativeSelectField>
				</NativeSelectRoot>
			</FormControl>
		</Box>
	);
}

function StepResults() {
	return (
		<Box display="grid" gap={4}>
			<FormControl>
				<FormLabel>Résultat attendu</FormLabel>
				<Input placeholder="Ex: 230V, 16A, 0.5Ω..." />
			</FormControl>
			<FormControl>
				<FormLabel>Résultat obtenu</FormLabel>
				<Input placeholder="Ex: 228V, 15.8A, 0.6Ω..." />
			</FormControl>
		</Box>
	);
}

function StepComment() {
	const now = new Date().toLocaleString("fr-FR", {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		timeZoneName: "short",
	});
	return (
		<Box display="grid" gap={4}>
			<FormControl>
				<FormLabel>Commentaire</FormLabel>
				<Textarea
					rows={3}
					placeholder="Observations, remarques particulières..."
				/>
			</FormControl>
			<FormControl>
				<FormLabel>Date et heure du test</FormLabel>
				<Input readOnly defaultValue={now} />
			</FormControl>
		</Box>
	);
}
