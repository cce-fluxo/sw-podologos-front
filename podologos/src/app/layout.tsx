import type { Metadata } from 'next';
import { Lexend, Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] });

// Configurar Poppins com os pesos que você precisa
const lexend = Lexend({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-lexend',
})

export const metadata: Metadata = {
  title: 'Pharmacure+',
  description: 'Aplicativo de gestão de usuários',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
    other: [
      {
        rel: 'icon',
        url: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        rel: 'icon',
        url: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },
  
  // Meta tags específicas
  appleWebApp: {
    title: 'Pharmacure',
    capable: true,
    statusBarStyle: 'default',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='pt-BR' className={`${lexend.variable}`}>
      <head>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Meta tag específica do RealFaviconGenerator */}
        <meta name="apple-mobile-web-app-title" content="Pharmacure" />
        
        {/* Links manuais para garantir */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Meta tags importantes */}
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>

      <body className={inter.className + lexend.className}>
        <AuthProvider>
          <div className='h-screen w-screen bg-white'>{children}</div>
          <ToastContainer /> {/* Renderiza os toasts */}
        </AuthProvider>
      </body>
    </html>
  );
}
