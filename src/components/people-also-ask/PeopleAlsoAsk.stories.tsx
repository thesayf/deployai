import type { Meta, StoryObj } from '@storybook/react';
import { PeopleAlsoAsk } from './PeopleAlsoAsk';
import { dubaiWebDevPAAItems } from './dubai-web-dev-content';

const meta = {
  title: 'Blog/PeopleAlsoAsk',
  component: PeopleAlsoAsk,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Section title',
    },
    subtitle: {
      control: 'text',
      description: 'Optional subtitle',
    },
    defaultOpenIndex: {
      control: 'number',
      description: 'Which item to open by default (0-based index)',
    },
    variant: {
      control: 'select',
      options: ['default', 'compact'],
      description: 'Size variant',
    },
  },
} satisfies Meta<typeof PeopleAlsoAsk>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample FAQ items for generic stories
const genericItems = [
  {
    question: "What is web development?",
    answer: "Web development is the process of building and maintaining websites. It includes web design, web content development, client-side/server-side scripting, and network security configuration."
  },
  {
    question: "How long does it take to build a website?",
    answer: (
      <div className="space-y-2">
        <p>The timeline depends on the project complexity:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Simple website: 2-4 weeks</li>
          <li>E-commerce site: 6-12 weeks</li>
          <li>Custom application: 3-6 months</li>
        </ul>
      </div>
    )
  },
  {
    question: "What technologies do you use?",
    answer: (
      <div className="space-y-3">
        <p>We use modern, industry-standard technologies:</p>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-emerald-50 p-3 rounded">
            <h4 className="font-semibold text-emerald-800">Frontend</h4>
            <ul className="text-sm mt-1">
              <li>• React/Next.js</li>
              <li>• TypeScript</li>
              <li>• Tailwind CSS</li>
            </ul>
          </div>
          <div className="bg-blue-50 p-3 rounded">
            <h4 className="font-semibold text-blue-800">Backend</h4>
            <ul className="text-sm mt-1">
              <li>• Node.js</li>
              <li>• Python</li>
              <li>• PostgreSQL</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
];

export const Default: Story = {
  args: {
    items: genericItems,
    title: 'People Also Ask',
    defaultOpenIndex: 0,
  },
};

export const WithSubtitle: Story = {
  args: {
    items: genericItems,
    title: 'Frequently Asked Questions',
    subtitle: 'Find answers to common questions about our services',
    defaultOpenIndex: 0,
  },
};

export const CompactVariant: Story = {
  args: {
    items: genericItems,
    title: 'Quick Questions',
    variant: 'compact',
    defaultOpenIndex: 0,
  },
};

export const AllClosed: Story = {
  args: {
    items: genericItems,
    title: 'FAQ',
    defaultOpenIndex: null,
  },
};

export const DubaiWebDevelopment: Story = {
  args: {
    items: dubaiWebDevPAAItems,
    title: 'People Also Ask',
    subtitle: 'Common questions about web development in Dubai',
    defaultOpenIndex: 0,
  },
};

export const ManyQuestions: Story = {
  args: {
    items: [
      ...genericItems,
      {
        question: "Do you provide ongoing support?",
        answer: "Yes, we offer comprehensive maintenance and support packages to ensure your website stays updated, secure, and performing optimally."
      },
      {
        question: "Can you help with SEO?",
        answer: "Absolutely! All our websites are built with SEO best practices in mind, and we offer additional SEO services to improve your search rankings."
      },
      {
        question: "What about mobile responsiveness?",
        answer: "Every website we build is fully responsive and optimized for all devices - desktop, tablet, and mobile."
      },
      {
        question: "How do payments work?",
        answer: (
          <div className="space-y-2">
            <p>We offer flexible payment options:</p>
            <ul className="list-disc pl-5">
              <li>10% deposit to start</li>
              <li>40% at design approval</li>
              <li>50% at project completion</li>
            </ul>
            <p className="text-sm italic mt-2">We accept bank transfers, credit cards, and cryptocurrency.</p>
          </div>
        )
      }
    ],
    title: 'Extended FAQ',
    subtitle: 'Everything you need to know',
    defaultOpenIndex: 0,
  },
};

export const NoTitleOrSubtitle: Story = {
  args: {
    items: genericItems.slice(0, 2),
    title: '',
    subtitle: '',
    defaultOpenIndex: 0,
  },
};