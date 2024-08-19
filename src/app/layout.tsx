import { ModalProvider } from '@/providers/modal-provider'
import { ThemeProvider } from '@/providers/theme-provider'
import { ToastProvider } from '@/providers/toast-provider'
import { Inter } from 'next/font/google'

import './globals.css'

import dynamic from "next/dynamic";

const ReduxProvider = dynamic(() => import("@/store/redux-provider"), {
   ssr: false
});

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
   title: 'Store',
   description: 'E-Commerce Store',
   keywords: ['E-Commerce', 'Store', 'Shop'],
   authors: [
      { name: 'Amirhossein Mohammadi', url: 'https://github.com/accretence' },
   ],
   colorScheme: 'dark',
   creator: 'Amirhossein Mohammadi',
   publisher: 'Amirhossein Mohammadi',
}

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
