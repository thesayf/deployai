import type { Meta, StoryObj } from '@storybook/nextjs';
import { SectionDemo } from './SectionDemo';

const meta: Meta<typeof SectionDemo> = {
  title: 'Examples/SectionDemo',
  component: SectionDemo,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Section Demo - Full Page Example

A comprehensive demonstration of how our neubrutalist components look on different section backgrounds.

## What This Demo Shows

1. **Background Variety** - All available background colors with real components
2. **Component Compatibility** - How each component looks on different backgrounds
3. **Mobile Responsiveness** - Padding adjustments across breakpoints
4. **Pattern Examples** - Recommended background sequences for landing pages
5. **Spacing Options** - Visual comparison of spacing variants

## Key Observations

### White Cards Pop
Our neubrutalist components with white backgrounds and black borders create strong contrast against colored backgrounds.

### Gradient Backgrounds
Work best with components that have solid color accents (like pricing cards) rather than gradient elements.

### Dark Sections
Automatically handle text color changes. Best used sparingly for CTAs or important announcements.

### Soft Colors
- **Warm Peach** - Friendly and approachable
- **Cool Mint** - Fresh and modern
- **Sky Blue** - Professional and trustworthy
- **Lavender** - Creative and unique
- **Concrete** - Neutral separator

## Mobile Testing
View this demo on different screen sizes to see responsive padding adjustments:
- Mobile: 16px horizontal padding
- Tablet: 24px horizontal padding  
- Desktop: 32px horizontal padding

## Usage in Pages
This demo serves as a reference for assembling landing pages with proper visual rhythm and variety.
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Full demo page
export const FullDemo: Story = {};

// Mobile viewport
export const MobileDemo: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'iphone6',
    },
  },
};

// Tablet viewport
export const TabletDemo: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'ipad',
    },
  },
};

// Print preview
export const PrintPreview: Story = {
  parameters: {
    backgrounds: { default: 'white' },
  },
  decorators: [
    (Story) => (
      <div className="print:block">
        <style jsx global>{`
          @media print {
            .no-print {
              display: none !important;
            }
            section {
              page-break-inside: avoid;
            }
          }
        `}</style>
        <Story />
      </div>
    ),
  ],
};

// Dark mode simulation
export const DarkModeContext: Story = {
  decorators: [
    (Story) => (
      <div className="dark">
        <div className="bg-gray-900 text-white">
          <p className="p-8 text-center">
            Note: This is just a context demo. Our components maintain their 
            own background colors regardless of dark mode.
          </p>
          <Story />
        </div>
      </div>
    ),
  ],
};

// Pattern showcase only
export const PatternShowcase: Story = {
  decorators: [
    () => (
      <div className="p-8 bg-gray-100">
        <h2 className="text-3xl font-bold mb-8 text-center">Background Pattern Examples</h2>
        
        <div className="space-y-8 max-w-4xl mx-auto">
          <div>
            <h3 className="text-xl font-bold mb-4">Classic Pattern (Safe & Professional)</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              <div className="h-20 bg-white border-2 border-black flex items-center justify-center text-xs font-bold">Hero</div>
              <div className="h-20 bg-[#FFF5F0] border-2 border-black flex items-center justify-center text-xs font-bold">Stats</div>
              <div className="h-20 bg-white border-2 border-black flex items-center justify-center text-xs font-bold">Features</div>
              <div className="h-20 bg-[#F0F5FF] border-2 border-black flex items-center justify-center text-xs font-bold">Process</div>
              <div className="h-20 bg-[#212121] text-white border-2 border-black flex items-center justify-center text-xs font-bold">CTA</div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Bold Pattern (High Energy)</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              <div className="h-20 bg-gradient-to-br from-orange-50 to-red-50 border-2 border-black flex items-center justify-center text-xs font-bold">Hero</div>
              <div className="h-20 bg-[#212121] text-white border-2 border-black flex items-center justify-center text-xs font-bold">Stats</div>
              <div className="h-20 bg-white border-2 border-black flex items-center justify-center text-xs font-bold">Features</div>
              <div className="h-20 bg-[#FF6B35] text-white border-2 border-black flex items-center justify-center text-xs font-bold">Pricing</div>
              <div className="h-20 bg-[#D62598] text-white border-2 border-black flex items-center justify-center text-xs font-bold">CTA</div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Minimal Pattern (Clean & Simple)</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              <div className="h-20 bg-white border-2 border-black flex items-center justify-center text-xs font-bold">Hero</div>
              <div className="h-20 bg-[#F5F5F5] border-2 border-black flex items-center justify-center text-xs font-bold">Stats</div>
              <div className="h-20 bg-white border-2 border-black flex items-center justify-center text-xs font-bold">Features</div>
              <div className="h-20 bg-[#F5F5F5] border-2 border-black flex items-center justify-center text-xs font-bold">Pricing</div>
              <div className="h-20 bg-white border-2 border-black flex items-center justify-center text-xs font-bold">CTA</div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Creative Pattern (Unique & Memorable)</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              <div className="h-20 bg-[#F5F0FF] border-2 border-black flex items-center justify-center text-xs font-bold">Hero</div>
              <div className="h-20 bg-[#F0FFF5] border-2 border-black flex items-center justify-center text-xs font-bold">Stats</div>
              <div className="h-20 bg-[#FFF5F0] border-2 border-black flex items-center justify-center text-xs font-bold">Features</div>
              <div className="h-20 bg-[#F0F5FF] border-2 border-black flex items-center justify-center text-xs font-bold">Process</div>
              <div className="h-20 bg-gradient-to-br from-[#FF6B35] to-[#E63946] text-white border-2 border-black flex items-center justify-center text-xs font-bold">CTA</div>
            </div>
          </div>
        </div>

        <div className="mt-12 p-6 bg-white border-2 border-black max-w-2xl mx-auto">
          <h4 className="font-bold mb-2">Guidelines:</h4>
          <ul className="text-sm space-y-1">
            <li>• Alternate between light backgrounds for visual rhythm</li>
            <li>• Use white after every 2-3 colored sections</li>
            <li>• Dark backgrounds only for CTAs or hero sections</li>
            <li>• Gradients sparingly (1-2 per page maximum)</li>
            <li>• Test on mobile to ensure readability</li>
          </ul>
        </div>
      </div>
    ),
  ],
};