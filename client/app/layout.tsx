import type { Metadata } from "next";
import "./globals.css";
import { Provider } from "./provider";
// import { inter } from "./lib/fonts";
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
        <body className={`bg-[rgb(221,218,218)]`}>
          <NavBar />
          <main className="h-full">{children}</main>
        </body>
      </Provider>
    </html>
  );
}
