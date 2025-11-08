# Architecture Decisions

**Purpose:** Document key architectural decisions and rationale  
**Status:** Living document - update as decisions are made

---

## 📐 Feature-Based Architecture

### Decision

Organize code by **features** rather than technical layers.

### Structure

```
src/
├── features/          # Feature modules
│   ├── gallery/      # Gallery-specific components + logic
│   ├── exhibitions/  # Exhibition-specific code
│   └── common/       # Shared UI components
├── hooks/            # Reusable React hooks
├── types/            # TypeScript type definitions
├── lib/              # Pure utility functions
└── app/              # Next.js App Router pages
```

### Rationale

**Pros:**

- ✅ Cohesive: Related code stays together
- ✅ Scalable: Easy to add new features
- ✅ Maintainable: Clear ownership boundaries
- ✅ Testable: Features can be tested in isolation
- ✅ Refactorable: Safe to modify without breaking other features

**Cons:**

- ⚠️ More initial setup
- ⚠️ Requires discipline to maintain

### When to Use

- Multiple functional domains (exhibitions, tvorba, admin)
- Team has 2+ developers
- Codebase > 5,000 lines
- Planning long-term maintenance

### When NOT to Use

- Single-page apps
- < 1,000 lines of code
- Prototype/MVP phase
- Solo project < 1 month

---

## 🎣 Custom Hooks Layer

### Decision

Extract reusable stateful logic into custom hooks.

### Examples

```typescript
// src/hooks/useIsMobile.ts
export function useIsMobile(breakpoint: number = 768): boolean;

// src/hooks/useImageLoading.ts
export function useImageLoading();

// src/hooks/useGestures.ts
export function useSwipeDown();
export function useZoomState();
```

### Rationale

**Benefits:**

- Eliminates duplicate logic
- Easier testing
- Better separation of concerns
- Cleaner components

**Rules:**

- Hook must be reused in 2+ places OR likely to be reused
- Hook should have single responsibility
- Don't create hooks for one-off logic

---

## 📦 Types Layer

### Decision

Centralize type definitions in `/src/types/`.

### Structure

```typescript
// src/types/index.ts
export interface Artwork { ... }
export interface TvorbaItem { ... }
export interface ArtworkFilters { ... }
export type ImageLoadStates = { ... }
```

### Rationale

**Why separate from data files:**

- Types evolve independently from data
- Prevents circular dependencies
- Easier to import across features
- Single source of truth for interfaces

**When data structures grow:**

- 5+ interface definitions
- Types imported in 3+ files
- External API integration
- Need for complex type compositions

---

## 🖼️ Image Organization

### Current Decision: Flat Structure

```
public/images/gallery/
├── 01-ghmp-2025.jpg
├── 02-ghmp-2025.jpg
```

**Rationale:** Simple, works for 1-2 exhibitions

### Future Decision: Slug-Based Structure

```
public/images/gallery/
├── palac-volneho-casu/
│   ├── 01-artwork.jpg
├── ghmp-2025/
│   ├── 01-artwork.jpg
```

**Migration trigger:** 3+ exhibitions or 50+ images

See [IMAGE_ORGANIZATION.md](./IMAGE_ORGANIZATION.md) for details.

---

## 🚫 What We DON'T Do

### ❌ Barrel Exports Everywhere

**Decision:** Avoid excessive index.ts files

```typescript
// ❌ Don't do this for everything
// src/components/index.ts exporting 50 components

// ✅ Do this for public APIs only
// src/hooks/index.ts (small, stable API)
```

**Rationale:** Barrel files cause import issues, slow HMR, harder to tree-shake

---

### ❌ Over-Engineering

**Decision:** Start simple, add complexity when needed

```typescript
// ❌ Don't create elaborate state management for simple UI
const [isOpen, setIsOpen] = useState(false);

// ✅ Use simple React state until you need more
// Only add Zustand/Redux/Context when truly necessary
```

**Rationale:** YAGNI (You Ain't Gonna Need It)

---

### ❌ Premature Abstraction

**Decision:** Copy-paste until pattern emerges (Rule of 3)

```typescript
// First use: Copy-paste inline
// Second use: Copy-paste again
// Third use: NOW abstract into function/component
```

**Rationale:** Wrong abstraction is worse than duplication

---

## 🎯 Component Patterns

### Co-location

**Decision:** Keep components near their usage

```
src/
├── app/
│   └── page.tsx              # Uses GalleryGrid
└── features/
    └── gallery/
        └── GalleryGrid.tsx   # Only used in gallery feature
```

**When to share:**

- Used in 2+ features → Move to `features/common/`
- Used everywhere → Move to `components/`

---

## 📝 Documentation Strategy

### Decision: Ruthless Curation

**Rules:**

1. **Active docs** in `/docs/guides/` - frequently updated
2. **Archived docs** in `/docs/archived/` - historical reference
3. **Kill outdated docs** - better than letting them rot
4. **Review quarterly** - remove or update stale content

### Documentation Triggers

Create new doc when:

- ✅ Complex feature needs explanation
- ✅ Onboarding new developer
- ✅ Repeated questions in PR reviews

Don't document:

- ❌ Self-explanatory code
- ❌ Obvious patterns
- ❌ Implementation details (use code comments)

---

## 🔄 Migration Strategy

### Gradual Feature Migration

**Plan:** Migrate to feature architecture gradually

```
Phase 1: ✅ Create /features, /hooks, /types structure
Phase 2: ⏳ Extract hooks from pages
Phase 3: ⏳ Move gallery components to /features/gallery
Phase 4: ⏳ Move exhibition logic to /features/exhibitions
Phase 5: ⏳ Organize shared UI in /features/common
```

**Principle:** Don't break working code. Migrate as you touch files.

---

## 📊 Decision Matrix

When in doubt, use this:

| Situation                    | Action                      |
| ---------------------------- | --------------------------- |
| Logic used 1 time            | Keep inline                 |
| Logic used 2 times           | Copy-paste, watch pattern   |
| Logic used 3+ times          | Abstract into function/hook |
| Component used in 1 feature  | Keep co-located             |
| Component used in 2 features | Move to common              |
| Type defined 1 place         | Keep with data              |
| Type used 3+ places          | Move to /types              |
| Uncertainty                  | Choose simplest option      |

---

## 🧪 Validation

Good architecture has:

- ✅ Fast feedback loop (HMR, tests)
- ✅ Easy to find code
- ✅ Clear ownership
- ✅ Isolated changes
- ✅ Low coupling

Bad architecture has:

- ❌ Circular dependencies
- ❌ God files (> 500 lines)
- ❌ Unclear imports
- ❌ Cascading changes
- ❌ Fear of refactoring

---

**Last Updated:** November 8, 2025  
**Next Review:** February 2026
