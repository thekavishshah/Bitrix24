import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import { GeistSans } from "geist/font/sans";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Dark Alpha Capital Deal Sourcing Organization",
  description: "Sourcing and Scrape Deals with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(GeistSans.variable)}>
      <body className={` antialiased`}>
        <main>
          <Header />

          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
