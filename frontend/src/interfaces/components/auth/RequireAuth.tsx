import { Box, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSession } from "@/interfaces/hooks/useAuth";

interface RequireAuthProps {
	children: React.ReactNode;
}

export function RequireAuth({ children }: RequireAuthProps) {
	const { data, isLoading } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (!isLoading && (!data || !data.user)) {
			void router.replace("/login");
		}
	}, [data, isLoading, router]);

	if (isLoading || !data?.user) {
		return (
			<Box minH="60vh" display="flex" alignItems="center" justifyContent="center">
				<Spinner />
			</Box>
		);
	}

	return <>{children}</>;
}


