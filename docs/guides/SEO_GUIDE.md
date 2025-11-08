# SEO & Open Graph Setup Guide

## ✅ What's Been Added

### 1. **Root Layout** (`/src/app/layout.tsx`)

Complete SEO metadata including:

- Page title and description in Czech
- Open Graph tags for social sharing
- Twitter Card metadata
- Robots meta tags for search engines
- Canonical URLs
- Keywords
- Language set to Czech (`lang="cs"`)

### 2. **About Page** (`/src/app/ja/layout.tsx`)

Specific metadata for the About page

### 3. **Exhibitions Page** (`/src/app/vystavy/layout.tsx`)

Specific metadata for the Exhibitions page

## 📝 To-Do: Add Open Graph Image

You need to add an OG (Open Graph) image for social media sharing:

### Required Image:

- **Location:** `/public/images/og-image.jpg`
- **Dimensions:** 1200 x 630 pixels (exact)
- **Format:** JPG or PNG
- **Content:** Should represent the portfolio (artwork preview, portrait, or logo)

### How to create it:

1. Choose a representative artwork or create a branded image
2. Add text overlay if desired: "Tereza Zichová - Malba, kresba, grafika"
3. Export as 1200x630px
4. Place in `/public/images/og-image.jpg`

### Preview tools:

- Facebook: https://developers.facebook.com/tools/debug/
- Twitter: https://cards-dev.twitter.com/validator
- LinkedIn: https://www.linkedin.com/post-inspector/

## 🔍 What This Does

When someone shares your website on:

- **Facebook/Instagram:** Shows title, description, and image
- **Twitter:** Shows Twitter Card with image
- **LinkedIn:** Shows professional preview
- **WhatsApp/Messenger:** Shows rich preview
- **Google Search:** Better search result appearance

## 📊 Current Metadata Structure

```
Root (/) - Portfolio/Gallery
├── Title: "Tereza Zichová - Malba, kresba, grafika"
├── OG Image: /images/og-image.jpg
└── Description: Full Czech description

/ja (About)
├── Title: "O mně - Tereza Zichová"
└── Description: About page description

/vystavy (Exhibitions)
├── Title: "Výstavy - Tereza Zichová"
└── Description: Exhibitions description
```

## 🌍 Language & Locale

- Primary language: Czech (`cs`)
- OG locale: `cs_CZ`
- All metadata in Czech for local audience

## ✨ Automatic Features (Next.js)

- Canonical URLs automatically generated
- Meta tags automatically injected into `<head>`
- Each page can override metadata via its layout file
- SEO-friendly URLs maintained
