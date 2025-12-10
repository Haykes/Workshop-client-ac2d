import { AppShell } from "@/interfaces/components/layout/AppShell";
import {
	Box,
	Button,
	Heading,
	Skeleton,
	TableRoot,
	TableBody,
	TableCell,
	TableColumnHeader,
	TableHeader,
	TableRow,
} from "@chakra-ui/react";
import Link from "next/link";
import { useReports } from "@/interfaces/hooks/useReports";
import { RequireAuth } from "@/interfaces/components/auth/RequireAuth";

export default function BulletinsListPage() {
	const { data, isLoading } = useReports(1);
	return (
		<AppShell>
			<RequireAuth>
				<Box
					display="flex"
					alignItems={{ base: "start", sm: "center" }}
					justifyContent="space-between"
					mb={6}
					gap={4}
					flexDir={{ base: "column", sm: "row" }}>
					<Heading size="lg">Gestion des bulletins</Heading>
					<Link href="/bulletins/new">
						<Button colorScheme="blue">Nouveau bulletin</Button>
					</Link>
				</Box>
				<Box overflowX="auto" bg="white" rounded="xl" shadow="sm">
					<TableRoot size="sm">
						<TableHeader>
							<TableRow>
								<TableColumnHeader>ID</TableColumnHeader>
								<TableColumnHeader>Catégorie</TableColumnHeader>
								<TableColumnHeader>Date</TableColumnHeader>
								<TableColumnHeader>Statut</TableColumnHeader>
							</TableRow>
						</TableHeader>
						<TableBody>
							{isLoading && (
								<TableRow>
									<TableCell colSpan={4}>
										<Skeleton height="24px" />
									</TableCell>
								</TableRow>
							)}
							{!isLoading &&
								data?.["hydra:member"].map(
									(r: {
										id: number;
										title?: string;
										createdAt: string;
										status: string;
									}) => (
										<TableRow key={r.id}>
											<TableCell>#{r.id}</TableCell>
											<TableCell>{r.title ?? "-"}</TableCell>
											<TableCell>
												{new Date(r.createdAt).toLocaleDateString("fr-FR")}
											</TableCell>
											<TableCell>
												<Box
													as="span"
													px={2}
													py={1}
													rounded="full"
													fontSize="xs"
													fontWeight="medium"
													bg={
														r.status === "validated"
															? "green.100"
															: r.status === "pending"
															? "yellow.100"
															: "red.100"
													}
													color={
														r.status === "validated"
															? "green.700"
															: r.status === "pending"
															? "yellow.700"
															: "red.700"
													}>
													{r.status === "validated"
														? "Validé"
														: r.status === "pending"
														? "En attente"
														: "Rejeté"}
												</Box>
											</TableCell>
										</TableRow>
									)
								)}
						</TableBody>
					</TableRoot>
				</Box>
			</RequireAuth>
		</AppShell>
	);
}
