import './globals.css'
import Header from '@/components/layout/Header'
import CustomSessionProvider from '@/components/providers/CustomSessionProvider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next.js Bootstrap Starter',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='dark' h-full>
      <body dark="text-white bg-slate-700" h-full flex flex-col >
        <CustomSessionProvider>
          <div vaul-drawer-wrapper="" className='bg-slate-700 min-h-full'>
            <Header />
            <main p="2 md:4" grow>
              {children}
            </main>
          </div>
        </CustomSessionProvider>
      </body>
    </html>
  )
}
