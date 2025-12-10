export interface ReportDto {
	id: number;
	createdAt: string;
	status: "pending" | "validated" | "rejected";
	title?: string;
}

export interface ReportListResponseDto {
	"hydra:member": ReportDto[];
	"hydra:totalItems"?: number;
}

export interface CreateReportRequestDto {
	selection: string[];
	expectedResult: string;
	actualResult: string;
	comment?: string;
}
