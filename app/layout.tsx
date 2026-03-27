import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wimbledon Motorbike",
  description: "Premium motorbike spare parts storefront built with Next.js and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
