import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
	CreateReportRequestDto,
	ReportDto,
} from "@/interfaces/dtos/reports";

export function useReports(page: number = 1) {
	return useQuery({
		queryKey: ["reports", page],
		queryFn: async () => {
			// Mock data for demo - replace with real API call
			await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay

			const mockReports: ReportDto[] = [
				{
					id: 1,
					createdAt: "2025-01-15T10:30:00Z",
					status: "validated",
					title: "Test tension Phase 1",
				},
				{
					id: 2,
					createdAt: "2025-01-15T14:20:00Z",
					status: "pending",
					title: "Test courant Phase 2",
				},
				{
					id: 3,
					createdAt: "2025-01-14T16:45:00Z",
					status: "validated",
					title: "Test continuité Phase-Neutre",
				},
				{
					id: 4,
					createdAt: "2025-01-14T09:15:00Z",
					status: "rejected",
					title: "Test résistance Prise de terre",
				},
				{
					id: 5,
					createdAt: "2025-01-13T11:30:00Z",
					status: "validated",
					title: "Test température Armoire",
				},
			];

			return {
				"hydra:member": mockReports,
				"hydra:totalItems": mockReports.length,
			};
		},
		staleTime: 30_000,
	});
}

export function useCreateReport() {
	const qc = useQueryClient();
	return useMutation({
		mutationKey: ["create-report"],
		mutationFn: async (payload: CreateReportRequestDto) => {
			// Mock creation for demo - replace with real API call
			await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay

			const newReport: ReportDto = {
				id: Math.floor(Math.random() * 1000) + 100,
				createdAt: new Date().toISOString(),
				status: "pending",
				title: payload.selection.join(", "),
			};

			return newReport;
		},
		onSuccess: async () => {
			await qc.invalidateQueries({ queryKey: ["reports"] });
		},
	});
}

export function useDashboardKpis() {
	return useQuery({
		queryKey: ["kpis"],
		queryFn: async () => {
			// Mock KPIs for demo - replace with real API call
			await new Promise((resolve) => setTimeout(resolve, 300)); // Simulate network delay

			return {
				total: 42,
				pending: 5,
				validated: 37,
			} as const;
		},
		staleTime: 30_000,
	});
}
