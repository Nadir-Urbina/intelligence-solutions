import type { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Intelligence Solutions - Sanity Studio',
  description: 'Content management for Intelligence Solutions',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 