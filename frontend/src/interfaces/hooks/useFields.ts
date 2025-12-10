import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { httpClient } from "@/shared/api/httpClient";
import type {
        FieldDto,
        FieldListResponseDto,
        FieldOptionDto,
        FieldOptionListResponseDto,
} from "@/interfaces/dtos/fields";

export function useFields() {
        return useQuery({
                queryKey: ["fields"],
                queryFn: async () => {
                        const { data } = await httpClient.get<FieldListResponseDto>("/api/fields");
                        return data;
                },
                staleTime: 120_000,
        });
}

export function useFieldOptions() {
        return useQuery({
                queryKey: ["fieldOptions"],
                queryFn: async () => {
                        const { data } = await httpClient.get<FieldOptionListResponseDto>(
                                "/api/field_options"
                        );
                        return data;
                },
                staleTime: 120_000,
        });
}

export function useFieldOptionGroups() {
        const { data: fields, ...fieldsMeta } = useFields();
        const { data: options, ...optionsMeta } = useFieldOptions();

        const groups = useMemo(() => {
                        if (!fields?.["hydra:member"]) return [];
                        const allOptions = options?.["hydra:member"] ?? [];

                        return fields["hydra:member"].map((field: FieldDto) => ({
                                ...field,
                                options: allOptions.filter(
                                        (option: FieldOptionDto) => option.fieldId === field.id
                                ),
                        }));
                }, [fields, options]);

        return {
                data: groups,
                isLoading: fieldsMeta.isLoading || optionsMeta.isLoading,
        };
}
