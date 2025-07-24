import React from 'react';
import { SectionWrapper } from '../section-wrapper/SectionWrapper';
import { MVPPricingBrutal } from '../mvp-pricing-brutal/MVPPricingBrutal';
import { StatsMetrics } from '../stats-metrics/StatsMetrics';
import { StatsMetricsDynamic } from '../stats-metrics/StatsMetricsDynamic';
import { FeatureShowcase } from '../feature-showcase/FeatureShowcase';
import { TimelineProcess } from '../timeline-process/TimelineProcess';
import { RelatedArticles } from '../related-articles/RelatedArticles';
import { CTABanner } from '../cta-banner/CTABanner';
import { PeopleAlsoAsk } from '../people-also-ask/PeopleAlsoAsk';
import { AuthorBio } from '../author-bio/AuthorBio';
import { CompanyDirectory } from '../company-directory/CompanyDirectory';
import { PricingComparison } from '../pricing-comparison/PricingComparison';

export const SectionDemo: React.FC = () => {
  // Sample data for components
  const statsData = [
    {
      id: '1',
      value: 10000,
      label: 'Happy Clients',
      icon: 'users' as const,
      color: 'orange' as const,
      animate: true,
    },
    {
      id: '2',
      value: 500,
      label: 'Projects',
      icon: 'rocket' as const,
      prefix: '+',
      color: 'blue' as const,
      animate: true,
    },
    {
      id: '3',
      value: 99.9,
      label: 'Uptime',
      icon: 'star' as const,
      suffix: '%',
      color: 'emerald' as const,
      animate: true,
    },
  ];

  const featuresData = [
    {
      id: '1',
      title: 'AI-Powered Analytics',
      description: 'Advanced machine learning algorithms analyze your data in real-time.',
      icon: 'trending' as const,
      highlight: true,
    },
    {
      id: '2',
      title: 'Secure Cloud Storage',
      description: 'Enterprise-grade security with automated backups and encryption.',
      icon: 'shield' as const,
    },
    {
      id: '3',
      title: '24/7 Support',
      description: 'Round-the-clock assistance from our expert team.',
      icon: 'users' as const,
    },
    {
      id: '4',
      title: 'Custom Integrations',
      description: 'Seamlessly connect with your existing tools and workflows.',
      icon: 'zap' as const,
    },
  ];

  const timelineData = [
    {
      id: '1',
      week: 1,
      title: 'Discovery & Planning',
      description: 'We analyze your requirements and create a detailed roadmap',
      icon: 'target' as const,
      color: 'orange' as const,
      tasks: [
        {
          id: 'task-1-1',
          title: 'Requirements Analysis',
          description: 'Deep dive into your business needs and goals',
          status: 'completed' as const,
        },
        {
          id: 'task-1-2',
          title: 'Technical Planning',
          description: 'Architecture design and technology selection',
          status: 'completed' as const,
        },
      ],
    },
    {
      id: '2',
      week: 2,
      title: 'Design & Prototype',
      description: 'Creating wireframes and interactive prototypes for your approval',
      icon: 'rocket' as const,
      color: 'blue' as const,
      tasks: [
        {
          id: 'task-2-1',
          title: 'UI/UX Design',
          description: 'Creating beautiful and functional interfaces',
          status: 'in-progress' as const,
        },
        {
          id: 'task-2-2',
          title: 'Interactive Prototypes',
          description: 'Clickable mockups for user testing',
          status: 'pending' as const,
        },
      ],
    },
    {
      id: '3',
      week: 3,
      title: 'Development',
      description: 'Building your application with cutting-edge technologies',
      icon: 'code' as const,
      color: 'magenta' as const,
      tasks: [
        {
          id: 'task-3-1',
          title: 'Frontend Development',
          description: 'Building responsive user interfaces',
          status: 'pending' as const,
        },
        {
          id: 'task-3-2',
          title: 'Backend Development',
          description: 'Creating robust APIs and databases',
          status: 'pending' as const,
        },
      ],
    },
    {
      id: '4',
      week: 4,
      title: 'Launch & Support',
      description: 'Deploying your application and providing ongoing support',
      icon: 'users' as const,
      color: 'red' as const,
      tasks: [
        {
          id: 'task-4-1',
          title: 'Deployment',
          description: 'Setting up production environment',
          status: 'pending' as const,
        },
        {
          id: 'task-4-2',
          title: 'Training & Support',
          description: 'Team onboarding and documentation',
          status: 'pending' as const,
        },
      ],
    },
  ];

  const relatedArticles = [
    {
      id: '1',
      title: 'How to Build a SaaS MVP in 30 Days',
      excerpt: 'Learn the step-by-step process to launch your SaaS product quickly and efficiently.',
      category: 'Development',
      readTime: '5 min read',
      date: '2024-01-15',
      image: 'https://picsum.photos/seed/1/300/200',
      href: '/blog/saas-mvp-guide',
    },
    {
      id: '2',
      title: 'The Cost of Custom Software Development',
      excerpt: 'Understanding pricing models and factors that affect development costs.',
      category: 'Business',
      readTime: '8 min read',
      date: '2024-01-10',
      image: 'https://picsum.photos/seed/2/300/200',
      href: '/blog/development-costs',
    },
    {
      id: '3',
      title: 'AI Integration Best Practices',
      excerpt: 'Essential guidelines for successfully integrating AI into your applications.',
      category: 'AI/ML',
      readTime: '10 min read',
      date: '2024-01-05',
      image: 'https://picsum.photos/seed/3/300/200',
      href: '/blog/ai-integration',
    },
  ];

  // Blog component data
  const paaQuestions = [
    {
      id: '1',
      question: 'What is the typical cost of custom software development?',
      answer: 'Custom software development costs typically range from $10,000 to $500,000+ depending on complexity, features, and timeline. Small MVPs start around $10,000-$50,000, while enterprise solutions can exceed $500,000.',
    },
    {
      id: '2',
      question: 'How long does it take to build a custom application?',
      answer: 'Development timelines vary based on project scope. Simple MVPs can be built in 4-8 weeks, medium complexity projects take 3-6 months, and large enterprise applications may require 6-12+ months.',
    },
    {
      id: '3',
      question: 'What technologies do you use for development?',
      answer: 'We use modern tech stacks including React/Next.js for frontend, Node.js/Python for backend, PostgreSQL/MongoDB for databases, and AWS/Vercel for hosting. We select technologies based on your specific requirements.',
    },
  ];

  const authorData = {
    name: 'Sarah Chen',
    role: 'Senior Software Architect',
    bio: 'With over 10 years of experience in building scalable applications, Sarah specializes in AI integration and cloud architecture. She has led development teams at Fortune 500 companies and now helps startups build robust MVPs.',
    avatar: 'https://i.pravatar.cc/150?img=32',
    socialLinks: [
      { platform: 'twitter' as const, url: 'https://twitter.com' },
      { platform: 'linkedin' as const, url: 'https://linkedin.com' },
      { platform: 'github' as const, url: 'https://github.com' },
    ],
  };

  const companies = [
    {
      id: '1',
      name: 'TechCorp Solutions',
      type: 'agency' as const,
      rating: 4.8,
      reviewCount: 234,
      priceRange: 4 as const,
      location: 'San Francisco, CA',
      specialties: ['Enterprise Software', 'Cloud Architecture', 'DevOps'],
      description: 'Enterprise software development and consulting',
      budgetRange: '50k-plus' as const,
      timeline: '6-plus-months' as const,
      featured: true,
    },
    {
      id: '2',
      name: 'StartupForge',
      type: 'agency' as const,
      rating: 4.9,
      reviewCount: 156,
      priceRange: 2 as const,
      location: 'Austin, TX',
      specialties: ['MVP Development', 'React', 'Node.js'],
      description: 'MVP development for early-stage startups',
      budgetRange: '5k-15k' as const,
      timeline: '1-3-months' as const,
    },
    {
      id: '3',
      name: 'AI Innovations Lab',
      type: 'ai-first' as const,
      rating: 4.7,
      reviewCount: 89,
      priceRange: 4 as const,
      location: 'Boston, MA',
      specialties: ['Machine Learning', 'Computer Vision', 'NLP'],
      description: 'Cutting-edge AI and ML solutions',
      budgetRange: '50k-plus' as const,
      timeline: '3-6-months' as const,
    },
    {
      id: '4',
      name: 'CloudScale Systems',
      type: 'agency' as const,
      rating: 4.6,
      reviewCount: 178,
      priceRange: 3 as const,
      location: 'Seattle, WA',
      specialties: ['AWS', 'Kubernetes', 'Microservices'],
      description: 'Cloud infrastructure and DevOps',
      budgetRange: '15k-50k' as const,
      timeline: '3-6-months' as const,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - White background */}
      <SectionWrapper variant="default">
        <div className="text-center">
          <h1 className="text-5xl sm:text-6xl font-black mb-6" style={{ textShadow: '3px 3px 0px #FF6B35' }}>
            Section Background Examples
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Demonstrating how our neubrutalist components look on different background colors. 
            Test on mobile to see responsive padding adjustments.
          </p>
        </div>
      </SectionWrapper>

      {/* Stats Section - Warm Peach Background */}
      <SectionWrapper variant="warmPeach" id="stats">
        <StatsMetrics 
          stats={statsData}
          title="Warm Peach Background (#FFF5F0)"
          subtitle="Notice how the white cards with black borders pop against this soft background"
        />
      </SectionWrapper>

      {/* Features Section - Cool Mint Background */}
      <SectionWrapper variant="coolMint" spacing="large" id="features">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-black mb-4" style={{ textShadow: '3px 3px 0px #FF6B35' }}>
            Cool Mint Background (#F0FFF5)
          </h2>
          <p className="text-lg text-gray-600">
            A refreshing background that maintains readability while adding visual interest
          </p>
        </div>
        <FeatureShowcase 
          features={featuresData}
          variant="cards"
          columns={2}
        />
      </SectionWrapper>

      {/* Timeline Section - Sky Blue Background */}
      <SectionWrapper variant="skyBlue" id="timeline">
        <TimelineProcess 
          title="Sky Blue Background (#F0F5FF)"
          subtitle="Professional and calming, perfect for process sections"
          steps={timelineData}
          variant="default"
        />
      </SectionWrapper>

      {/* Pricing Section - Gradient Background */}
      <SectionWrapper variant="gradient" spacing="large" id="pricing">
        <MVPPricingBrutal 
          title="Gradient Background"
          subtitle="From orange-50 to red-50 - adds energy without overwhelming"
          accentColor="blue"
        />
      </SectionWrapper>

      {/* Related Articles - Concrete Background */}
      <SectionWrapper variant="concrete" id="articles">
        <RelatedArticles 
          title="Concrete Background (#F5F5F5)"
          articles={relatedArticles}
          variant="grid"
        />
      </SectionWrapper>

      {/* CTA Section - Dark Background */}
      <SectionWrapper variant="dark" spacing="large" id="cta">
        <CTABanner 
          title="Dark Background (#212121)"
          subtitle="High contrast for maximum impact on call-to-action sections"
          buttonText="Get Started"
          variant="default"
          accentColor="orange"
        />
      </SectionWrapper>

      {/* Custom Background Examples */}
      <SectionWrapper 
        variant="custom" 
        customBg="linear-gradient(135deg, #FF6B35 0%, #E63946 100%)"
        spacing="large"
        id="custom-gradient"
      >
        <div className="text-center text-white">
          <h2 className="text-4xl font-black mb-4" style={{ textShadow: '3px 3px 0px rgba(0,0,0,0.3)' }}>
            Custom Gradient Background
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Using our brand colors for high-energy sections
          </p>
          <div className="inline-block bg-white text-black px-8 py-4 font-bold" 
               style={{ border: '3px solid #000', boxShadow: '6px 6px 0px rgba(0,0,0,0.3)' }}>
            BOLD STATEMENT
          </div>
        </div>
      </SectionWrapper>

      {/* Lavender Background with Stats */}
      <SectionWrapper variant="lavender" id="minimal-stats">
        <StatsMetrics 
          stats={statsData}
          title="Lavender Background (#F5F0FF)"
          subtitle="Adds a creative touch while maintaining professionalism"
          variant="minimal"
          columns={3}
        />
      </SectionWrapper>

      {/* BLOG COMPONENTS SECTION */}
      <SectionWrapper variant="default" spacing="large">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4" style={{ textShadow: '3px 3px 0px #D62598' }}>
            Blog Components Showcase
          </h2>
          <p className="text-lg text-gray-600">
            How our blog-specific components look on different backgrounds
          </p>
        </div>
      </SectionWrapper>

      {/* People Also Ask - Warm Peach */}
      <SectionWrapper variant="warmPeach" spacing="large" id="paa-demo">
        <PeopleAlsoAsk 
          items={paaQuestions}
          title="People Also Ask Section"
          subtitle="FAQ-style expandable cards work great on soft backgrounds"
        />
      </SectionWrapper>

      {/* Author Bio - Sky Blue */}
      <SectionWrapper variant="skyBlue" id="author-demo">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-center">Author Bio on Sky Blue</h3>
          <AuthorBio 
            {...authorData}
            variant="detailed"
          />
        </div>
      </SectionWrapper>

      {/* Company Directory - White */}
      <SectionWrapper variant="default" spacing="large" id="directory-demo">
        <CompanyDirectory 
          companies={companies}
          title="Company Directory on White"
          subtitle="Clean background lets the cards and filters shine"
        />
      </SectionWrapper>

      {/* Pricing Comparison - Cool Mint */}
      <SectionWrapper variant="coolMint" spacing="large" id="pricing-comparison">
        <PricingComparison 
          title="Pricing Comparison Table"
          subtitle="Comparison tables benefit from subtle background colors"
        />
      </SectionWrapper>

      {/* DYNAMIC STATS VARIATIONS */}
      <SectionWrapper variant="default" spacing="large">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4" style={{ textShadow: '3px 3px 0px #457B9D' }}>
            Dynamic Stats Variations
          </h2>
          <p className="text-lg text-gray-600">
            Experimental layouts for more visual interest
          </p>
        </div>
      </SectionWrapper>

      {/* Stats - Chaos Layout on Lavender */}
      <SectionWrapper variant="lavender" spacing="large" id="chaos-stats">
        <StatsMetricsDynamic 
          stats={statsData}
          variant="chaos"
          title="Chaos Layout Stats"
          subtitle="Mouse-reactive positioning creates engagement"
        />
      </SectionWrapper>

      {/* Stats - Wave Layout on Gradient */}
      <SectionWrapper variant="gradient" id="wave-stats">
        <StatsMetricsDynamic 
          stats={statsData}
          variant="wave"
          title="Wave Layout on Gradient"
          subtitle="Flowing animation adds movement"
        />
      </SectionWrapper>

      {/* Stats - Circular Layout on Dark */}
      <SectionWrapper variant="dark" spacing="large" id="circular-stats">
        <StatsMetricsDynamic 
          stats={[
            { id: '1', value: 360, label: 'Degrees', suffix: '°', color: 'orange' as const, animate: true },
            { id: '2', value: 24, label: 'Hours', suffix: '/7', color: 'blue' as const, animate: true },
            { id: '3', value: 100, label: 'Coverage', suffix: '%', color: 'emerald' as const, animate: true },
            { id: '4', value: 5, label: 'Stars', suffix: '★', color: 'amber' as const, animate: true },
          ]}
          variant="circular"
          title="Always On"
        />
      </SectionWrapper>

      {/* FEATURE SHOWCASE VARIATIONS */}
      <SectionWrapper variant="warmPeach" spacing="large" id="feature-variations">
        <div className="mb-12">
          <h2 className="text-3xl font-black mb-4">Feature Showcase Variations</h2>
          <p className="text-lg text-gray-600 mb-8">Different layouts on warm peach background</p>
        </div>
        
        {/* Bento Grid */}
        <div className="mb-16">
          <h3 className="text-xl font-bold mb-6">Bento Grid Layout</h3>
          <FeatureShowcase 
            features={featuresData}
            variant="bento"
          />
        </div>

        {/* Minimal */}
        <div>
          <h3 className="text-xl font-bold mb-6">Minimal Layout</h3>
          <FeatureShowcase 
            features={featuresData}
            variant="minimal"
            columns={2}
          />
        </div>
      </SectionWrapper>

      {/* Mixed Component Patterns */}
      <SectionWrapper variant="concrete" spacing="large">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black mb-4">Landing Page Pattern Examples</h2>
        </div>

        {/* Blog Article Pattern */}
        <div className="mb-16">
          <h3 className="text-xl font-bold mb-4">Blog Article Pattern</h3>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
            <div className="h-20 bg-white border-2 border-black flex items-center justify-center text-xs font-bold">Hero</div>
            <div className="h-20 bg-[#F5F5F5] border-2 border-black flex items-center justify-center text-xs font-bold">TOC</div>
            <div className="h-20 bg-[#FFF5F0] border-2 border-black flex items-center justify-center text-xs font-bold">PAA</div>
            <div className="h-20 bg-white border-2 border-black flex items-center justify-center text-xs font-bold">Content</div>
            <div className="h-20 bg-[#F0F5FF] border-2 border-black flex items-center justify-center text-xs font-bold">Author</div>
            <div className="h-20 bg-[#F5F5F5] border-2 border-black flex items-center justify-center text-xs font-bold">Related</div>
          </div>
        </div>

        {/* Service Page Pattern */}
        <div className="mb-16">
          <h3 className="text-xl font-bold mb-4">Service Page Pattern</h3>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
            <div className="h-20 bg-gradient-to-br from-orange-50 to-red-50 border-2 border-black flex items-center justify-center text-xs font-bold">Hero</div>
            <div className="h-20 bg-[#FFF5F0] border-2 border-black flex items-center justify-center text-xs font-bold">Stats</div>
            <div className="h-20 bg-white border-2 border-black flex items-center justify-center text-xs font-bold">Services</div>
            <div className="h-20 bg-[#F0F5FF] border-2 border-black flex items-center justify-center text-xs font-bold">Process</div>
            <div className="h-20 bg-white border-2 border-black flex items-center justify-center text-xs font-bold">Pricing</div>
            <div className="h-20 bg-[#212121] text-white border-2 border-black flex items-center justify-center text-xs font-bold">CTA</div>
          </div>
        </div>

        {/* Directory Page Pattern */}
        <div>
          <h3 className="text-xl font-bold mb-4">Directory Page Pattern</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            <div className="h-20 bg-white border-2 border-black flex items-center justify-center text-xs font-bold">Search Hero</div>
            <div className="h-20 bg-[#F5F5F5] border-2 border-black flex items-center justify-center text-xs font-bold">Stats</div>
            <div className="h-20 bg-white border-2 border-black flex items-center justify-center text-xs font-bold">Directory</div>
            <div className="h-20 bg-[#F0FFF5] border-2 border-black flex items-center justify-center text-xs font-bold">Benefits</div>
            <div className="h-20 bg-[#FF6B35] text-white border-2 border-black flex items-center justify-center text-xs font-bold">Join CTA</div>
          </div>
        </div>
      </SectionWrapper>

      {/* Spacing Demo */}
      <SectionWrapper variant="warmPeach" spacing="small">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">Small Spacing (py-8)</h3>
          <p className="text-gray-600">Compact sections for dense content</p>
        </div>
      </SectionWrapper>

      <SectionWrapper variant="coolMint" spacing="medium">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">Medium Spacing (py-16)</h3>
          <p className="text-gray-600">Default spacing for most sections</p>
        </div>
      </SectionWrapper>

      <SectionWrapper variant="skyBlue" spacing="large">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">Large Spacing (py-24)</h3>
          <p className="text-gray-600">Generous spacing for hero sections</p>
        </div>
      </SectionWrapper>

      {/* Mobile Testing Note */}
      <SectionWrapper variant="default">
        <div className="text-center py-8">
          <h3 className="text-2xl font-bold mb-4">Mobile Responsive Testing</h3>
          <p className="text-gray-600 mb-6">
            All sections maintain proper spacing and readability on mobile devices.
            The padding adjusts from px-4 on mobile to px-8 on desktop.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500 max-w-2xl mx-auto">
            <div className="p-4 border-2 border-black">
              <strong>Mobile</strong><br/>
              py-16 px-4
            </div>
            <div className="p-4 border-2 border-black">
              <strong>Tablet</strong><br/>
              py-16 px-6
            </div>
            <div className="p-4 border-2 border-black">
              <strong>Desktop</strong><br/>
              py-16 px-8
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Pattern Recommendations */}
      <SectionWrapper variant="concrete" spacing="large">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black mb-8 text-center">Background Pattern Recommendations</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Classic Pattern</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div className="h-20 bg-white border-2 border-black flex items-center justify-center font-bold">Hero</div>
                <div className="h-20 bg-[#FFF5F0] border-2 border-black flex items-center justify-center font-bold">Stats</div>
                <div className="h-20 bg-white border-2 border-black flex items-center justify-center font-bold">Features</div>
                <div className="h-20 bg-[#F0F5FF] border-2 border-black flex items-center justify-center font-bold">CTA</div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Bold Pattern</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div className="h-20 bg-gradient-to-br from-orange-50 to-red-50 border-2 border-black flex items-center justify-center font-bold">Hero</div>
                <div className="h-20 bg-[#212121] text-white border-2 border-black flex items-center justify-center font-bold">Stats</div>
                <div className="h-20 bg-white border-2 border-black flex items-center justify-center font-bold">Features</div>
                <div className="h-20 bg-[#FF6B35] text-white border-2 border-black flex items-center justify-center font-bold">CTA</div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Minimal Pattern</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div className="h-20 bg-white border-2 border-black flex items-center justify-center font-bold">Hero</div>
                <div className="h-20 bg-[#F5F5F5] border-2 border-black flex items-center justify-center font-bold">Stats</div>
                <div className="h-20 bg-white border-2 border-black flex items-center justify-center font-bold">Features</div>
                <div className="h-20 bg-[#F5F5F5] border-2 border-black flex items-center justify-center font-bold">CTA</div>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
};