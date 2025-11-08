import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Výstavy - Tereza Zichová",
  description:
    "Přehled výstav a expozic Terezy Žichové. Vybrané výstavy napříč Evropou, galerie a umělecké projekty.",
  alternates: {
    canonical: "/vystavy",
  },
  openGraph: {
    title: "Výstavy - Tereza Zichová",
    description:
      "Přehled výstav a expozic Terezy Žichové. Vybrané výstavy napříč Evropou, galerie a umělecké projekty.",
    url: "https://terezazichova.cz/vystavy",
  },
  twitter: {
    title: "Výstavy - Tereza Zichová",
    description:
      "Přehled výstav a expozic Terezy Žichové. Vybrané výstavy napříč Evropou, galerie a umělecké projekty.",
  },
};

export default function ExhibitionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
