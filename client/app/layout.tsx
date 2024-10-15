import type { Metadata } from "next";
import "./globals.css";
import { Provider } from "./provider";
import { inter } from "./lib/fonts";
import NavBar from "./components/NavBar";

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
        <body className={`${inter.className} bg-[rgb(34,193,195)] bg-[linear-gradient(0deg,rgb(34,193,195)0%,rgb(121,93,247)9%,rgb(248,45,253)100%);] bg-no-repeat`}>
          <NavBar />
          <main className="h-full">{children}</main>
        </body>
      </Provider>
    </html>
  );
}
