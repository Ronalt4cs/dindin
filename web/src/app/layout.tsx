import Header from '@/components/Header'
import './globals.css'
import { Rubik, Lato } from 'next/font/google'
import React from 'react'

const rubik = Rubik({
  subsets: ['latin'],
  variable: '--font-rubik',
})
const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lato',
})

export const metadata = {
  title: 'Dindin',
  description: 'Aplicação de controle de finaças',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${rubik.variable} ${lato.variable} h-screen font-rubik text-white bg-background`}
      >
        <Header />
        {children}
      </body>
    </html>
  )
}
