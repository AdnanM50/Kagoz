import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { ResetProvider } from "./(Auth)/_components/methodContext";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Interview Task",
  description: "A Next.js application for an interview task",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`antialiased`}
      >
       <ResetProvider>
        {children}
       </ResetProvider>
      </body>
    </html>
  );
}
