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
    title: "GHMP – Galerie hlavního města Prahy",
    year: 2025,
    image: "/images/gallery/01-ghmp-2025.jpg",
    exhibition: "Palác volného času, zámek Troja, Praha",
    category: "traditional",
    medium: "Olej na plátně",
    tags: ["figurální", "interiér"],
  },
  {
    id: 2,
    title: "GHMP – Galerie hlavního města Prahy",
    year: 2025,
    image: "/images/gallery/02-ghmp-2025.jpg",
    exhibition: "Palác volného času, zámek Troja, Praha",
    category: "traditional",
    medium: "Olej na plátně",
    tags: ["figurální", "interiér"],
  },
  {
    id: 3,
    title: "GHMP – Galerie hlavního města Prahy",
    year: 2025,
    image: "/images/gallery/03-ghmp-2025.jpg",
    exhibition: "Palác volného času, zámek Troja, Praha",
    category: "traditional",
    medium: "Olej na plátně",
    tags: ["figurální", "interiér"],
  },
  {
    id: 4,
    title: "GMU – Galerie moderního umění v Hradci Králové",
    year: 2025,
    image: "/images/gallery/04-gmu-2025.jpg",
    exhibition: "GMU – Galerie moderního umění v Hradci Králové",
    category: "minimalistic",
    medium: "Kresba, smíšená technika",
    tags: ["kresba", "studie"],
  },
  {
    id: 5,
    title: "Galerie Dolmen",
    year: 2025,
    image: "/images/gallery/05-dolmen-2025.jpg",
    exhibition: "Galerie Dolmen - Praha",
    category: "traditional",
    medium: "Kresba",
    tags: ["figurální", "kresba", "studie"],
  },
  {
    id: 6,
    title: "Galerie Dolmen",
    year: 2025,
    image: "/images/gallery/06-dolmen-2025.jpg",
    exhibition: "Galerie Dolmen - Praha",
    category: "traditional",
    medium: "Kresba",
    tags: ["figurální", "kresba", "studie"],
  },
  {
    id: 7,
    title: "Galerie Dolmen",
    year: 2025,
    image: "/images/gallery/07-dolmen-2025.jpg",
    exhibition: "Palác volného času, zámek Troja, Praha",
    category: "traditional",
    medium: "Kresba",
    tags: ["figurální", "kresba", "studie"],
  },
  {
    id: 8,
    title: "Galerie Vltavín, Praha",
    year: 2025,
    image: "/images/gallery/08-vltavin-2025.jpg",
    exhibition: "Galerie Vltavín, Praha",
    category: "non-traditional",
    medium: "Smíšená technika",
    tags: ["experimentální", "kompozice"],
  },
  {
    id: 9,
    title: "Galerie Vltavín, Praha",
    year: 2025,
    image: "/images/gallery/09-vltavin-2025.jpg",
    exhibition: "Galerie Vltavín, Praha",
    category: "non-traditional",
    medium: "Smíšená technika",
    tags: ["experimentální", "kompozice"],
  },
  {
    id: 10,
    title: "Galerie Vltavín, Praha",
    year: 2025,
    image: "/images/gallery/10-vltavin-2025.jpg",
    exhibition: "Galerie Vltavín, Praha",
    category: "traditional",
    medium: "Olej na plátně",
    tags: ["portrét", "figurální"],
  },
];
