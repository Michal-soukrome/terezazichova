# Documentation Index

This folder contains all project documentation, organized for easy navigation.

## ⚠️ Documentation Maintenance Warning

**Documentation rots fast.** We maintain a **ruthlessly curated** approach:

- ✅ **Update or delete** - No outdated docs allowed
- ✅ **Quarterly review** - Check relevance every 3 months
- ✅ **Archive, don't delete** - Move old docs to `/archived/` for history
- ✅ **Kill duplicates** - One source of truth per topic

**Next Review:** February 2026

---

## 📁 Structure

```
docs/
├── guides/          # Active implementation guides
├── archived/        # Historical documentation
└── README.md        # This file
```

---

## 📚 Active Guides

### `/docs/guides/`

Current, up-to-date documentation for the project:

#### Architecture & Organization

- **[ARCHITECTURE.md](./guides/ARCHITECTURE.md)** - Core architectural decisions and rationale
- **[ARCHITECTURE_IMPROVEMENTS.md](./guides/ARCHITECTURE_IMPROVEMENTS.md)** - Summary of architecture improvements
- **[MIGRATION_GUIDE.md](./guides/MIGRATION_GUIDE.md)** - Step-by-step guide for migrating to new architecture
- **[ORGANIZATION_SUMMARY.md](./guides/ORGANIZATION_SUMMARY.md)** - Repository organization summary

#### Image Management

- **[IMAGE_OPTIMIZATION.md](./guides/IMAGE_OPTIMIZATION.md)** - Complete guide on how we handle image loading and optimization using Next.js built-ins
- **[IMAGE_ORGANIZATION.md](./guides/IMAGE_ORGANIZATION.md)** - Scalable image folder structure for multiple exhibitions
- **[IMAGE_GUIDE.md](./guides/IMAGE_GUIDE.md)** - Guide for adding and managing images in the gallery

#### Features & Configuration

- **[PWA_GUIDE.md](./guides/PWA_GUIDE.md)** - Progressive Web App setup and configuration
- **[SEO_GUIDE.md](./guides/SEO_GUIDE.md)** - SEO optimization strategies and implementation

---

## 🗄️ Archived Documentation

### `/docs/archived/`

Historical documentation kept for reference:

- **IMAGE_OPTIMIZATION.md** - Original custom intersection observer approach (deprecated)
- **IMAGE_OPTIMIZATION_QUICK.md** - Quick reference for old optimization strategy
- **IMAGE_OPTIMIZATION_STATUS.md** - Status report from initial optimization implementation
- **NEXTJS_BUILT_INS.md** - Documentation of migration to Next.js native features

> **Note:** These files are kept for historical context but should not be used as current implementation guides.

---

## 📝 Root Documentation

Files in the project root:

- **[/README.md](../README.md)** - Project overview and getting started
- **[/CHANGELOG.md](../CHANGELOG.md)** - Detailed changelog of all project changes

---

## 🚀 Quick Start

### For Developers

1. Start with [/README.md](../README.md) for project setup
2. Check [CHANGELOG.md](../CHANGELOG.md) for recent changes
3. Review [ARCHITECTURE.md](./guides/ARCHITECTURE.md) for architectural decisions
4. See [MIGRATION_GUIDE.md](./guides/MIGRATION_GUIDE.md) for refactoring guidelines

### For Understanding Architecture

- **Decisions & Rationale:** [ARCHITECTURE.md](./guides/ARCHITECTURE.md)
- **Recent Improvements:** [ARCHITECTURE_IMPROVEMENTS.md](./guides/ARCHITECTURE_IMPROVEMENTS.md)
- **Migration Steps:** [MIGRATION_GUIDE.md](./guides/MIGRATION_GUIDE.md)

### For Images

- **Adding Images:** [IMAGE_GUIDE.md](./guides/IMAGE_GUIDE.md)
- **Optimization:** [IMAGE_OPTIMIZATION.md](./guides/IMAGE_OPTIMIZATION.md)
- **Scalable Organization:** [IMAGE_ORGANIZATION.md](./guides/IMAGE_ORGANIZATION.md)

### For Configuration

- **PWA Setup:** [PWA_GUIDE.md](./guides/PWA_GUIDE.md)
- **SEO Strategy:** [SEO_GUIDE.md](./guides/SEO_GUIDE.md)

---

## 🔄 Maintenance

### When to Update Documentation

- **Feature additions**: Update relevant guide or create new one
- **Architecture changes**: Update guide and add entry to CHANGELOG.md
- **Deprecations**: Move old guide to `/archived/` and create updated version
- **Bug fixes**: Update CHANGELOG.md only (unless it affects documentation)

### Documentation Standards

- Use Markdown format
- Include last updated date
- Provide code examples where relevant
- Keep guides focused and single-purpose
- Cross-reference related guides

---

## 📊 Documentation Status

| Guide              | Status    | Last Updated |
| ------------------ | --------- | ------------ |
| IMAGE_OPTIMIZATION | ✅ Active | 2025-11-08   |
| IMAGE_GUIDE        | ✅ Active | -            |
| PWA_GUIDE          | ✅ Active | -            |
| SEO_GUIDE          | ✅ Active | -            |
| CHANGELOG          | ✅ Active | 2025-11-08   |

---

## 🤝 Contributing

When contributing to documentation:

1. Update the relevant guide in `/docs/guides/`
2. Add entry to `/CHANGELOG.md` if significant
3. Update this index if adding new guides
4. Keep archived docs in `/docs/archived/` for history

---

**Last Updated:** November 8, 2025
