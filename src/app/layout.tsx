import { ModalProvider } from '@/providers/modal-provider'
import { ThemeProvider } from '@/providers/theme-provider'
import { ToastProvider } from '@/providers/toast-provider'
import dynamic from 'next/dynamic'
import { Inter } from 'next/font/google'

import './globals.css'

const ReduxProvider = dynamic(() => import('@/store/redux-provider'), {
   ssr: false,
})

const inter = Inter({ subsets: ['latin'] })

export default async function RootLayout({
   children,
}: {
   children: React.ReactNode
}) {
   return (
      <html lang="en">
         <body className={inter.className}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
               <ToastProvider />
               <ModalProvider />
               <ReduxProvider> {children}</ReduxProvider>
            </ThemeProvider>
         </body>
      </html>
   )
}
