import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { httpClient } from "@/shared/api/httpClient";
import type { LoginRequestDto } from "@/interfaces/dtos/auth";

interface SessionUser {
	id: number;
	email: string;
	name: string;
	roles: string[];
}

interface SessionState {
	user: SessionUser | null;
}

export function useSession() {
	return useQuery<SessionState>({
		queryKey: ["session"],
		queryFn: async () => {
			// Mock session for demo - replace with real API call
			return {
				user: {
					id: 1,
					email: "john.doe@ac2d.com",
					name: "John Doe",
					roles: ["technicien"],
				},
			};
		},
		staleTime: 60_000,
		gcTime: 5 * 60_000,
	});
}

export function useLogin() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ["login"],
		mutationFn: async (payload: LoginRequestDto) => {
			// Mock login for demo - replace with real API call
			await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay

			if (
				payload.username === "admin@ac2d.com" &&
				payload.password === "admin"
			) {
				return {
					success: true,
					user: {
						id: 1,
						email: "admin@ac2d.com",
						name: "Admin User",
						roles: ["admin", "technicien"],
					},
				};
			}

			return {
				success: false,
				user: null,
			};
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["session"] });
		},
	});
}

export function useLogout() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ["logout"],
		mutationFn: async () => {
			await httpClient.post("/logout");
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["session"] });
		},
	});
}
