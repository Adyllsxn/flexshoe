'use client';

import { Header } from "@/components/layout/header/Header";
import { Footer } from "@/components/layout/footer/Footer";
import { CartProvider } from "@/lib/contexts/CartContext";
import { ApiStatusIndicator } from "@/components/shared/ApiStatusIndicator";

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
      <ApiStatusIndicator />
    </CartProvider>
  );
}