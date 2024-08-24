"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProvider>
        <NextUIProvider>{children}</NextUIProvider>
      </ClerkProvider>
    </QueryClientProvider>
  );
}
