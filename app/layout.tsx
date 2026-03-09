import type { Metadata } from "next";
import "./globals.css";
import BottomNav from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "Crypto Dashboard",
  description: "暗号資産管理アプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <div style={{ paddingBottom: "72px" }}>{children}</div>
        <BottomNav />
      </body>
    </html>
  );
}
