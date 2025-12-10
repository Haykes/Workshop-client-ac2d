export interface ReportDto {
        id: number;
        userId: number;
}

export interface ReportEntryDto {
        id: number;
        reportId: number;
        fieldId: number;
        fieldOptionId?: number | null;
        expectedResult: string;
        actualResult: string;
        comment?: string | null;
        testedAt: string;
}

export interface HydraCollectionDto<T> {
        "hydra:member": T[];
        "hydra:totalItems"?: number;
}

export type ReportListResponseDto = HydraCollectionDto<ReportDto>;
export type ReportEntryListResponseDto = HydraCollectionDto<ReportEntryDto>;

export interface CreateReportRequestDto {
        selection: string[];
        expectedResult: string;
        actualResult: string;
        comment?: string;
}
