import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Link from "next/link"

import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Poker Master",
  description: "Learn and master poker from beginner to advanced",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="min-h-screen flex flex-col">
            <header className="border-b">
              <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold">
                  Poker Master
                </Link>
                <nav className="flex gap-6">
                  <Link href="/learn/rules" className="hover:text-primary">
                    Rules
                  </Link>
                  <Link href="/learn/hand-rankings" className="hover:text-primary">
                    Hand Rankings
                  </Link>
                  <Link href="/learn/strategy" className="hover:text-primary">
                    Strategy
                  </Link>
                  <Link href="/practice" className="hover:text-primary">
                    Practice
                  </Link>
                  <Link href="/play" className="hover:text-primary font-medium">
                    Play
                  </Link>
                </nav>
              </div>
            </header>
            <main className="flex-1">{children}</main>
            <footer className="border-t py-6">
              <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
                Poker Master - Learn and master poker from beginner to advanced
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'