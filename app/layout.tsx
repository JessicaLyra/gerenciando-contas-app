import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gerenciando Contas",
  description: "Sistema de gerenciamento financeiro pessoal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}
         <Toaster
          position="top-right"
          theme="dark"
          richColors
          duration={3000}
          closeButton
          toastOptions={{
            style: {
               background: "#0f172a",
              color: "#fff",
              border: "1px solid #334155",
            },
          }}
        />
      </body>
    </html>
  );
}
