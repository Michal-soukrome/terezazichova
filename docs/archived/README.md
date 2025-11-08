# Archived Documentation

This folder contains historical documentation that has been superseded by newer approaches but is kept for reference.

## 📜 Contents

### Image Optimization Evolution

1. **IMAGE_OPTIMIZATION.md** (Archived)

   - Original approach using custom Intersection Observer
   - Manual image preloading strategies
   - Three-tier loading system
   - **Why archived:** Replaced by Next.js native lazy loading

2. **IMAGE_OPTIMIZATION_QUICK.md** (Archived)

   - Quick reference for the custom optimization approach
   - Performance metrics from the original implementation
   - **Why archived:** Approach no longer used

3. **IMAGE_OPTIMIZATION_STATUS.md** (Archived)

   - Implementation status report from November 8, 2025
   - Detailed breakdown of completed optimizations
   - **Why archived:** Historical record of migration process

4. **NEXTJS_BUILT_INS.md** (Archived)
   - Documentation of migration from custom code to Next.js built-ins
   - Comparison of old vs new approaches
   - **Why archived:** Migration completed, now standard practice

---

## 🔄 What Changed

### Before (Custom Approach)

- Custom `OptimizedImage` component with intersection observer
- Manual prefetch logic with `<link>` tags
- Complex three-tier loading strategy
- ~200 lines of custom image optimization code

### After (Next.js Built-ins)

- Native `next/image` component
- Browser's native lazy loading
- Next.js automatic prefetching
- Simple, maintainable code using framework features

---

## 📖 For Current Implementation

See the active documentation:

- **[/docs/guides/IMAGE_OPTIMIZATION.md](../guides/IMAGE_OPTIMIZATION.md)** - Current image optimization guide

---

## 🎓 Learning Value

These archived documents are useful for:

- Understanding the evolution of the project
- Learning why certain decisions were made
- Seeing what problems were solved
- Reference for future optimization decisions

---

## ⚠️ Important

**Do not use these archived documents as implementation guides.** They describe approaches that have been deprecated in favor of simpler, more maintainable solutions using Next.js built-in features.

Always refer to the active guides in `/docs/guides/` for current best practices.

---

**Last Updated:** November 8, 2025
