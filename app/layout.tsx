import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { ReduxProvider } from "@/components/providers/redux-provider"
import { StoreProvider } from "@/components/providers/store-provider"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Saan",
  icons: {
    icon: "/saan_web_logo.jpg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ReduxProvider>
          <StoreProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              <Suspense fallback={null}>{children}</Suspense>
            </ThemeProvider>
          </StoreProvider>
        </ReduxProvider>
        <Analytics />
      </body>
    </html>
  )
}
