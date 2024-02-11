import type { Metadata } from 'next'
import { Oswald } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'


import { ModalProvider } from '@/providers/modal-provider'
import { ToastProvider } from '@/providers/toast-provider'

import { Analytics } from '@vercel/analytics/react';


// adjust font if needed
const font = Oswald({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Haus Of Lions',
  description: 'Haus Of Lions store',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${font.className}`}>
        <ModalProvider />
        <ToastProvider />
        <Navbar />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
