import type React from "react"
import Link from "next/link"
import { Shield } from "lucide-react"
import { ThemeToggle } from "@/components/website/theme-toggle"
import { AnimatedBackground } from "@/components/website/animated-background"
import { Toaster } from "sonner"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
        <AnimatedBackground />
        <header className="container mx-auto px-16 flex h-16 gap-2 items-center space-x-4 sm:justify-between sm:space-x-0">
            <div className="flex items-center space-x-2 gap-4 text-s">
              <Link href="/" className="flex items-center space-x-2">
                <Shield className="h-6 w-6" />
                {/* <span className="inline-block font-bold">SECURE Chain</span> */}
              </Link>
            </div>
            <div className="ml-auto">
            <ThemeToggle />
            </div>
        </header>
        <main className="flex-1">
            <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center">
            <div className="container max-w-md">{children}</div>
            </div>
        </main>
        <Toaster/>
    </div>
  )
}
