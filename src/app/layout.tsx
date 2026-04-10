import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "관꾸",
  description: "나만의 장례를 미리 꾸미는 감성 셀프 준비 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <body className="min-h-full bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
