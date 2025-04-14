import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog | Intelligence Solutions",
  description: "Expert perspectives, industry trends, and thought leadership from our team.",
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 