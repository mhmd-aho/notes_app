import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/app/theme-provider";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { Toaster } from "@/components/ui/sonner";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Notes app",
  description: "this app is for collaborative note taking",
  authors: [{name: "mohamad abou hamoud"}],
  keywords: ["notes", "collaborative notes", "note taking", "realtime notes"],
  icons:{
    icon:'/favicon.png',
    shortcut:'/favicon.png'
  }
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConvexClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
