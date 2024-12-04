import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import { GeistSans } from "geist/font/sans";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import MenuDialog from "@/components/Dialogs/menu-dialog";
import { ThemeProvider } from "@/components/theme-provider";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Dark Alpha Capital Deal Sourcing Organization",
  description: "Sourcing and Scrape Deals with AI",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userSession = await auth();

  return (
    <html lang="en" className={cn(GeistSans.variable)} suppressHydrationWarning>
      <body className={`antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <main>
            <MenuDialog />
            <Header session={userSession} />

            {children}
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
