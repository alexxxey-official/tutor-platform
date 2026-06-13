import './globals.css'
import { AuthProvider } from '../lib/auth'

export const metadata = {
  title: 'AG Academy',
  description: 'Interactive Tutor Platform',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
