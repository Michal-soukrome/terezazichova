# Project Structure

Visual overview of the complete project structure.

## 📁 Root Directory

```
terezazichova/
├── 📄 README.md                    # Project overview and getting started
├── 📄 CHANGELOG.md                 # Detailed changelog (NEW)
├── 📄 package.json                 # Dependencies and scripts
├── 📄 tsconfig.json                # TypeScript configuration
├── 📄 next.config.ts               # Next.js configuration (image optimization)
├── 📄 eslint.config.mjs            # ESLint rules
├── 📄 postcss.config.mjs           # PostCSS configuration
├── 📄 netlify.toml                 # Netlify deployment config
├── 📄 next-env.d.ts                # Next.js TypeScript definitions
│
├── 📂 docs/                        # Documentation hub
│   ├── 📄 README.md                # Documentation index with maintenance warning
│   ├── � guides/                  # Active implementation guides
│   │   ├── ARCHITECTURE.md         # Core architectural decisions
│   │   ├── ARCHITECTURE_IMPROVEMENTS.md # Summary of architecture improvements
│   │   ├── MIGRATION_GUIDE.md      # Migration guide for new architecture
│   │   ├── ORGANIZATION_SUMMARY.md # Repository organization summary
│   │   ├── IMAGE_OPTIMIZATION.md   # Current optimization approach (Next.js best practices)
│   │   ├── IMAGE_ORGANIZATION.md   # Scalable image folder structure
│   │   ├── IMAGE_GUIDE.md          # How to add/manage images
│   │   ├── PWA_GUIDE.md            # PWA setup
│   │   └── SEO_GUIDE.md            # SEO strategies
│   └── 📂 archived/                # Historical documentation
│       ├── README.md               # Archive explanation
│       ├── IMAGE_OPTIMIZATION.md   # Old custom approach
│       ├── IMAGE_OPTIMIZATION_QUICK.md
│       ├── IMAGE_OPTIMIZATION_STATUS.md
│       └── NEXTJS_BUILT_INS.md     # Migration documentation
│
├── 📂 src/                         # Source code
│   ├── 📂 app/                     # Next.js App Router
│   │   ├── 📄 layout.tsx           # Root layout
│   │   ├── 📄 page.tsx             # Home/Exhibition gallery
│   │   ├── 📄 globals.css          # Global styles
│   │   ├── 📄 loading.tsx          # Loading state
│   │   ├── 📄 not-found.tsx        # 404 page
│   │   ├── 📂 vystavy/             # Exhibitions page
│   │   │   └── page.tsx
│   │   └── 📂 tvorba/              # Own work gallery
│   │       └── page.tsx
│   │
│   ├── 📂 features/                # Feature-based modules (NEW)
│   │   ├── 📂 gallery/             # Gallery-specific components + logic
│   │   ├── 📂 exhibitions/         # Exhibition-specific code
│   │   └── 📂 common/              # Shared UI components across features
│   │
│   ├── 📂 hooks/                   # Custom React hooks (NEW)
│   │   ├── 📄 index.ts             # Barrel export for all hooks
│   │   ├── 📄 useIsMobile.ts       # Mobile viewport detection
│   │   ├── 📄 useImageLoading.ts   # Image loading state management
│   │   └── 📄 useGestures.ts       # Swipe and zoom gesture handling
│   │
│   ├── 📂 types/                   # TypeScript type definitions (NEW)
│   │   └── 📄 index.ts             # Central type exports (Artwork, filters, etc.)
│   │
│   ├── 📂 components/              # Reusable components (legacy - migrate to features/)
│   │   ├── AnimatedIcon.tsx        # Animated menu icon
│   │   ├── ContentWrapper.tsx      # Layout wrapper
│   │   ├── ImageGallery.tsx        # Gallery component
│   │   ├── LoadingLink.tsx         # Link with loading state
│   │   ├── LoadingProvider.tsx     # Loading context
│   │   ├── RoutePreloader.tsx      # Route prefetching
│   │   ├── Sidebar.tsx             # Navigation sidebar
│   │   ├── SidebarLink.tsx         # Sidebar link component
│   │   └── SimpleRouteLoader.tsx   # Simple loading indicator
│   │
│   └── 📂 lib/                     # Utilities and data
│       ├── artworks.ts             # Artwork data structure
│       └── images.ts               # Image utilities
│
├── 📂 public/                      # Static assets
│   ├── 📂 images/                  # Image assets
│   │   └── 📂 gallery/             # Gallery images
│   │       └── 📂 palac-volneho-casu/
│   ├── 📄 manifest.json            # PWA manifest
│   └── 📄 favicon.ico              # Site favicon
│
├── 📂 .github/                     # GitHub configuration
│   └── 📄 copilot-instructions.md  # Copilot context
│
├── 📂 .vscode/                     # VS Code settings
└── 📂 node_modules/                # Dependencies (not in git)
```

