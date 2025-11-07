# Artist Portfolio

A modern, responsive portfolio website built with Next.js, showcasing artistic works through an optimized image gallery. Perfect for artists, photographers, and creative professionals.

## ✨ Features

- **Responsive Image Gallery** - Masonry layout with filtering by category
- **Image Optimization** - Automatic WebP conversion and lazy loading
- **Interactive Lightbox** - Full-screen image viewing with detailed information
- **Smooth Animations** - Framer Motion powered transitions and effects
- **Contact Form** - React Hook Form with validation
- **SEO Optimized** - Built-in Next.js SEO features
- **Mobile-First Design** - Tailwind CSS responsive design
- **TypeScript** - Full type safety and better development experience

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Forms**: React Hook Form
- **Icons**: Lucide React
- **Language**: TypeScript
- **Image Optimization**: Next.js Image component with Sharp

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd artist-portfolio
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── gallery/           # Gallery page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable React components
│   ├── ContactForm.tsx    # Contact form with validation
│   ├── Footer.tsx         # Site footer
│   ├── Header.tsx         # Navigation header
│   └── ImageGallery.tsx   # Gallery with filtering & lightbox
```

## 🎨 Customization

### Adding Artwork

Edit the `artworks` array in `src/app/galerie/page.tsx`:

```typescript
const artworks = [
  {
    id: 1,
    title: "Your Artwork Title",
    category: "digital", // digital, photography, traditional
    image: "/path/to/image.jpg",
    description: "Artwork description",
    year: 2024,
  },
  // Add more artworks...
];
```

### Styling

The project uses Tailwind CSS. Customize colors, fonts, and spacing in `tailwind.config.js`.

### Content

- Update artist information in `src/app/o-mne/page.tsx`
- Modify contact details in `src/app/kontakt/page.tsx`
- Change site metadata in `src/app/layout.tsx`

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy with zero configuration

### Other Platforms

Build the project:

```bash
npm run build
npm start
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🎯 Performance Features

- **Image Optimization**: Automatic WebP conversion and responsive images
- **Lazy Loading**: Images load as they enter the viewport
- **Static Generation**: Pages are pre-rendered for optimal performance
- **Bundle Optimization**: Automatic code splitting and tree shaking

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
