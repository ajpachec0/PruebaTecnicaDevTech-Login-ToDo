import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextAuthProvider } from "../components/ui/NextAuthProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prueba Tecnica - DevTech",
  description:
    "Prueba tecnica utilizando Next.js, React, Typescript y TailwindCSS, realizando una aplicacion con autenticacion de register & login y un CRUD de To Do's",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Toaster position="top-right" richColors />
      <body className={inter.className}>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
