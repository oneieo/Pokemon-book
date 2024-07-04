import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/components/QueryProvider";

export const metadata: Metadata = {
  title: "A Pokémon Book",
  description: "next app으로 만든 포켓몬 도감!",
  icons: {
    icon: "/pokemon_ball.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <nav className="w-full h-[100px] flex items-center justify-center text-[40px] font-bold  text-white bg-black">
            ⚡ Pokémon Book ⚡
          </nav>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
