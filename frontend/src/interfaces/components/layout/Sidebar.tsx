import { Box, VStack, Button, HStack, Text } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/avatar";
import Link from "next/link";
import { useRouter } from "next/router";
import { useLogout, useSession } from "@/interfaces/hooks/useAuth";

export function Sidebar() {
        const router = useRouter();
        const { data } = useSession();
        const logout = useLogout();
        const isActive = (href: string): boolean => router.pathname === href;

        const handleLogout = async () => {
                await logout.mutateAsync();
                await router.push("/login");
        };

	return (
		<Box
			as="aside"
			display={{ base: "none", md: "flex" }}
			flexDir="column"
			w="64"
			bg="white"
			borderRightWidth="1px">
			<Box p={6}>
				<HStack>
					<Box w={8} h={8} bg="primary" rounded="md" />
					<Text fontSize="xl" fontWeight="semibold">
						AC2D
					</Text>
				</HStack>
			</Box>
			<VStack align="stretch" px={4} gap={2} flex={1}>
				<Link href="/dashboard">
					<Button
						variant={isActive("/dashboard") ? "solid" : "ghost"}
						justifyContent="flex-start">
						Dashboard
					</Button>
				</Link>
				<Link href="/bulletins">
					<Button
						variant={isActive("/bulletins") ? "solid" : "ghost"}
						justifyContent="flex-start">
						Bulletins
					</Button>
				</Link>
			</VStack>
                        <Box p={4} borderTopWidth="1px">
                                <HStack>
                                        <Avatar
                                                size="sm"
                                                name={
                                                        data?.user
                                                                ? `${data.user.firstName} ${data.user.lastName}`
                                                                : "Utilisateur"
                                                }
                                        />
                                        <Box>
                                                <Text fontSize="sm" fontWeight="medium">
                                                        {data?.user
                                                                ? `${data.user.firstName} ${data.user.lastName}`
                                                                : "Utilisateur"}
                                                </Text>
                                                <Text fontSize="xs" color="gray.500">
                                                        {data?.user?.roles?.[0] ?? "Connecté"}
                                                </Text>
                                        </Box>
                                </HStack>
                                <Button
                                        mt={3}
                                        size="sm"
                                        variant="ghost"
                                        colorScheme="red"
                                        onClick={() => void handleLogout()}>
                                        Déconnexion
                                </Button>
                        </Box>
                </Box>
        );
}
