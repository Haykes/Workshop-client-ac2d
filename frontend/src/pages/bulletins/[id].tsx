import { AppShell } from "@/interfaces/components/layout/AppShell";
import { Box, Button, Heading, HStack, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { httpClient } from "@/shared/api/httpClient";

export default function BulletinPdfPage() {
	const router = useRouter();
	const { id } = router.query;
	const [blobUrl, setBlobUrl] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const controller = new AbortController();
		async function fetchPdf(resourceId: string) {
			try {
				setLoading(true);
				const res = await httpClient.get(`/api/reports/${resourceId}/pdf`, {
					responseType: "blob",
					signal: controller.signal,
				});
				const url = URL.createObjectURL(res.data);
				setBlobUrl(url);
			} finally {
				setLoading(false);
			}
		}
		if (typeof id === "string") void fetchPdf(id);
		return () => {
			controller.abort();
			if (blobUrl) URL.revokeObjectURL(blobUrl);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	const download = async () => {
		if (!blobUrl) return;
		const a = document.createElement("a");
		a.href = blobUrl;
		a.download = `bulletin-${id}.pdf`;
		a.click();
	};

	return (
		<AppShell>
			<HStack justifyContent="space-between" mb={4}>
				<Heading size="md">Bulletin #{String(id ?? "")} – PDF</Heading>
				<Button onClick={download} colorScheme="blue" disabled={!blobUrl}>
					Télécharger
				</Button>
			</HStack>
			<Box bg="white" rounded="xl" shadow="sm" overflow="hidden" minH="60vh">
				{loading ? (
					<Box p={8} display="flex" alignItems="center" justifyContent="center">
						<Spinner />
					</Box>
				) : blobUrl ? (
					<iframe
						title="PDF"
						src={blobUrl}
						style={{ width: "100%", height: "80vh", border: 0 }}
					/>
				) : (
					<Box p={8}>Fichier introuvable.</Box>
				)}
			</Box>
		</AppShell>
	);
}
