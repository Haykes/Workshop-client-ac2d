import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { httpClient } from "@/shared/api/httpClient";
import type {
        AuthUserDto,
        LoginRequestDto,
        LoginResponseDto,
        SessionResponseDto,
} from "@/interfaces/dtos/auth";

interface SessionState {
        user: AuthUserDto | null;
}

export function useSession() {
        return useQuery<SessionState>({
                queryKey: ["session"],
                queryFn: async () => {
                        try {
                                const { data } = await httpClient.get<SessionResponseDto>("/api/auth/me");

                                if (!data.authenticated || !data.user) {
                                        return { user: null };
                                }

                                return { user: data.user };
                        } catch (error) {
                                return { user: null };
                        }
                },
                retry: false,
                staleTime: 60_000,
                gcTime: 5 * 60_000,
        });
}

export function useLogin() {
        const queryClient = useQueryClient();
        return useMutation({
                mutationKey: ["login"],
                mutationFn: async (payload: LoginRequestDto) => {
                        try {
                                const { data } = await httpClient.post<LoginResponseDto>(
                                        "/api/auth/login",
                                        payload,
                                );

                                if (!data.success || !data.user) {
                                        throw new Error(data.message ?? "Identifiants invalides");
                                }

                                return data.user;
                        } catch (error) {
                                if (axios.isAxiosError(error)) {
                                        const message = (error.response?.data as LoginResponseDto | undefined)?.message;
                                        throw new Error(message ?? "Identifiants invalides");
                                }

                                throw error;
                        }
                },
                onSuccess: async (user) => {
                        await queryClient.setQueryData<SessionState>(["session"], { user });
                },
        });
}

export function useLogout() {
        const queryClient = useQueryClient();
        return useMutation({
                mutationKey: ["logout"],
                mutationFn: async () => {
                        await httpClient.post("/api/auth/logout");
                },
                onSuccess: async () => {
                        await queryClient.setQueryData<SessionState>(["session"], { user: null });
                },
        });
}
