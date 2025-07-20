# People Also Ask Component

A reusable, SEO-optimized expandable FAQ component designed for blog posts and landing pages. Features smooth animations, structured data support, and customizable styling.

## Features

- **SEO Optimized** - Automatically generates FAQ Schema markup
- **Smooth Animations** - Framer Motion powered expand/collapse
- **Customizable** - Title, subtitle, and variant options
- **Accessible** - Keyboard navigation and ARIA support
- **Responsive** - Works beautifully on all devices
- **TypeScript** - Full type safety

## Usage

### Basic Usage

```tsx
import { PeopleAlsoAsk } from '@/components/people-also-ask';

const faqItems = [
  {
    question: "What is web development?",
    answer: "Web development is the process of building and maintaining websites..."
  },
  {
    question: "How long does it take?",
    answer: <div>
      <p>Timeline depends on complexity:</p>
      <ul>
        <li>Simple site: 2-4 weeks</li>
        <li>Complex app: 3-6 months</li>
      </ul>
    </div>
  }
];

<PeopleAlsoAsk items={faqItems} />
```

### With All Options

```tsx
<PeopleAlsoAsk
  title="Frequently Asked Questions"
  subtitle="Everything you need to know about our services"
  items={faqItems}
  defaultOpenIndex={0}  // First item open by default
  variant="compact"     // Smaller padding
  className="my-8"
/>
```

### Pre-built Dubai Content

```tsx
import { DubaiWebDevPAA } from '@/components/people-also-ask/dubai-web-dev-content';

// Use the pre-configured Dubai web development PAA
<DubaiWebDevPAA />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `FAQItem[]` | Required | Array of questions and answers |
| `title` | `string` | "People Also Ask" | Section title |
| `subtitle` | `string` | - | Optional subtitle |
| `defaultOpenIndex` | `number` | 0 | Which item to open initially |
| `variant` | `'default' \| 'compact'` | 'default' | Size variant |
| `className` | `string` | "" | Additional CSS classes |

## FAQ Item Structure

```tsx
interface FAQItem {
  question: string;
  answer: React.ReactNode;  // Can be string or JSX
}
```

## Styling

The component uses our theme colors:
- **Active state**: Emerald (green) colors
- **Default state**: Zinc (gray) colors
- **Hover effects**: Subtle transitions

### Custom Answer Content

You can use rich content in answers:

```tsx
const items = [
  {
    question: "What technologies do you use?",
    answer: (
      <div className="space-y-3">
        <p>We use modern technologies:</p>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded bg-emerald-50 p-3">
            <h4 className="font-semibold">Frontend</h4>
            <ul className="text-sm">
              <li>React/Next.js</li>
              <li>TypeScript</li>
            </ul>
          </div>
          
          <div className="rounded bg-blue-50 p-3">
            <h4 className="font-semibold">Backend</h4>
            <ul className="text-sm">
              <li>Node.js</li>
              <li>Python</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
];
```

## SEO Benefits

The component automatically generates FAQ structured data:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "Your question here",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Your answer here"
    }
  }]
}
```

This helps search engines understand your content and can lead to rich snippets in search results.

## Variants

### Default Variant
- More padding and spacing
- Larger text size
- Best for main content areas

### Compact Variant
- Reduced padding
- Smaller text
- Good for sidebars or dense layouts

## Notes

- First item is open by default (configurable)
- Only one item can be open at a time
- Smooth height animations on expand/collapse
- Includes hover and focus states for accessibility