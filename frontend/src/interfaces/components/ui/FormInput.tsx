import { Box, Text, Input, type InputProps } from "@chakra-ui/react";

interface FormInputProps extends Omit<InputProps, "onChange"> {
	id: string;
	label: string;
	value: string;
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

export function FormInput({
	id,
	label,
	value,
	onChange,
	...rest
}: FormInputProps) {
	return (
		<FormControl id={id}>
			<FormLabel>{label}</FormLabel>
			<Input
				value={value}
				onChange={(e) => onChange(e.target.value)}
				{...rest}
			/>
		</FormControl>
	);
}
