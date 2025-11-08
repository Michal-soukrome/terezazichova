# Migration Guide: Legacy to Feature-Based Architecture

**Status:** 🚧 Gradual Migration in Progress  
**Approach:** Migrate as you touch files (no big bang refactor)

---

## 🎯 What We're Migrating

From **layer-based** to **feature-based** architecture:

### Before (Layer-Based)

```
src/
├── components/       # All UI components mixed
│   ├── ImageGallery.tsx
│   ├── Sidebar.tsx
│   └── LoadingLink.tsx
└── lib/              # All logic mixed
    ├── artworks.ts
    └── images.ts
```

### After (Feature-Based)

```
src/
├── features/
│   ├── gallery/      # Gallery feature
│   │   ├── components/
│   │   ├── hooks/
│   │   └── utils/
│   ├── exhibitions/  # Exhibitions feature
│   └── common/       # Shared across features
├── hooks/            # Truly global hooks
├── types/            # Shared type definitions
└── lib/              # Pure utilities
```

---

## 📋 Migration Checklist

### Phase 1: Infrastructure ✅ Complete

- [x] Create `/src/features/` structure
- [x] Create `/src/hooks/` for custom hooks
- [x] Create `/src/types/` for type definitions
- [x] Extract common hooks (useIsMobile, useImageLoading, useGestures)
- [x] Extract type definitions (Artwork, TvorbaItem, filters)

### Phase 2: Gradual Component Migration ⏳ In Progress

#### When to Migrate a Component

Migrate when you:

- ✅ Fix a bug in the component
- ✅ Add a new feature to it
- ✅ Refactor for performance
- ✅ Have 30 minutes spare time

**Don't** migrate:

- ❌ In a rush
- ❌ Before important demo
- ❌ Without tests/backup
- ❌ All at once (high risk)

#### Migration Steps

1. **Identify Feature Ownership**

   ```typescript
   // Is this component gallery-specific?
   ImageGallery.tsx → features/gallery/components/

   // Is it exhibition-specific?
   ExhibitionFilters.tsx → features/exhibitions/components/

   // Is it shared across 2+ features?
   Sidebar.tsx → features/common/components/

   // Is it truly global?
   LoadingProvider.tsx → components/ (keep)
   ```

2. **Move the File**

   ```bash
   # Example: Moving ImageGallery
   mkdir -p src/features/gallery/components
   git mv src/components/ImageGallery.tsx src/features/gallery/components/
   ```

3. **Update Imports**

   ```typescript
   // Old import
   import { ImageGallery } from "@/components/ImageGallery";

   // New import
   import { ImageGallery } from "@/features/gallery/components/ImageGallery";
   ```

4. **Update Type Imports**

   ```typescript
   // If component has embedded types, extract them

   // Before
   interface GalleryProps { ... }

   // After
   import { GalleryProps } from '@/types'
   ```

5. **Extract Feature-Specific Hooks**

   ```typescript
   // If component has custom hooks used only in this feature

   // src/features/gallery/hooks/useGalleryFilters.ts
   export function useGalleryFilters() { ... }
   ```

6. **Test and Commit**
   ```bash
   npm run build
   git add .
   git commit -m "refactor: move ImageGallery to features/gallery"
   ```

---

## 🗺️ Component Migration Map

### Priority 1: Gallery Feature

- [ ] `ImageGallery.tsx` → `features/gallery/components/`
- [ ] Gallery-specific logic from pages → `features/gallery/hooks/`
- [ ] `artworks.ts` data → `features/gallery/data/`

### Priority 2: Common UI

- [ ] `Sidebar.tsx` → `features/common/components/`
- [ ] `AnimatedIcon.tsx` → `features/common/components/`
- [ ] `ContentWrapper.tsx` → `features/common/components/`

### Priority 3: Keep Global

- [x] `LoadingProvider.tsx` - Stay in components (truly global)
- [x] `RoutePreloader.tsx` - Stay in components (app-wide)
- [x] `SimpleRouteLoader.tsx` - Stay in components (app-wide)

