import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const inter = Inter({ subsets: ['latin'] });

// Importar Lexend do Google Fonts
import { Lexend } from 'next/font/google'

// Configurar Poppins com os pesos que você precisa
const lexend = Lexend({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-lexend',
})

export const metadata: Metadata = {
  title: 'Pharmacure+',
  description: 'Aplicativo de gestão de usuários',
  icons: {
    icon: [
      { url: '/favicon.ico' }
    ]
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='pt-BR' className={`${lexend.variable}`}>
      <body className={inter.className + lexend.className}>
        <AuthProvider>
          <div className='h-screen w-screen bg-white'>{children}</div>
          <ToastContainer /> {/* Renderiza os toasts */}
        </AuthProvider>
      </body>
    </html>
  );
}
