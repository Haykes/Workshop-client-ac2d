import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { appSystem } from "@/shared/theme/chakraTheme";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { ToasterContainer } from "@/interfaces/components/ui/Toaster";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
	useEffect(() => {
		if (typeof window !== "undefined" && "serviceWorker" in navigator) {
			navigator.serviceWorker.register("/sw.js").catch(() => void 0);
		}
	}, []);

	return (
		<QueryClientProvider client={queryClient}>
			<ChakraProvider value={appSystem}>
				<Component {...pageProps} />
				<ToasterContainer />
			</ChakraProvider>
		</QueryClientProvider>
	);
}
