import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import { GeistSans } from "geist/font/sans";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import { auth } from "@/auth";
import MenuDialog from "@/components/Dialogs/menu-dialog";

export const metadata: Metadata = {
  title: "Dark Alpha Capital Deal Sourcing Organization",
  description: "Sourcing and Scrape Deals with AI",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" className={cn(GeistSans.variable)}>
      <body className={`antialiased`}>
        <main>
          <MenuDialog />
          <Header session={session} />

          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
