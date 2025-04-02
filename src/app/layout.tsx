import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from '@/lib/utils'
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { OrganizationJsonLd, WebsiteJsonLd } from "@/components/json-ld"
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Intelligence Solutions | Kingdom Business Consultancy",
  description: "Business strategy, marketing, and leadership development solutions with biblical principles.",
  keywords: "kingdom business, business strategy, leadership development, faith-based business, Christian business consultancy",
  authors: [{ name: "Intelligence Solutions", url: "https://intelligencesolutions.com" }],
  metadataBase: new URL("https://intelligencesolutions.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://intelligencesolutions.com",
    title: "Intelligence Solutions | Kingdom Business Consultancy",
    description: "Business strategy, marketing, and leadership development solutions with biblical principles.",
    siteName: "Intelligence Solutions",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Intelligence Solutions"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Intelligence Solutions | Kingdom Business Consultancy",
    description: "Business strategy, marketing, and leadership development solutions with biblical principles.",
    images: ["/og-image.jpg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen antialiased", inter.className)}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
          <Toaster />
          <OrganizationJsonLd />
          <WebsiteJsonLd />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}