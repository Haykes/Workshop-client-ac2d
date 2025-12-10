import {
	Button,
	Text,
	DialogRoot,
	DialogContent,
	DialogHeader,
	DialogBody,
	DialogFooter,
	DialogBackdrop,
	DialogTitle,
	DialogCloseTrigger,
} from "@chakra-ui/react";

interface ConfirmModalProps {
	isOpen: boolean;
	title: string;
	message: string;
	onConfirm: () => void;
	onClose: () => void;
}

export function ConfirmModal({
	isOpen,
	title,
	message,
	onConfirm,
	onClose,
}: ConfirmModalProps) {
	return (
		<DialogRoot open={isOpen} onOpenChange={(e) => !e.open && onClose()}>
			<DialogBackdrop />
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogCloseTrigger />
				</DialogHeader>
				<DialogBody>
					<Text>{message}</Text>
				</DialogBody>
				<DialogFooter>
					<Button variant="ghost" mr={3} onClick={onClose}>
						Annuler
					</Button>
					<Button colorScheme="red" onClick={onConfirm}>
						Confirmer
					</Button>
				</DialogFooter>
			</DialogContent>
		</DialogRoot>
	);
}
