import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LockScreen from "@/components/lock_screen";
import { Toaster } from "@/components/ui/sonner";
import Alert from "@/components/alert";
import { Modal } from "@/components/modal";
import ThemeHandler from "@/lib/theme_handler";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tienda de Autopartes",
  description: "Gestiona tu tienda de manera sencilla",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LockScreen/>
        <Alert/>
        <Modal/>
        <ThemeHandler/>
        <Toaster position="top-right" richColors />
        {children}
      </body>
    </html>
  );
}
