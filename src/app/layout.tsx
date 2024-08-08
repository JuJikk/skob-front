import { NavBar } from "@/components/navBar";
import {
    ClerkProvider,
} from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Skob",
  description: "Твоя онлайн проба",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-[#EEEEEE]`}>
          <NavBar/>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
