export interface FieldDto {
        id: number;
        label: string;
}

export interface FieldOptionDto {
        id: number;
        fieldId: number;
        label: string;
}

export interface HydraCollectionDto<T> {
        "hydra:member": T[];
        "hydra:totalItems"?: number;
}

export type FieldListResponseDto = HydraCollectionDto<FieldDto>;
export type FieldOptionListResponseDto = HydraCollectionDto<FieldOptionDto>;
