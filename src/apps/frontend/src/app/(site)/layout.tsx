'use client';

import { Header } from "@/components/layout/public/Header";
import { Footer } from "@/components/layout/public/Footer";
import { CartProvider } from "@/lib/contexts/CartContext";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </CartProvider>
  );
}