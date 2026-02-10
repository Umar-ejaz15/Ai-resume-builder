import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'sonner'
import Header from '@/components/Header'
import './globals.css'

export const metadata = {
  title: 'AI Resume Builder',
  description: 'Build professional resumes with AI assistance',
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Header />
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  )
}
