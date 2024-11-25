import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import { fetchCategories, fetchSocials } from "@/actions";
import CartProvider, { CartContext } from "@/context/cart";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/Footer";

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
    const socials = await fetchSocials()

    return (
      <html lang="pt-br">
        <body
          className={`${inter.className} bg-slate-50 overflow-x-hidden`}
        >
          <div className="flex flex-col min-h-screen">
          <CartProvider>
          <Navbar categories={categories} />
          <div className="flex-1">
          {children}
          </div>
          <Toaster />
          </CartProvider>
          <Footer socials={socials}/>
          </div>
        </body>
      </html>
    );
  }