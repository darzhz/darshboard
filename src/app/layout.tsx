import type { Metadata } from 'next'
import './globals.css'
import { CustomSidebar } from '@/components/ui/customsidebar'

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
    <html lang="en">
      <body>
        <CustomSidebar children={children} />
        {/* {children} */}
        </body>
    </html>
  )
}
