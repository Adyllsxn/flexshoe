import type { Metadata, Viewport } from "next";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "FlexShoe - E-commerce de Tênis",
    template: "%s | FlexShoe",
  },
  description: "E-commerce de tênis com finalização via WhatsApp.",
  keywords: ["tênis", "e-commerce", "WhatsApp", "Nike", "Adidas", "Puma", "Vans", "Converse"],
  authors: [{ name: "Adyllsxn" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body className="min-h-screen flex flex-col bg-white font-sans">
        {children}
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}