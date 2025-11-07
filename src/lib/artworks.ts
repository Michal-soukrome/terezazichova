// Artwork type definition
export interface Artwork {
  id: number;
  title: string;
  year: number;
  image: string;
  medium?: string;
  dimensions?: string;
}

// Shared artwork data
export const artworks: Artwork[] = [
  {
    id: 1,
    title: "Palác volného času I",
    year: 2024,
    image:
      "/images/gallery/palac-volneho-casu/Palac volneho casu_Zamek Troja_GHMP_ph_Jan_Kolsky_01.jpg",
  },
  {
    id: 2,
    title: "Palác volného času II",
    year: 2024,
    image:
      "/images/gallery/palac-volneho-casu/Palac volneho casu_Zamek Troja_GHMP_ph_Jan_Kolsky_02.jpg",
  },
  {
    id: 3,
    title: "Palác volného času III",
    year: 2024,
    image:
      "/images/gallery/palac-volneho-casu/Palac volneho casu_Zamek Troja_GHMP_ph_Jan_Kolsky_03.jpg",
  },
];
