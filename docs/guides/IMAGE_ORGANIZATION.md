# Image Organization Strategy

**Status:** 🎯 Recommended for Future Scalability  
**Priority:** Medium (implement when adding 3+ exhibitions)

---

## 🚨 Current Structure (Works for Small Scale)

```
public/
└── images/
    └── gallery/
        ├── palac-volneho-casu/
        │   ├── image1.jpg
        │   └── image2.jpg
        └── 01-ghmp-2025.jpg
        └── 02-ghmp-2025.jpg
```

**Problem:** Doesn't scale well with multiple exhibitions

---

## ✅ Recommended Structure (Scalable)

```
public/
└── images/
    └── gallery/
        ├── palac-volneho-casu/
        │   ├── 01-portrait.jpg
        │   ├── 02-landscape.jpg
        │   └── 03-interior.jpg
        ├── ghmp-2025/
        │   ├── 01-artwork.jpg
        │   └── 02-artwork.jpg
        └── gmu-hradec-kralove-2025/
            ├── 01-piece.jpg
            └── 02-piece.jpg
```

### Benefits

✅ **Scalable**: Add unlimited exhibitions without clutter  
✅ **Organized**: Each exhibition has its own folder  
✅ **Predictable**: Clear slug-based naming convention  
✅ **SEO-friendly**: Descriptive folder names  
✅ **Backup-friendly**: Easy to archive entire exhibitions

---

## 📝 Implementation Guide

### 1. Slug Generation

```typescript
// src/lib/utils/slug.ts
export function generateExhibitionSlug(exhibition: string): string {
  return exhibition
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special chars
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/--+/g, "-") // Replace multiple hyphens
    .trim();
}

// Example:
// "GHMP – Galerie hlavního města Prahy"
// → "ghmp-galerie-hlavniho-mesta-prahy"
```

### 2. Updated Artwork Data Structure

```typescript
// src/types/index.ts
export interface Artwork {
  id: number;
  title: string;
  year: number;
  exhibition: string;
  exhibitionSlug: string; // NEW: Add this field
  imageFilename: string; // NEW: Just filename, not full path
  category: "traditional" | "non-traditional" | "minimalistic";
  // ... other fields
}

// Helper function
export function getImagePath(artwork: Artwork): string {
  return `/images/gallery/${artwork.exhibitionSlug}/${artwork.imageFilename}`;
}
```

### 3. Migration Script

```typescript
// scripts/migrate-images.ts
import fs from "fs";
import path from "path";
import { artworks } from "../src/lib/artworks";
import { generateExhibitionSlug } from "../src/lib/utils/slug";

function migrateImages() {
  const exhibitionFolders = new Map<string, string>();

  // Create exhibition folders
  artworks.forEach((artwork) => {
    const slug = generateExhibitionSlug(artwork.exhibition);
    exhibitionFolders.set(artwork.exhibition, slug);

    const folderPath = path.join("public/images/gallery", slug);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
      console.log(`✅ Created: ${folderPath}`);
    }
  });

  // Move images to new structure
  artworks.forEach((artwork) => {
    const slug = exhibitionFolders.get(artwork.exhibition)!;
    const oldPath = path.join("public", artwork.image);
    const filename = path.basename(artwork.image);
    const newPath = path.join("public/images/gallery", slug, filename);

    if (fs.existsSync(oldPath) && oldPath !== newPath) {
      fs.renameSync(oldPath, newPath);
      console.log(`📦 Moved: ${filename} → ${slug}/`);
    }
  });

  console.log("✨ Migration complete!");
}

migrateImages();
```

### 4. Updated artworks.ts

```typescript
// src/lib/artworks.ts
import { Artwork } from "@/types";
import { getImagePath } from "@/types";

export const artworks: Artwork[] = [
  {
    id: 1,
    title: "GHMP – Galerie hlavního města Prahy",
    year: 2025,
    exhibition: "Palác volného času, zámek Troja, Praha",
    exhibitionSlug: "palac-volneho-casu",
    imageFilename: "01-portrait.jpg",
    category: "traditional",
  },
  // ... more artworks
];

// Computed property for backwards compatibility
export const artworksWithPaths = artworks.map((artwork) => ({
  ...artwork,
  image: getImagePath(artwork),
}));
```

---

## 🎯 When to Migrate

Migrate when you have:

- ✅ **3+ exhibitions** - Current structure becomes unwieldy
- ✅ **50+ images** - Root gallery folder gets cluttered
- ✅ **Multiple years** - Need better organization
- ✅ **Archiving needs** - Want to easily backup old exhibitions

Don't migrate if:

- ❌ Only 1-2 exhibitions
- ❌ Less than 20 images
- ❌ Not planning to add more content

---

## 📊 Comparison

| Aspect            | Current                     | Recommended                      |
| ----------------- | --------------------------- | -------------------------------- |
| Exhibitions       | 1-2                         | 3+                               |
| Images/exhibition | Any                         | 5-50                             |
| Folder depth      | Flat                        | Nested                           |
| URL pattern       | `/images/gallery/image.jpg` | `/images/gallery/slug/image.jpg` |
| Scalability       | Limited                     | Unlimited                        |
| Organization      | By filename                 | By exhibition                    |

---

## 🔧 Maintenance

### Adding New Exhibition

```bash
# 1. Create folder
mkdir -p public/images/gallery/new-exhibition-name

# 2. Add images
cp *.jpg public/images/gallery/new-exhibition-name/

# 3. Update artworks.ts with new entries
# 4. Commit and deploy
```

### Archiving Old Exhibition

```bash
# Move entire folder to archive
mv public/images/gallery/old-exhibition \
   public/images/archive/2024/old-exhibition
```

---

## 🚀 Alternative: Database + CMS

For even better scalability (20+ exhibitions), consider:

- **CMS**: Strapi, Contentful, or Sanity
- **CDN**: Cloudinary or Imgix for image hosting
- **Database**: PostgreSQL with image metadata
- **Admin Panel**: Separate content management interface

This is overkill for current needs but worth considering at scale.

---

**Recommendation:** Keep current structure until you add your 3rd exhibition, then migrate. The migration script makes it a 5-minute task.