---

## 🗂️ Organization Principles

### Root Level

- Keep minimal: only essential config files
- Main docs: `README.md` and `CHANGELOG.md`
- Configuration files: Next.js, TypeScript, ESLint, etc.

### `/docs/` Directory

- **`/docs/guides/`** - Current, active documentation
- **`/docs/archived/`** - Historical docs for reference
- Each folder has its own `README.md` for navigation

### `/src/` Directory

- **`/app/`** - Next.js pages (App Router)
- **`/features/`** - Feature-based modules (NEW - preferred for new code)
  - `/gallery/` - Gallery-specific components and logic
  - `/exhibitions/` - Exhibition-specific code
  - `/common/` - Shared UI components across features
- **`/hooks/`** - Custom React hooks (NEW)
- **`/types/`** - TypeScript type definitions (NEW)
- **`/components/`** - Reusable React components (legacy - migrate to features)
- **`/lib/`** - Utilities, helpers, and data

### `/public/` Directory

- Static assets served as-is
- Images organized by type/collection
- PWA assets (manifest, icons)

---

## 📊 File Count Summary

```

```

Root Level: 9 config files + 3 docs
/docs/guides/: 9 active guides (organized by category)
/docs/archived/: 4 historical docs + README
/src/app/: 3 pages + 3 layouts/loading
/src/features/: 3 feature folders (NEW - empty, ready for migration)
/src/hooks/: 4 custom hooks (NEW)
/src/types/: 1 type definition file (NEW)
/src/components/: 9 components (to be migrated to features/)
/src/lib/: 2 utility files

```

## 🏗️ Architecture Evolution

**Current State:** Mixed architecture (transitioning)

- ✅ New structure created: `/features`, `/hooks`, `/types`
- ⏳ Gradual migration: Move code as you touch it
- 📚 Documentation updated: All guides organized in `/docs/guides/`

See [ARCHITECTURE.md](./docs/guides/ARCHITECTURE.md) for detailed decisions.
```

## 🏗️ Architecture Evolution

**Current State:** Mixed architecture (transitioning)

- ✅ New structure created: `/features`, `/hooks`, `/types`
- ⏳ Gradual migration: Move code as you touch it
- 📚 Documentation updated: ARCHITECTURE.md added

**Migration Strategy:**

1. Keep existing code working
2. Use new hooks for new features
3. Move components to features when refactoring
4. Update imports gradually

See [ARCHITECTURE.md](./docs/ARCHITECTURE.md) for detailed decisions.

---

## 🔑 Key Files

### For Development

- `package.json` - Dependencies and scripts
- `next.config.ts` - Next.js and image configuration
- `tsconfig.json` - TypeScript settings

### For Documentation

- `README.md` - Project overview
- `CHANGELOG.md` - Change history
- `PROJECT_STRUCTURE.md` - This file (structure overview)
- `/docs/README.md` - Documentation index with maintenance warning
- `/docs/guides/ARCHITECTURE.md` - Architecture decisions and rationale

### For Deployment

- `netlify.toml` - Netlify configuration
- `public/manifest.json` - PWA manifest

---

## 🚀 Quick Navigation

| Need                | Go To                                |
| ------------------- | ------------------------------------ |
| Getting started     | `/README.md`                         |
| Recent changes      | `/CHANGELOG.md`                      |
| All documentation   | `/docs/README.md`                    |
| Image optimization  | `/docs/guides/IMAGE_OPTIMIZATION.md` |
| Add new images      | `/docs/guides/IMAGE_GUIDE.md`        |
| Main gallery code   | `/src/app/page.tsx`                  |
| Reusable components | `/src/components/`                   |

---

**Last Updated:** November 8, 2025
