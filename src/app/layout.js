import './globals.css'

export const metadata = {
  title: 'AG Academy',
  description: 'Interactive Tutor Platform',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}
