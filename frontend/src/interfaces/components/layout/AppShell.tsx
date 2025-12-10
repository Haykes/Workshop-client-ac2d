import { Box } from "@chakra-ui/react";
import { Sidebar } from "@/interfaces/components/layout/Sidebar";

interface AppShellProps {
	children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
	return (
		<Box minH="100vh" bg="gray.50" display={{ base: "block", md: "flex" }}>
			<Sidebar />
			<Box as="main" flex={1} p={{ base: 4, md: 6 }}>
				{children}
			</Box>
		</Box>
	);
}


