import { Box, Button, Input, VStack, Heading, Text } from "@chakra-ui/react";
import { toaster } from "@/interfaces/components/ui/Toaster";
import { useState } from "react";
import { useLogin } from "@/interfaces/hooks/useAuth";
import { useRouter } from "next/router";

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

export function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const login = useLogin();
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		await login
			.mutateAsync({ username: email, password })
			.then(async (res: { success: boolean; user: unknown }) => {
				if (res.success) {
					toaster.create({
						title: "Connecté",
						status: "success",
					});
					await router.push("/dashboard");
				} else {
					toaster.create({
						title: "Échec de connexion",
						status: "error",
					});
				}
			})
			.catch(() =>
				toaster.create({
					title: "Erreur serveur",
					status: "error",
				})
			);
	};

	return (
		<Box
			minH="100vh"
			display="flex"
			alignItems="center"
			justifyContent="center"
			bg="gray.50"
			px={4}>
			<Box w="full" maxW="md" bg="white" p={8} rounded="md" shadow="md">
				<Heading size="lg" mb={6} textAlign="center">
					Connexion
				</Heading>
				<Box
					mb={4}
					p={3}
					bg="blue.50"
					rounded="md"
					border="1px"
					borderColor="blue.200">
					<Text fontSize="sm" color="blue.700" fontWeight="medium">
						Compte de test :
					</Text>
					<Text fontSize="xs" color="blue.600">
						Email: admin@ac2d.com
						<br />
						Mot de passe: admin
					</Text>
				</Box>

				<form onSubmit={handleSubmit}>
					<VStack gap={4}>
						<FormControl>
							<FormLabel>Email</FormLabel>
							<Input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</FormControl>

						<FormControl>
							<FormLabel>Mot de passe</FormLabel>
							<Input
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</FormControl>

						<Button
							type="submit"
							colorScheme="blue"
							width="full"
							loading={login.isPending}>
							Se connecter
						</Button>
					</VStack>
				</form>
			</Box>
		</Box>
	);
}
