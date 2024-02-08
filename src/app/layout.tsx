import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { Navigation, AuthProvider } from "../../components";
import { ChampionManager } from "../../helpers";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "League of Champion's",
  description: `Witaj w league of Chempions – ultymatywnym przewodniku i polu bitwy dla pasjonatów League of Legends! Nasza strona to nie tylko zbiór dogłębnych opisów każdego bohatera z Runeterry, ale również wyjątkowa arena, gdzie możesz rzucić wyzwanie innym graczom w emocjonujących pojedynkach 1vs1.

Odkryj sekrety i strategie stojące za Twoimi ulubionymi championami, zanurz się w ich lore, analizuj mocne i słabe strony oraz doskonal swoje umiejętności dzięki szczegółowym poradnikom. league of Chempions oferuje kompleksowe profile bohaterów, w tym ich historię, umiejętności, tipy dotyczące gry jako i przeciwko nim, a także rekomendacje dotyczące buildów i run.

Ale to nie wszystko! Nasza innowacyjna arena 1vs1 pozwala Ci sprawdzić swoje umiejętności w bezpośrednim starciu z innymi graczami. Wybierz swojego championa, stwórz strategię, a następnie zmierz się z przeciwnikiem na polu bitwy, aby zobaczyć, kto ma lepszą taktykę, szybkość reakcji i zdolność adaptacji.

league of Chempions to miejsce, gdzie strategia spotyka się z pasją, a każdy fan League of Legends może rozwijać swoje umiejętności, zarówno teoretyczne, jak i praktyczne. Niezależnie od tego, czy jesteś weteranem, czy nowicjuszem, nasza strona zapewnia wszystko, czego potrzebujesz, aby zanurzyć się głębiej w świat LoL i stać się mistrzem Runeterry. Dołącz do nas już dziś i zacznij swoją podróż ku chwale!`,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${inter.className} `}>
        <AuthProvider>
          {children}
          <Navigation />
        </AuthProvider>
      </body>
    </html>
  );
}
