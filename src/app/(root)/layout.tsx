import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import { fetchCategories } from "@/actions";
import CartProvider, { CartContext } from "@/context/cart";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Delícias de Sabor",
    description: "Sorveteria em São Sebastião, AL",
  };

  export default async function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {


    const categories = await fetchCategories()

    return (
      <html lang="pt-br">
        <body
          className={`${inter.className} bg-slate-50 overflow-x-hidden`}
        >
          <CartProvider>
          <Navbar categories={categories} />
          {children}
          <Toaster />
          </CartProvider>
        </body>
      </html>
    );
  }