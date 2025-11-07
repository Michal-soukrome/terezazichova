// Artwork type definition
export interface Artwork {
  id: number;
  title: string;
  year: number;
  image: string;
  medium?: string;
  dimensions?: string;
  exhibition?: string;
  category: "traditional" | "non-traditional" | "minimalistic";
  tags?: string[];
}

// Shared artwork data
export const artworks: Artwork[] = [
  {
    id: 1,
    title: "Palác volného času I",
    year: 2024,
    image:
      "/images/gallery/palac-volneho-casu/Palac volneho casu_Zamek Troja_GHMP_ph_Jan_Kolsky_01.jpg",
    exhibition: "Palác volného času - Zámek Troja",
    category: "traditional",
    medium: "Olej na plátně",
    tags: ["figurální", "interiér"],
  },
  {
    id: 2,
    title: "Palác volného času II",
    year: 2024,
    image:
      "/images/gallery/palac-volneho-casu/Palac volneho casu_Zamek Troja_GHMP_ph_Jan_Kolsky_02.jpg",
    exhibition: "Palác volného času - Zámek Troja",
    category: "traditional",
    medium: "Olej na plátně",
    tags: ["figurální", "interiér"],
  },
  {
    id: 3,
    title: "Palác volného času III",
    year: 2024,
    image:
      "/images/gallery/palac-volneho-casu/Palac volneho casu_Zamek Troja_GHMP_ph_Jan_Kolsky_03.jpg",
    exhibition: "Palác volného času - Zámek Troja",
    category: "traditional",
    medium: "Olej na plátně",
    tags: ["figurální", "interiér"],
  },
  {
    id: 4,
    title: "Studiová práce I",
    year: 2024,
    image: "/images/gallery/palac-volneho-casu/6,6.jpg",
    exhibition: "Palác volného času - Zámek Troja",
    category: "minimalistic",
    medium: "Kresba, smíšená technika",
    tags: ["kresba", "studie"],
  },
  {
    id: 5,
    title: "Figurální studie A",
    year: 2024,
    image: "/images/gallery/palac-volneho-casu/AAA00102.jpg",
    exhibition: "Palác volného času - Zámek Troja",
    category: "traditional",
    medium: "Kresba",
    tags: ["figurální", "kresba", "studie"],
  },
  {
    id: 6,
    title: "Figurální studie B",
    year: 2024,
    image: "/images/gallery/palac-volneho-casu/AAA00115.jpg",
    exhibition: "Palác volného času - Zámek Troja",
    category: "traditional",
    medium: "Kresba",
    tags: ["figurální", "kresba", "studie"],
  },
  {
    id: 7,
    title: "Figurální studie C",
    year: 2024,
    image: "/images/gallery/palac-volneho-casu/AAA00123.jpg",
    exhibition: "Palác volného času - Zámek Troja",
    category: "traditional",
    medium: "Kresba",
    tags: ["figurální", "kresba", "studie"],
  },
  {
    id: 8,
    title: "Experimentální kompozice I",
    year: 2024,
    image: "/images/gallery/palac-volneho-casu/_DSF1582.jpg",
    exhibition: "Palác volného času - Zámek Troja",
    category: "non-traditional",
    medium: "Smíšená technika",
    tags: ["experimentální", "kompozice"],
  },
  {
    id: 9,
    title: "Experimentální kompozice II",
    year: 2024,
    image: "/images/gallery/palac-volneho-casu/_DSF1695.jpg",
    exhibition: "Palác volného času - Zámek Troja",
    category: "non-traditional",
    medium: "Smíšená technika",
    tags: ["experimentální", "kompozice"],
  },
  {
    id: 10,
    title: "Portrét",
    year: 2024,
    image: "/images/gallery/palac-volneho-casu/_MJA3922s.jpg",
    exhibition: "Palác volného času - Zámek Troja",
    category: "traditional",
    medium: "Olej na plátně",
    tags: ["portrét", "figurální"],
  },
];
