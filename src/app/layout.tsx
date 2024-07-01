import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "A Pokémon Book",
  description: "next app으로 만든 포켓몬 도감!",
  icons: {
    icon: "/pokemon_ball.png", // 이거 왜 갑자기 안 되는거죠
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
        <nav className="w-full h-[100px] flex items-center justify-center text-[35px] font-bold">
          ⚡ Pokémon Book ⚡
        </nav>
        {children}
      </body>
    </html>
  );
}
