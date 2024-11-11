import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { GeistSans } from "geist/font/sans";
import "../globals.css";
import { Toaster } from "@/components/ui/toaster";
import Image from "next/image";

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
          <section className="grid min-h-screen grid-cols-1 md:grid-cols-2">
            <div className="relative">
              <Image
                src={"/background-texture.avif"}
                alt="blue background wavy for authentication pages"
                className="object-cover"
                fill
              />
            </div>
            <div>{children}</div>
          </section>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
