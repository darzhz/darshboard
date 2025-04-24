import type { Metadata } from 'next'
import './globals.css'
import { CustomSidebar } from '@/components/ui/customsidebar'
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
