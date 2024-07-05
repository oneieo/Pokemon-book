import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/components/QueryProvider";
import Image from "next/image";

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
          <nav className="w-full h-[100px] flex items-center justify-center  bg-black">
            <Image
              src="/pokeball.png"
              width={50}
              height={50}
              alt="pokemonball image"
              priority
              className="mr-[20px]"
            />
            <h1 className="text-[40px] font-bold  text-white">Pokémon Book</h1>
            <Image
              src="/pokeball.png"
              width={50}
              height={50}
              alt="pokemonball image"
              priority
              className="ml-[20px]"
            />
          </nav>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
