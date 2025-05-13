import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SECURE Chain - Blockchain-Powered Election Platform",
  description:
    "Conduct transparent, secure, and tamper-proof elections for your educational institution with our blockchain-based voting system.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
