import type { Meta, StoryObj } from '@storybook/nextjs';
import { TableOfContents } from './TableOfContents';

const meta = {
  title: 'Blog/TableOfContents',
  component: TableOfContents,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Title shown above the table of contents',
    },
    showProgress: {
      control: 'boolean',
      description: 'Show reading progress bar',
    },
    mobileStatic: {
      control: 'boolean',
      description: 'Show as static content on mobile vs toggle button',
    },
  },
} satisfies Meta<typeof TableOfContents>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample sections for stories
const blogSections = [
  { id: 'introduction', title: "Dubai's 2025 Web Development Landscape" },
  { id: 'cost-in-dubai', title: 'How Much Does Website Development Cost in Dubai?' },
  { id: 'dubai-for-developers', title: 'Is Dubai Good for Web Developers?' },
  { id: 'best-company', title: 'Which Company is Best for Web Development?' },
  { id: 'how-to-choose', title: 'How to Choose the Right Web Development Company in Dubai?' },
  { id: 'development-models', title: '4 Web Development Models in Dubai' },
  { id: 'top-10-companies', title: 'Top 10 Web Development Companies in Dubai' },
  { id: 'pricing-guide', title: 'Dubai Web Development Pricing Guide' },
  { id: 'technology-stack', title: 'What Technologies Do Dubai Agencies Use?' },
  { id: 'trends-2025', title: "What's Changing in 2025?" },
  { id: 'decision-guide', title: 'Decision Guide – Find Your Best Fit' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'conclusion', title: 'Conclusion & Action Plan' }
];

const nestedSections = [
  { id: 'intro', title: 'Introduction', level: 0 },
  { id: 'overview', title: 'Overview', level: 1 },
  { id: 'background', title: 'Background', level: 1 },
  { id: 'features', title: 'Key Features', level: 0 },
  { id: 'feature-1', title: 'Feature One', level: 1 },
  { id: 'feature-2', title: 'Feature Two', level: 1 },
  { id: 'pricing', title: 'Pricing', level: 0 },
  { id: 'conclusion', title: 'Conclusion', level: 0 },
];

// Create a wrapper with content to demonstrate scroll behavior
const ScrollableWrapper = ({ children, isMobile = false }: { children: React.ReactNode; isMobile?: boolean }) => (
  <div className="min-h-screen bg-gray-50">
    {/* Hero section for mobile */}
    {isMobile && (
      <div className="bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-zinc-900">Dubai Web Development Companies Guide</h1>
        <p className="mt-2 text-zinc-600">Everything you need to know about web development in Dubai</p>
      </div>
    )}
    
    {children}
    
    {/* Dummy content with matching IDs */}
    <article className={`mx-auto max-w-4xl px-4 py-12 ${!isMobile ? 'lg:ml-72' : ''}`}>
      {blogSections.map((section) => (
        <section key={section.id} id={section.id} className="mb-16">
          <h2 className="mb-4 text-3xl font-bold">{section.title}</h2>
          <div className="space-y-4">
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="text-gray-600">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
              culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p className="text-gray-600">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
              doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
              veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
          </div>
        </section>
      ))}
    </article>
  </div>
);

export const Default: Story = {
  args: {
    sections: blogSections,
    title: 'Table of Contents',
    showProgress: true,
    mobileStatic: true,
  },
  render: (args) => (
    <ScrollableWrapper>
      <TableOfContents {...args} />
    </ScrollableWrapper>
  ),
};

export const CustomTitle: Story = {
  args: {
    sections: blogSections,
    title: 'In This Guide',
    showProgress: true,
    mobileStatic: true,
  },
  render: (args) => (
    <ScrollableWrapper>
      <TableOfContents {...args} />
    </ScrollableWrapper>
  ),
};

export const NoProgress: Story = {
  args: {
    sections: blogSections,
    title: 'Quick Navigation',
    showProgress: false,
    mobileStatic: true,
  },
  render: (args) => (
    <ScrollableWrapper>
      <TableOfContents {...args} />
    </ScrollableWrapper>
  ),
};

export const WithNestedLevels: Story = {
  args: {
    sections: nestedSections,
    title: 'Contents',
    showProgress: true,
    mobileStatic: true,
  },
  render: (args) => (
    <ScrollableWrapper>
      <TableOfContents {...args} />
    </ScrollableWrapper>
  ),
};

export const MobileToggle: Story = {
  args: {
    sections: blogSections,
    title: 'Table of Contents',
    showProgress: true,
    mobileStatic: false, // This enables toggle button behavior
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: (args) => (
    <ScrollableWrapper isMobile={true}>
      <TableOfContents {...args} />
    </ScrollableWrapper>
  ),
};

export const MobileStatic: Story = {
  args: {
    sections: blogSections,
    title: 'Table of Contents',
    showProgress: true,
    mobileStatic: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: (args) => (
    <ScrollableWrapper isMobile={true}>
      <TableOfContents {...args} />
    </ScrollableWrapper>
  ),
};