import { NextUIProvider } from "@nextui-org/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useUserStore } from "../../lib/auth/useUser.ts"
import { useEffect } from "react"

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient()
  const { getUser, setUser } = useUserStore((state) => ({
    user: state.user,
    getUser: state.getUser,
    setUser: state.setUser,
  }));

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user", error);
      }
    };

    fetchUser();
  }, [getUser, setUser])

  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>{children}</NextUIProvider>
    </QueryClientProvider>
  )
}
