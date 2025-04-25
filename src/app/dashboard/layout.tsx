import type { Metadata } from 'next'
import '@/app/globals.css'
import ClientLayout from './clientlayout'

export const metadata: Metadata = {
  title: 'DarshBoard',
  description: 'A cool Dashboard',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    
      <ClientLayout>{children}</ClientLayout>
  )
}
