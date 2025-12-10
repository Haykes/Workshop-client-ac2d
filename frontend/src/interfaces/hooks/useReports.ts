import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { httpClient } from "@/shared/api/httpClient";
import type {
        CreateReportRequestDto,
        ReportDto,
        ReportEntryDto,
        ReportEntryListResponseDto,
        ReportListResponseDto,
} from "@/interfaces/dtos/reports";

export function useReports(page: number = 1) {
        return useQuery({
                queryKey: ["reports", page],
                queryFn: async () => {
                        const { data } = await httpClient.get<ReportListResponseDto>(
                                "/api/reports",
                                { params: { page } }
                        );

                        return data;
                },
                staleTime: 30_000,
        });
}

export function useReportEntries(reportId?: number) {
        return useQuery({
                queryKey: ["reportEntries", reportId ?? "all"],
                queryFn: async () => {
                        const { data } = await httpClient.get<ReportEntryListResponseDto>(
                                "/api/report_entries",
                                {
                                        params: reportId ? { "report.id": reportId } : undefined,
                                }
                        );

                        return data;
                },
                staleTime: 30_000,
        });
}

export function useReportSummaries() {
        const { data: reports, ...reportsMeta } = useReports();
        const { data: entries, ...entriesMeta } = useReportEntries();

        const summaries = useMemo(() => {
                        if (!reports?.["hydra:member"]) return [];

                        const groupedEntries = new Map<
                                number,
                                { count: number; lastTestedAt?: string }
                        >();

                        entries?.["hydra:member"].forEach((entry: ReportEntryDto) => {
                                const current = groupedEntries.get(entry.reportId) ?? {
                                        count: 0,
                                };

                                const newerDate = current.lastTestedAt
                                        ? new Date(current.lastTestedAt) < new Date(entry.testedAt)
                                                ? entry.testedAt
                                                : current.lastTestedAt
                                        : entry.testedAt;

                                groupedEntries.set(entry.reportId, {
                                        count: current.count + 1,
                                        lastTestedAt: newerDate,
                                });
                        });

                        return reports["hydra:member"].map((report: ReportDto) => {
                                const entryStats = groupedEntries.get(report.id);

                                return {
                                        ...report,
                                        entriesCount: entryStats?.count ?? 0,
                                        lastTestedAt: entryStats?.lastTestedAt ?? null,
                                } as const;
                        });
                }, [entries, reports]);

        return {
                data: summaries,
                reports,
                entries,
                isLoading: reportsMeta.isLoading || entriesMeta.isLoading,
        };
}

export function useDashboardKpis() {
        const { data: reports, ...reportsMeta } = useReports();
        const { data: entries, ...entriesMeta } = useReportEntries();

        const kpis = useMemo(() => {
                const total =
                        reports?.["hydra:totalItems"] ??
                        reports?.["hydra:member"]?.length ??
                        0;

                const { pending, validated } = (entries?.["hydra:member"] ?? []).reduce(
                        (acc, entry: ReportEntryDto) => {
                                if (entry.actualResult === entry.expectedResult) {
                                        acc.validated += 1;
                                } else {
                                        acc.pending += 1;
                                }

                                return acc;
                        },
                        { pending: 0, validated: 0 }
                );

                return { total, pending, validated } as const;
        }, [entries, reports]);

        return { data: kpis, isLoading: reportsMeta.isLoading || entriesMeta.isLoading };
}

export function useCreateReport() {
        const qc = useQueryClient();
        return useMutation({
                mutationKey: ["create-report"],
                mutationFn: async (payload: CreateReportRequestDto) => {
                        const { data } = await httpClient.post("/api/reports", payload);
                        return data;
                },
                onSuccess: async () => {
                        await qc.invalidateQueries({ queryKey: ["reports"] });
                },
        });
}
