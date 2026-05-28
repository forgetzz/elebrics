import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProviderContext } from "@/context/ThemeContext";
import AuthContextProvider from "@/context/AuthContext";
import { useTheme } from "@/hooks";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons: "/logo/logo3.jpeg",
  title: "Elbric Music",
  description: "Elbric music production",
};


export default function RootLayout({

  
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body  className={`min-h-full flex flex-col `}>

        <AuthContextProvider>
          <ThemeProviderContext>
            {children}
          </ThemeProviderContext>

        </AuthContextProvider>



      </body>
    </html>
  );
}
