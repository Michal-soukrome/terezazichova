import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "O mně - Tereza Zichová",
  description:
    "Žiji v Praze a moje tvorba zahrnuje různá média - od tradičního malířství až po digitální manipulaci. Zkoumám průnik mezi digitálním a analogovým světem.",
  alternates: {
    canonical: "/ja",
  },
  openGraph: {
    title: "O mně - Tereza Zichová",
    description:
      "Žiji v Praze a moje tvorba zahrnuje různá média - od tradičního malířství až po digitální manipulaci. Zkoumám průnik mezi digitálním a analogovým světem.",
    url: "https://terezazichova.cz/ja",
  },
  twitter: {
    title: "O mně - Tereza Zichová",
    description:
      "Žiji v Praze a moje tvorba zahrnuje různá média - od tradičního malířství až po digitální manipulaci. Zkoumám průnik mezi digitálním a analogovým světem.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
