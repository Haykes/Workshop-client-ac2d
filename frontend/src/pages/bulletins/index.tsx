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
import { useReportSummaries } from "@/interfaces/hooks/useReports";
import { RequireAuth } from "@/interfaces/components/auth/RequireAuth";

export default function BulletinsListPage() {
        const { data, isLoading } = useReportSummaries();
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
                                                                <TableColumnHeader>Utilisateur</TableColumnHeader>
                                                                <TableColumnHeader>Date du dernier test</TableColumnHeader>
                                                                <TableColumnHeader>Nombre de mesures</TableColumnHeader>
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
                                                                data?.map(
                                                                        (r: {
                                                                                id: number;
                                                                                userId: number;
                                                                                entriesCount: number;
                                                                                lastTestedAt?: string | null;
                                                                        }) => (
                                                                                <TableRow key={r.id}>
                                                                                        <TableCell>#{r.id}</TableCell>
                                                                                        <TableCell>{r.userId}</TableCell>
                                                                                        <TableCell>
                                                                                                {r.lastTestedAt
                                                                                                        ? new Date(
                                                                                                                  r.lastTestedAt
                                                                                                          ).toLocaleString("fr-FR")
                                                                                                        : "-"}
                                                                                        </TableCell>
                                                                                        <TableCell>
                                                                                                {r.entriesCount}
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
