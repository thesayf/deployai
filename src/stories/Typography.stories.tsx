import type { Meta, StoryObj } from '@storybook/nextjs';
import { HeadingH1 } from '@/components/heading-h1';
import { HeadingH3 } from '@/components/heading-h3';
import { HeadingH4 } from '@/components/heading-h4';
import { Paragraph } from '@/components/paragraph';
import { Caption } from '@/components/caption';
import { TextLink } from '@/components/text-link';
import { SpacedText } from '@/components/spaced-text';
import { spacingPresets } from '@/utilities/spacing';

const meta = {
  title: 'System/Typography',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Complete typography system showcasing all components and spacing rules.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const CompleteSystem: Story = {
  render: () => (
    <div className="max-w-4xl mx-auto">
      <HeadingH1 variant="hero" accent="orange" align="center">
        Typography System
      </HeadingH1>
      
      <div className="mt-12 space-y-16">
        {/* Type Scale */}
        <section>
          <HeadingH3 variant="pill" accent="blue">Type Scale</HeadingH3>
          <div className="mt-8 space-y-6">
            <div>
              <Caption variant="label" uppercase>Display XL</Caption>
              <HeadingH1 variant="hero">Transform Your Vision</HeadingH1>
            </div>
            <div>
              <Caption variant="label" uppercase>Display L</Caption>
              <h2 className="text-5xl font-black">Build Something Great</h2>
            </div>
            <div>
              <Caption variant="label" uppercase>Heading H3</Caption>
              <HeadingH3>Section Heading</HeadingH3>
            </div>
            <div>
              <Caption variant="label" uppercase>Heading H4</Caption>
              <HeadingH4>Subsection Title</HeadingH4>
            </div>
            <div>
              <Caption variant="label" uppercase>Body Large</Caption>
              <Paragraph variant="lead">Lead paragraph text for introductions</Paragraph>
            </div>
            <div>
              <Caption variant="label" uppercase>Body Medium</Caption>
              <Paragraph>Regular body text for content</Paragraph>
            </div>
            <div>
              <Caption variant="label" uppercase>Body Small</Caption>
              <Paragraph variant="small">Small text for secondary information</Paragraph>
            </div>
            <div>
              <Caption variant="label" uppercase>Caption</Caption>
              <Caption>Caption text for metadata</Caption>
            </div>
          </div>
        </section>

        {/* Spacing Examples */}
        <section>
          <HeadingH3 variant="pill" accent="red">Spacing System</HeadingH3>
          <div className="mt-8">
            <SpacedText>
              <HeadingH1 variant="brutal-outline" as="h1">Main Heading</HeadingH1>
              <Paragraph variant="lead" as="p">
                This demonstrates proper spacing between H1 and paragraph elements. 
                The spacing is automatically applied based on our design system rules.
              </Paragraph>
              <HeadingH3 variant="underline" as="h3">Subheading</HeadingH3>
              <Paragraph as="p">
                Content under subheadings has appropriate spacing to create clear 
                visual hierarchy and improve readability.
              </Paragraph>
              <Paragraph as="p">
                Multiple paragraphs also have consistent spacing between them to 
                ensure comfortable reading experience.
              </Paragraph>
            </SpacedText>
          </div>
        </section>

        {/* Color Variations */}
        <section>
          <HeadingH3 variant="pill" accent="magenta">Color System</HeadingH3>
          <div className="mt-8 space-y-4">
            <Paragraph color="default">Default charcoal text color</Paragraph>
            <Paragraph color="muted">Muted graphite for secondary content</Paragraph>
            <Paragraph color="accent">Accent orange for emphasis</Paragraph>
            <div className="bg-obsidian p-4">
              <Paragraph color="white">White text on dark backgrounds</Paragraph>
            </div>
          </div>
        </section>

        {/* Link Styles */}
        <section>
          <HeadingH3 variant="pill" accent="yellow">Link Styles</HeadingH3>
          <div className="mt-8 space-y-4">
            <Paragraph>
              Here's a <TextLink href="#">default link</TextLink> within text, 
              or one with an <TextLink href="#" variant="underline">underline effect</TextLink>.
              You can also use <TextLink href="#" variant="arrow">arrow links</TextLink> for navigation.
            </Paragraph>
            <div className="flex gap-4">
              <TextLink href="#" variant="button" color="accent">Primary CTA</TextLink>
              <TextLink href="#" variant="button" color="default">Secondary CTA</TextLink>
            </div>
          </div>
        </section>

        {/* Real-world Example */}
        <section>
          <HeadingH3 variant="pill" accent="cyan">Real-world Example</HeadingH3>
          <article className="mt-8 border-3 border-black bg-white p-8" style={{ boxShadow: '6px 6px 0px #000' }}>
            <div className="space-y-2 mb-6">
              <Caption variant="label" uppercase>Case Study</Caption>
              <HeadingH1 variant="split-color" accent="orange">
                Revolutionizing E-commerce
              </HeadingH1>
              <Caption variant="meta" color="muted">
                Published March 15, 2024 • 8 min read
              </Caption>
            </div>
            
            <SpacedText>
              <Paragraph variant="lead" as="p">
                Discover how we transformed a traditional retail business into a 
                digital powerhouse, increasing their online revenue by 300% in just six months.
              </Paragraph>
              
              <HeadingH3 variant="numbered" number="01" as="h3">The Challenge</HeadingH3>
              <Paragraph as="p">
                Our client faced declining foot traffic and needed to establish a 
                strong online presence to remain competitive in the evolving retail landscape.
              </Paragraph>
              
              <HeadingH3 variant="numbered" number="02" as="h3">Our Approach</HeadingH3>
              <Paragraph as="p">
                We implemented a comprehensive digital strategy combining cutting-edge 
                e-commerce technology with targeted marketing campaigns.
              </Paragraph>
              
              <Paragraph variant="highlight" as="p">
                Key Result: 300% increase in online revenue and 50% reduction in 
                customer acquisition costs.
              </Paragraph>
            </SpacedText>
            
            <div className="mt-8 pt-6 border-t-3 border-black">
              <TextLink href="#" variant="arrow" size="large">
                Read the full case study
              </TextLink>
            </div>
          </article>
        </section>
      </div>
    </div>
  ),
};

export const HeadingHierarchy: Story = {
  render: () => (
    <div className="space-y-8">
      <HeadingH1 variant="hero">H1: Page Title</HeadingH1>
      <h2 className="text-4xl font-bold">H2: Major Section</h2>
      <HeadingH3 variant="default">H3: Subsection</HeadingH3>
      <HeadingH4 variant="default">H4: Minor Heading</HeadingH4>
      <Paragraph>Body text follows the heading hierarchy</Paragraph>
      <Caption>Caption for additional context</Caption>
    </div>
  ),
};

export const TextVariations: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <Caption variant="label" uppercase className="mb-2">Font Weights</Caption>
        <p className="font-normal">Normal weight (400)</p>
        <p className="font-medium">Medium weight (500)</p>
        <p className="font-bold">Bold weight (700)</p>
        <p className="font-black">Black weight (900)</p>
      </div>
      
      <div>
        <Caption variant="label" uppercase className="mb-2">Text Transforms</Caption>
        <p className="uppercase">UPPERCASE TEXT</p>
        <p className="lowercase">lowercase text</p>
        <p className="capitalize">Capitalize Each Word</p>
      </div>
      
      <div>
        <Caption variant="label" uppercase className="mb-2">Letter Spacing</Caption>
        <p className="tracking-tighter">Tighter letter spacing</p>
        <p className="tracking-normal">Normal letter spacing</p>
        <p className="tracking-wide">Wide letter spacing</p>
      </div>
    </div>
  ),
};

export const ResponsiveTypography: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="border-3 border-black p-6 bg-warmPeach">
        <HeadingH1 variant="hero" responsive>
          Responsive Heading
        </HeadingH1>
        <Paragraph className="mt-4">
          This heading scales across different screen sizes. Resize your browser to see it in action.
        </Paragraph>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border-3 border-black p-6 bg-skyBlue">
          <HeadingH4 variant="tag" accent="blue">Mobile First</HeadingH4>
          <Paragraph size="small" className="mt-2">
            Typography that looks great on all devices
          </Paragraph>
        </div>
        <div className="border-3 border-black p-6 bg-lavender">
          <HeadingH4 variant="tag" accent="magenta">Fluid Scaling</HeadingH4>
          <Paragraph size="small" className="mt-2">
            Smooth transitions between breakpoints
          </Paragraph>
        </div>
      </div>
    </div>
  ),
};