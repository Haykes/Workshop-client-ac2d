import { AppShell } from "@/interfaces/components/layout/AppShell";
import { Heading, SimpleGrid, Box, Text, Skeleton, Button, HStack } from "@chakra-ui/react";
import { useDashboardKpis } from "@/interfaces/hooks/useReports";
import { RequireAuth } from "@/interfaces/components/auth/RequireAuth";
import { toaster } from "@/interfaces/components/ui/Toaster";

// Composants Stat custom pour remplacer ceux de Chakra UI v2
const StatRoot = ({
	children,
	...props
}: {
	children: React.ReactNode;
	[key: string]: unknown;
}) => (
	<Box rounded="xl" bg="white" p={5} shadow="sm" {...props}>
		{children}
	</Box>
);

const StatLabel = ({
	children,
	...props
}: {
	children: React.ReactNode;
	[key: string]: unknown;
}) => (
	<Text fontSize="sm" color="gray.500" fontWeight="medium" mb={2} {...props}>
		{children}
	</Text>
);

const StatNumber = ({
	children,
	...props
}: {
	children: React.ReactNode;
	[key: string]: unknown;
}) => (
	<Text fontSize="3xl" fontWeight="bold" color="gray.900" {...props}>
		{children}
	</Text>
);

export default function DashboardPage() {
	const { data, isLoading } = useDashboardKpis();

	const testNotifications = () => {
		toaster.create({
			title: "Notification de test",
			description: "Ceci est une notification de démonstration",
			status: "info",
		});
		
		setTimeout(() => {
			toaster.create({
				title: "Succès",
				description: "Opération réussie avec succès",
				status: "success",
			});
		}, 1000);
		
		setTimeout(() => {
			toaster.create({
				title: "Attention",
				description: "Une erreur s'est produite",
				status: "error",
			});
		}, 2000);
	};

	return (
		<AppShell>
			<RequireAuth>
				<HStack justifyContent="space-between" mb={6}>
					<Heading size="lg">
						Tableau de bord
					</Heading>
					<Button 
						colorScheme="blue" 
						variant="outline" 
						size="sm"
						onClick={testNotifications}
					>
						Test Notifications
					</Button>
				</HStack>
				<SimpleGrid
					columns={{ base: 1, sm: 2, lg: 3 }}
					gap={{ base: 4, md: 6 }}>
					<StatRoot>
						<StatLabel>Bulletins créés</StatLabel>
						{isLoading ? (
							<Skeleton height="36px" />
						) : (
							<StatNumber>{data?.total ?? 0}</StatNumber>
						)}
					</StatRoot>
					<StatRoot>
						<StatLabel>Tests en attente</StatLabel>
						{isLoading ? (
							<Skeleton height="36px" />
						) : (
							<StatNumber>{data?.pending ?? 0}</StatNumber>
						)}
					</StatRoot>
					<StatRoot>
						<StatLabel>Bulletins validés</StatLabel>
						{isLoading ? (
							<Skeleton height="36px" />
						) : (
							<StatNumber>{data?.validated ?? 0}</StatNumber>
						)}
					</StatRoot>
				</SimpleGrid>
			</RequireAuth>
		</AppShell>
	);
}
