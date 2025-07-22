import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "SecureShare - Confidential Message Sharing",
  description: "Share text and data confidentially using secure two-digit codes. Messages are encrypted and auto-delete after access.",
  keywords: "secure messaging, encrypted sharing, confidential data, temporary messages",
  authors: [{ name: "SecureShare" }],
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased overflow-x-hidden`}>
        {/* Dynamic Background */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          {/* Primary Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-accent-50 to-brand-100" />
          
          {/* Animated Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-400/20 via-accent-400/10 to-brand-600/20 animate-gradient" />
          
          {/* Floating Orbs */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-brand-400/30 to-accent-400/30 rounded-full blur-3xl animate-float" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-accent-300/20 to-brand-300/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-brand-500/10 to-accent-500/10 rounded-full blur-2xl animate-pulse-slow" />
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
        </div>
        
        {/* Content */}
        <div className="relative min-h-screen">
          {children}
        </div>
        
        {/* Background Noise Texture */}
        <div className="fixed inset-0 -z-5 opacity-[0.015] bg-noise-pattern pointer-events-none" />
      </body>
    </html>
  );
}
