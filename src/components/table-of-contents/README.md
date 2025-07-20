# Table of Contents Component

A reusable, responsive table of contents component that tracks scroll position and provides navigation for long-form content.

## Features

- **Sticky sidebar on desktop** - Stays visible while scrolling
- **Static display on mobile** - Shows under hero section by default
- **Scroll tracking** - Highlights current section automatically
- **Progress indicator** - Shows reading progress through the article
- **Smooth scrolling** - Animated scroll to sections
- **Fully customizable** - Title, styling, behavior options
- **Accessible** - Proper ARIA labels and keyboard navigation

## Usage

```tsx
import { TableOfContents } from '@/components/table-of-contents';

// Define your sections
const sections = [
  { id: 'introduction', title: 'Introduction' },
  { id: 'features', title: 'Key Features' },
  { id: 'pricing', title: 'Pricing Guide' },
  { id: 'faq', title: 'FAQs' },
];

// Basic usage (recommended)
<TableOfContents 
  sections={sections}
/>

// With all options
<TableOfContents 
  sections={sections}
  title="Quick Navigation"
  showProgress={true}
  mobileStatic={true}
  className="my-custom-class"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `sections` | `Section[]` | Required | Array of sections with id and title |
| `title` | `string` | "Table of Contents" | Title displayed above links |
| `showProgress` | `boolean` | `true` | Show reading progress bar |
| `mobileStatic` | `boolean` | `true` | Show as static content on mobile vs toggle |
| `className` | `string` | `""` | Additional CSS classes |

## Section Object

```tsx
interface Section {
  id: string;      // Must match the ID of your HTML section
  title: string;   // Display text for the link
  level?: number;  // Optional: Indent level (0, 1, 2, etc.)
}
```

## Example with Blog Layout

```tsx
export const BlogPage = () => {
  const sections = [
    { id: 'intro', title: 'Introduction' },
    { id: 'chapter-1', title: 'Chapter 1: Getting Started' },
    { id: 'sub-1-1', title: 'Installation', level: 1 },
    { id: 'sub-1-2', title: 'Configuration', level: 1 },
    { id: 'chapter-2', title: 'Chapter 2: Advanced Usage' },
    { id: 'conclusion', title: 'Conclusion' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <h1>My Blog Post</h1>
      </section>

      {/* Table of Contents - static on mobile under hero */}
      <TableOfContents sections={sections} />

      {/* Main Content - with left margin for desktop TOC */}
      <article className="mx-auto max-w-4xl px-4 py-12 lg:ml-72">
        <section id="intro">
          <h2>Introduction</h2>
          <p>Content...</p>
        </section>

        <section id="chapter-1">
          <h2>Chapter 1: Getting Started</h2>
          
          <section id="sub-1-1">
            <h3>Installation</h3>
            <p>Content...</p>
          </section>

          <section id="sub-1-2">
            <h3>Configuration</h3>
            <p>Content...</p>
          </section>
        </section>

        {/* More sections... */}
      </article>
    </div>
  );
};
```

## Styling

The component uses:
- **Emerald** colors for active states
- **Zinc/Gray** for inactive states
- **Responsive breakpoints** at `lg` (1024px)

You can override styles with the `className` prop or target the internal classes.

## Mobile Behavior

By default (`mobileStatic={true}`):
- Desktop: Sticky sidebar on the left
- Mobile: Static gray box under hero section

With `mobileStatic={false}`:
- Desktop: Same sticky sidebar
- Mobile: Floating toggle button that opens a slide-out menu

## Notes

- Make sure your section IDs match exactly between the sections array and your HTML
- The component automatically handles header offset for smooth scrolling
- Progress bar updates as the user scrolls through the content
- Active section highlighting uses Intersection Observer for performance