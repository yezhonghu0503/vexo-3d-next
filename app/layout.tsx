import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI 3D Model Generator',
  description: 'AI-powered, generate 3D models with a single sentence',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}

