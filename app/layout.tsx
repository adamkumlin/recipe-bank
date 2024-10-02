import type { Metadata } from "next";
import "./globals.css";
import { Provider } from  "./provider";
import {inter} from "./lib/fonts"

export const metadata: Metadata = {
  title: "Wiki Buddy",
  description: "Lorem ipsum",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider>
        <body className={inter.className}>{children}</body>
      </Provider>
    </html>
  );
}