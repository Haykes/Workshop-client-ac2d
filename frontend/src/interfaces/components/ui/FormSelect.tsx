import {
	Box,
	Text,
	NativeSelectRoot,
	NativeSelectField,
} from "@chakra-ui/react";
import { ChangeEvent } from "react";

interface Option {
	label: string;
	value: string;
}

interface FormSelectProps {
	id: string;
	label: string;
	value: string;
	options: ReadonlyArray<Option>;
	onChange: (value: string) => void;
}

// Composant FormControl custom
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

// Composant FormLabel custom
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

export function FormSelect({
	id,
	label,
	value,
	options,
	onChange,
	...rest
}: FormSelectProps) {
	const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
		onChange(e.target.value);
	};

	return (
		<FormControl id={id}>
			<FormLabel>{label}</FormLabel>
			<NativeSelectRoot>
				<NativeSelectField value={value} onChange={handleChange} {...rest}>
					<option value="">Sélectionner une option</option>
					{options.map((opt) => (
						<option key={opt.value} value={opt.value}>
							{opt.label}
						</option>
					))}
				</NativeSelectField>
			</NativeSelectRoot>
		</FormControl>
	);
}