---

## 🎣 Hook Migration Examples

### Example 1: Extract Mobile Detection

**Before** (in every component):

```typescript
// src/app/page.tsx
const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const checkMobile = () => setIsMobile(window.innerWidth < 768);
  checkMobile();
  window.addEventListener("resize", checkMobile);
  return () => window.removeEventListener("resize", checkMobile);
}, []);
```

**After**:

```typescript
// src/hooks/useIsMobile.ts ✅ Already done!
import { useIsMobile } from "@/hooks";

// In component:
const isMobile = useIsMobile();
```

### Example 2: Feature-Specific Hook

```typescript
// src/features/gallery/hooks/useGalleryFilters.ts
export function useGalleryFilters(artworks: Artwork[]) {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredArtworks = useMemo(() => {
    return artworks.filter((artwork) => {
      if (selectedYear && artwork.year !== selectedYear) return false;
      if (selectedCategory !== "all" && artwork.category !== selectedCategory)
        return false;
      return true;
    });
  }, [artworks, selectedYear, selectedCategory]);

  return {
    selectedYear,
    setSelectedYear,
    selectedCategory,
    setSelectedCategory,
    filteredArtworks,
  };
}
```

---

## 📦 Type Migration Examples

### Before (Mixed with Data)

```typescript
// src/lib/artworks.ts
export interface Artwork {
  id: number;
  title: string;
  // ...
}

export const artworks: Artwork[] = [ ... ]
```

### After (Separated)

```typescript
// src/types/index.ts ✅ Already done!
export interface Artwork {
  id: number;
  title: string;
  // ...
}

// src/lib/artworks.ts
import { Artwork } from '@/types'
export const artworks: Artwork[] = [ ... ]
```

---

## ⚠️ Migration Gotchas

### 1. Import Path Updates

```typescript
// Be careful with path aliases
// Wrong: '../../../types'
// Right: '@/types'
```

### 2. Circular Dependencies

```typescript
// ❌ Don't do this
// features/gallery/index.ts
export * from "./components/ImageGallery";

// features/exhibitions/index.ts
import { ImageGallery } from "@/features/gallery";

// ✅ Do this instead - import directly
import { ImageGallery } from "@/features/gallery/components/ImageGallery";
```

### 3. Shared Types

```typescript
// If two features share a type, put it in /types
// Don't import types from one feature into another
```

---

## 🧪 Testing Migration

```bash
# 1. Build succeeds
npm run build

# 2. No TypeScript errors
npm run type-check  # or tsc --noEmit

# 3. App runs
npm run dev

# 4. Test affected pages manually
# - Open gallery
# - Test filters
# - Check lightbox
# - Test mobile view
```

---

## 📊 Migration Progress

Track your progress:

```markdown
## Gallery Feature

- [ ] ImageGallery.tsx
- [ ] Filter components
- [ ] Gallery hooks
- [ ] Gallery data

## Exhibitions Feature

- [ ] Exhibition list
- [ ] Exhibition detail
- [ ] Exhibition filters

## Common UI

- [ ] Sidebar
- [ ] AnimatedIcon
- [ ] ContentWrapper
```

---

## 🚀 Benefits After Migration

Once complete, you'll have:

✅ **Clear ownership** - Each feature is self-contained  
✅ **Easy to find code** - No more hunting through components/  
✅ **Safe to refactor** - Changes stay within feature boundaries  
✅ **Faster onboarding** - New devs can focus on one feature  
✅ **Better testing** - Features can be tested independently  
✅ **Future-proof** - Easy to add new features without cluttering

---

## 📚 References

- [ARCHITECTURE.md](./ARCHITECTURE.md) - Full architecture decisions
- [PROJECT_STRUCTURE.md](../../PROJECT_STRUCTURE.md) - Current structure overview

---

**Remember:** Migrate gradually. Working code > perfect architecture.

**Last Updated:** November 8, 2025
