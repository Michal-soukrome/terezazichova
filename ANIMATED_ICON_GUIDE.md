# AnimatedIcon Component Usage Guide

The `AnimatedIcon` component makes it super easy to add left-to-right fill animations to any Lucide icon!

## Basic Usage

```tsx
import AnimatedIcon from './components/AnimatedIcon';
import { Mail, Heart, Star } from 'lucide-react';

// Basic usage
<div className="group">
  <AnimatedIcon icon={Mail} />
</div>

// With custom size and duration
<div className="group">
  <AnimatedIcon
    icon={Heart}
    size={32}
    duration={1000}
  />
</div>
```

## Props

- `icon`: Any Lucide React icon component
- `size`: Icon size in pixels (default: 24)
- `duration`: Animation duration in milliseconds (default: 800)
- `className`: Additional CSS classes

## Requirements

1. **Wrap in group**: The parent element needs `className="group"`
2. **Import the icon**: Import any Lucide icon you want to animate

## Examples

### Email Link

```tsx
<a
  href="mailto:email@example.com"
  className="group flex items-center space-x-2"
>
  <AnimatedIcon icon={Mail} size={16} duration={600} />
  <span>Email me</span>
</a>
```

### Social Media

```tsx
<a href="https://instagram.com" className="group flex items-center space-x-2">
  <AnimatedIcon icon={Instagram} size={20} />
  <span>Follow me</span>
</a>
```

### Buttons

```tsx
<button className="group flex items-center space-x-2">
  <AnimatedIcon icon={Download} size={18} />
  <span>Download</span>
</button>
```

## Available Lucide Icons

You can use ANY Lucide icon! Popular ones:

- `Mail`, `Phone`, `Instagram`, `Twitter`, `Facebook`
- `Download`, `Upload`, `Save`, `Share`
- `Heart`, `Star`, `Bookmark`, `ThumbsUp`
- `Search`, `Filter`, `Settings`, `User`
- `ChevronRight`, `ArrowRight`, `ExternalLink`
- And hundreds more!

## Animation Effect

The icon starts as a gray outline and fills with black from left to right on hover. Perfect for interactive elements!
