import { Box, Text, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";

interface Toast {
	id: string;
	title: string;
	description?: string;
	status: "success" | "error" | "info" | "warning";
}

let toasts: Toast[] = [];
let listeners: Array<() => void> = [];

const notify = () => {
	listeners.forEach(listener => listener());
};

export const toaster = {
	create: (toast: Omit<Toast, "id">) => {
		const id = Math.random().toString(36).substr(2, 9);
		toasts.push({ ...toast, id });
		notify();
		
		// Auto remove after 5 seconds
		setTimeout(() => {
			toasts = toasts.filter(t => t.id !== id);
			notify();
		}, 5000);
	}
};

export function ToasterContainer() {
	const [, forceUpdate] = useState({});

	useEffect(() => {
		const listener = () => forceUpdate({});
		listeners.push(listener);
		return () => {
			listeners = listeners.filter(l => l !== listener);
		};
	}, []);

	return (
		<Box
			position="fixed"
			top={4}
			right={4}
			zIndex={9999}
			display="flex"
			flexDirection="column"
			gap={2}
		>
			{toasts.map((toast) => (
				<ToastItem key={toast.id} toast={toast} />
			))}
		</Box>
	);
}

function ToastItem({ toast }: { toast: Toast }) {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		setTimeout(() => setIsVisible(true), 100);
	}, []);

	const handleClose = () => {
		setIsVisible(false);
		setTimeout(() => {
			toasts = toasts.filter(t => t.id !== toast.id);
			notify();
		}, 300);
	};

	const getStatusColor = (status: Toast["status"]) => {
		switch (status) {
			case "success": return { bg: "green.100", color: "green.800", border: "green.200" };
			case "error": return { bg: "red.100", color: "red.800", border: "red.200" };
			case "warning": return { bg: "yellow.100", color: "yellow.800", border: "yellow.200" };
			default: return { bg: "blue.100", color: "blue.800", border: "blue.200" };
		}
	};

	const colors = getStatusColor(toast.status);

	return (
		<Box
			bg={colors.bg}
			color={colors.color}
			border="1px"
			borderColor={colors.border}
			rounded="md"
			p={4}
			shadow="md"
			minW="300px"
			opacity={isVisible ? 1 : 0}
			transform={isVisible ? "translateX(0)" : "translateX(100%)"}
			transition="all 0.3s ease"
		>
			<Box display="flex" justifyContent="space-between" alignItems="flex-start">
				<Box flex={1}>
					<Text fontWeight="medium" fontSize="sm">
						{toast.title}
					</Text>
					{toast.description && (
						<Text fontSize="xs" mt={1} opacity={0.8}>
							{toast.description}
						</Text>
					)}
				</Box>
				<Button
					size="xs"
					variant="ghost"
					onClick={handleClose}
					ml={2}
					color={colors.color}
					_hover={{ bg: "rgba(0,0,0,0.1)" }}
				>
					×
				</Button>
			</Box>
		</Box>
	);
}
