#!/usr/bin/env node

// Mock template resolver for testing purposes
// This demonstrates what the template system should generate for Dubai page

const mockTemplateResolver = (slug) => {
  if (slug === 'custom-software-development-dubai') {
    return {
      templateName: 'location',
      pageType: 'location',
      sections: [
        {
          component: 'LocationHero',
          wrapper: 'GradientWrapper',
          props: {
            title: 'Custom Software Development in Dubai',
            subtitle: 'Transform your business with cutting-edge software solutions tailored for the Dubai market',
            location: 'Dubai',
            ctaText: 'Get Started'
          }
        },
        {
          component: 'TrustIndicators',
          props: {
            stats: [
              { value: '50+', label: 'Projects Delivered' },
              { value: '98%', label: 'Client Satisfaction' },
              { value: '24/7', label: 'Support' },
              { value: '5★', label: 'Average Rating' }
            ]
          }
        },
        {
          component: 'LocationServices',
          props: {
            title: 'Our Services in Dubai',
            services: [
              {
                title: 'Custom Web Development',
                description: 'Scalable web applications built with modern technologies',
                icon: 'Code'
              },
              {
                title: 'Mobile App Development',
                description: 'Native and cross-platform mobile solutions',
                icon: 'Smartphone'
              },
              {
                title: 'E-commerce Solutions',
                description: 'Complete online shopping platforms',
                icon: 'ShoppingCart'
              },
              {
                title: 'Enterprise Software',
                description: 'Large-scale business automation systems',
                icon: 'Building'
              }
            ]
          }
        },
        {
          component: 'LocationBenefits',
          props: {
            title: 'Why Choose DeployAI in Dubai?',
            benefits: [
              {
                title: 'Local Expertise',
                description: 'Deep understanding of Dubai business landscape'
              },
              {
                title: 'Rapid Development',
                description: 'Fast turnaround times without compromising quality'
              },
              {
                title: 'Scalable Solutions',
                description: 'Built to grow with your business'
              },
              {
                title: '24/7 Support',
                description: 'Round-the-clock assistance for your peace of mind'
              }
            ]
          }
        },
        {
          component: 'Testimonials',
          props: {
            title: 'What Our Dubai Clients Say'
          }
        },
        {
          component: 'CTA',
          props: {
            title: 'Ready to Transform Your Business?',
            subtitle: 'Let\'s discuss how we can help you achieve your goals',
            ctaText: 'Schedule a Consultation'
          }
        },
        {
          component: 'LocationProcess',
          props: {
            title: 'Our Development Process',
            steps: [
              {
                number: '01',
                title: 'Discovery',
                description: 'Understanding your business needs and goals'
              },
              {
                number: '02',
                title: 'Planning',
                description: 'Creating a detailed roadmap for success'
              },
              {
                number: '03',
                title: 'Development',
                description: 'Building your solution with cutting-edge tech'
              },
              {
                number: '04',
                title: 'Deployment',
                description: 'Launching and supporting your new system'
              }
            ]
          }
        },
        {
          component: 'FAQ',
          props: {
            location: 'Dubai'
          }
        },
        {
          component: 'Footer',
          props: {}
        }
      ]
    };
  }
  
  return null;
};

// Test the mock template resolver
console.log('Testing template resolver for: custom-software-development-dubai\n');

const resolvedTemplate = mockTemplateResolver('custom-software-development-dubai');

if (!resolvedTemplate) {
  console.error('Template not found!');
  process.exit(1);
}

console.log('Template Name:', resolvedTemplate.templateName);
console.log('Page Type:', resolvedTemplate.pageType);
console.log('\nSections Configuration:');
console.log('========================\n');

// Display each section with its configuration
resolvedTemplate.sections.forEach((section, index) => {
  console.log(`Section ${index + 1}: ${section.component}`);
  if (section.wrapper) {
    console.log('  Wrapper:', section.wrapper);
  }
  if (section.props) {
    console.log('  Props:', Object.keys(section.props).join(', '));
  }
  console.log('');
});

// Expected Dubai page structure for comparison
const expectedStructure = [
  { component: 'LocationHero', wrapper: 'GradientWrapper' },
  { component: 'TrustIndicators' },
  { component: 'LocationServices' },
  { component: 'LocationBenefits' },
  { component: 'Testimonials' },
  { component: 'CTA' },
  { component: 'LocationProcess' },
  { component: 'FAQ' },
  { component: 'Footer' }
];

console.log('\nComparison with Expected Structure:');
console.log('===================================\n');

// Compare with expected structure
const actualComponents = resolvedTemplate.sections.map(s => ({
  component: s.component,
  ...(s.wrapper && { wrapper: s.wrapper })
}));

// Check if they match
const componentsMatch = expectedStructure.length === actualComponents.length &&
  expectedStructure.every((expected, i) => {
    const actual = actualComponents[i];
    if (!actual) return false;
    
    const componentMatch = expected.component === actual.component;
    const wrapperMatch = expected.wrapper ? expected.wrapper === actual.wrapper : !actual.wrapper;
    
    return componentMatch && wrapperMatch;
  });

console.log('Expected sections:', expectedStructure.length);
console.log('Actual sections:', actualComponents.length);
console.log('\nResult:', componentsMatch ? '✅ MATCH - Template generates correct structure!' : '❌ MISMATCH');

if (!componentsMatch) {
  console.log('\nDifferences:');
  expectedStructure.forEach((expected, i) => {
    const actual = actualComponents[i];
    if (!actual) {
      console.log(`- Missing section ${i + 1}: ${expected.component}`);
    } else if (expected.component !== actual.component) {
      console.log(`- Section ${i + 1}: Expected ${expected.component}, got ${actual.component}`);
    } else if (expected.wrapper !== actual.wrapper) {
      console.log(`- Section ${i + 1} (${expected.component}): Expected wrapper ${expected.wrapper || 'none'}, got ${actual.wrapper || 'none'}`);
    }
  });
}

// Display sample props for key sections
console.log('\n\nKey Section Details:');
console.log('====================\n');

const keySections = ['LocationHero', 'LocationServices', 'LocationBenefits'];
resolvedTemplate.sections
  .filter(s => keySections.includes(s.component))
  .forEach(section => {
    console.log(`${section.component}:`);
    if (section.props) {
      const { title, subtitle, services, benefits, location } = section.props;
      if (title) console.log(`  Title: "${title}"`);
      if (subtitle) console.log(`  Subtitle: "${subtitle}"`);
      if (location) console.log(`  Location: ${location}`);
      if (services) console.log(`  Services: ${services.length} items`);
      if (benefits) console.log(`  Benefits: ${benefits.length} items`);
    }
    console.log('');
  });

console.log('\nThis mock demonstrates what the template resolver should generate');
console.log('for location-based pages like Dubai.');