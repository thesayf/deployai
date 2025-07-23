import Head from "next/head";
import Link from "next/link";
import { AnimatedNavBar } from "@/components/navigation/AnimatedNavBar";
import { Footer } from "@/components/footer/Footer";
import { BlogLayout } from "@/components/blog-layout/BlogLayout";
import { motion } from "framer-motion";
import { FiArrowLeft, FiCalendar, FiClock, FiShare2, FiBookmark } from "react-icons/fi";

// Design System Colors
const colors = {
  // Foundation
  white: '#FFFFFF',
  black: '#000000',
  
  // Primary Brand
  electricOrange: '#FF6B35',
  crimsonRed: '#E63946',
  cyberBlue: '#457B9D',
  deepMagenta: '#D62598',
  
  // Neutrals
  concrete: '#F5F5F5',
  steel: '#E0E0E0',
  graphite: '#757575',
  charcoal: '#424242',
  obsidian: '#212121',
};

const ExampleBlogPost = () => {
  // Define sections for the Table of Contents
  const sections = [
    { id: 'introduction', title: 'Introduction to AI-Powered Development', level: 0 },
    { id: 'understanding-ai', title: 'Understanding AI in Software Development', level: 0 },
    { id: 'ml-basics', title: 'Machine Learning Basics', level: 1 },
    { id: 'neural-networks', title: 'Neural Networks Explained', level: 1 },
    { id: 'practical-applications', title: 'Practical Applications', level: 0 },
    { id: 'code-generation', title: 'AI Code Generation', level: 1 },
    { id: 'testing-automation', title: 'Automated Testing with AI', level: 1 },
    { id: 'debugging-assistance', title: 'AI-Powered Debugging', level: 1 },
    { id: 'implementation-guide', title: 'Implementation Guide', level: 0 },
    { id: 'choosing-tools', title: 'Choosing the Right Tools', level: 1 },
    { id: 'best-practices', title: 'Best Practices', level: 1 },
    { id: 'common-pitfalls', title: 'Common Pitfalls to Avoid', level: 1 },
    { id: 'future-trends', title: 'Future Trends', level: 0 },
    { id: 'conclusion', title: 'Conclusion', level: 0 },
  ];

  return (
    <>
      <Head>
        <title>How AI is Revolutionizing Software Development | deployAI</title>
        <meta
          name="description"
          content="Explore how artificial intelligence is transforming the software development landscape and learn practical ways to integrate AI into your development workflow."
        />
      </Head>

      <AnimatedNavBar />

      {/* Hero Section */}
      <section 
        className="px-4 py-12 sm:px-6 lg:px-8"
        style={{
          borderBottom: `3px solid ${colors.black}`,
          background: `linear-gradient(135deg, ${colors.concrete} 0%, ${colors.white} 100%)`,
        }}
      >
        <div className="mx-auto max-w-4xl">
          <Link 
            href="/blog" 
            className="mb-6 inline-flex items-center gap-2 transition-all"
            style={{ color: colors.graphite }}
            onMouseEnter={(e) => e.currentTarget.style.color = colors.electricOrange}
            onMouseLeave={(e) => e.currentTarget.style.color = colors.graphite}
          >
            <FiArrowLeft />
            <span>Back to Blog</span>
          </Link>

          <div className="mb-6">
            <span 
              className="px-3 py-1 text-xs font-bold uppercase"
              style={{
                background: colors.electricOrange,
                color: colors.white,
                border: `2px solid ${colors.black}`,
                boxShadow: `3px 3px 0px ${colors.black}`,
              }}
            >
              AI & Development
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl uppercase"
            style={{
              color: colors.black,
              textShadow: `4px 4px 0px ${colors.electricOrange}`,
            }}
          >
            How AI is Revolutionizing Software Development
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8 text-lg sm:text-xl"
            style={{ color: colors.charcoal }}
          >
            Discover the transformative power of artificial intelligence in modern software development 
            and learn how to leverage AI tools to build better applications faster.
          </motion.p>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=TechExpert"
                alt="Sarah Chen"
                className="h-12 w-12"
                style={{
                  border: `3px solid ${colors.black}`,
                  borderRadius: '0',
                }}
              />
              <div>
                <p className="font-bold">Sarah Chen</p>
                <p className="text-sm" style={{ color: colors.graphite }}>
                  Senior AI Engineer
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm" style={{ color: colors.graphite }}>
              <div className="flex items-center gap-1">
                <FiCalendar className="h-4 w-4" />
                <span>January 20, 2025</span>
              </div>
              <div className="flex items-center gap-1">
                <FiClock className="h-4 w-4" />
                <span>15 min read</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section style={{ borderBottom: `3px solid ${colors.black}` }}>
        <img
          src="https://picsum.photos/seed/ai-development/1200/600"
          alt="AI and Software Development"
          className="h-64 w-full object-cover sm:h-80 lg:h-96"
        />
      </section>

      {/* Article Content with BlogLayout */}
      <BlogLayout sections={sections} showProgress={true} accentColor="orange">
        <div className="prose-headings:uppercase">
          {/* Introduction */}
          <section id="introduction">
            <h2 className="text-3xl font-bold mb-4">Introduction to AI-Powered Development</h2>
            <p className="mb-4">
              The software development landscape is undergoing a revolutionary transformation, 
              driven by the rapid advancement of artificial intelligence technologies. From code 
              generation to automated testing, AI is reshaping how we build, deploy, and maintain 
              software applications.
            </p>
            <p className="mb-6">
              In this comprehensive guide, we'll explore the current state of AI in software 
              development, practical applications you can implement today, and what the future 
              holds for AI-augmented programming.
            </p>
          </section>

          {/* Understanding AI */}
          <section id="understanding-ai" className="mt-12">
            <h2 className="text-3xl font-bold mb-4">Understanding AI in Software Development</h2>
            <p className="mb-6">
              Artificial Intelligence in software development encompasses a wide range of technologies 
              and approaches designed to augment human capabilities and automate repetitive tasks. 
              Let's break down the key concepts you need to understand.
            </p>

            <h3 id="ml-basics" className="text-2xl font-bold mb-3 mt-8">Machine Learning Basics</h3>
            <p className="mb-4">
              Machine Learning (ML) forms the foundation of most AI-powered development tools. 
              At its core, ML involves training algorithms on vast amounts of code data to recognize 
              patterns and make predictions.
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Supervised learning for code completion</li>
              <li>Unsupervised learning for code clustering and analysis</li>
              <li>Reinforcement learning for optimization tasks</li>
              <li>Transfer learning for adapting models to specific domains</li>
            </ul>

            <h3 id="neural-networks" className="text-2xl font-bold mb-3 mt-8">Neural Networks Explained</h3>
            <p className="mb-4">
              Neural networks, particularly transformer architectures, have revolutionized AI's 
              ability to understand and generate code. These models can process code context and 
              generate remarkably accurate suggestions.
            </p>
            <div 
              className="p-6 mb-6"
              style={{
                background: colors.concrete,
                border: `2px solid ${colors.black}`,
                boxShadow: `4px 4px 0px ${colors.black}`,
              }}
            >
              <p className="font-bold mb-2">Key Neural Network Types:</p>
              <ul className="space-y-2">
                <li>• Transformer models (GPT, BERT) for code understanding</li>
                <li>• Recurrent Neural Networks for sequential code analysis</li>
                <li>• Graph Neural Networks for dependency analysis</li>
              </ul>
            </div>
          </section>

          {/* Practical Applications */}
          <section id="practical-applications" className="mt-12">
            <h2 className="text-3xl font-bold mb-4">Practical Applications</h2>
            <p className="mb-6">
              AI is already making a significant impact across various aspects of software development. 
              Here are the most practical applications you can start using today.
            </p>

            <h3 id="code-generation" className="text-2xl font-bold mb-3 mt-8">AI Code Generation</h3>
            <p className="mb-4">
              AI-powered code generation tools have evolved from simple autocomplete to sophisticated 
              systems that can write entire functions based on natural language descriptions.
            </p>
            
            {/* Code Example */}
            <div 
              className="mb-6 overflow-hidden"
              style={{
                border: `3px solid ${colors.black}`,
                boxShadow: `4px 4px 0px ${colors.black}`,
              }}
            >
              <div 
                className="px-4 py-2 font-mono text-sm"
                style={{
                  background: colors.obsidian,
                  color: colors.white,
                  borderBottom: `3px solid ${colors.black}`,
                }}
              >
                example.py
              </div>
              <pre 
                className="p-4 overflow-x-auto"
                style={{
                  background: colors.concrete,
                  margin: 0,
                }}
              >
                <code>{`# AI can generate this function from the comment:
# Create a function that calculates the fibonacci sequence

def fibonacci(n):
    """Generate Fibonacci sequence up to n terms."""
    if n <= 0:
        return []
    elif n == 1:
        return [0]
    elif n == 2:
        return [0, 1]
    
    fib_sequence = [0, 1]
    for i in range(2, n):
        fib_sequence.append(fib_sequence[-1] + fib_sequence[-2])
    
    return fib_sequence`}</code>
              </pre>
            </div>

            <h3 id="testing-automation" className="text-2xl font-bold mb-3 mt-8">Automated Testing with AI</h3>
            <p className="mb-4">
              AI can automatically generate test cases, identify edge cases, and even predict where 
              bugs are most likely to occur in your codebase.
            </p>
            <table 
              className="w-full mb-6"
              style={{
                border: `3px solid ${colors.black}`,
                boxShadow: `4px 4px 0px ${colors.black}`,
              }}
            >
              <thead style={{ background: colors.electricOrange, color: colors.white }}>
                <tr>
                  <th className="p-3 text-left font-bold" style={{ borderRight: `2px solid ${colors.black}` }}>
                    Testing Type
                  </th>
                  <th className="p-3 text-left font-bold">
                    AI Capability
                  </th>
                </tr>
              </thead>
              <tbody style={{ background: colors.white }}>
                <tr style={{ borderTop: `2px solid ${colors.black}` }}>
                  <td className="p-3" style={{ borderRight: `2px solid ${colors.black}` }}>Unit Tests</td>
                  <td className="p-3">Auto-generate based on function signatures</td>
                </tr>
                <tr style={{ borderTop: `2px solid ${colors.black}` }}>
                  <td className="p-3" style={{ borderRight: `2px solid ${colors.black}` }}>Integration Tests</td>
                  <td className="p-3">Identify critical paths and dependencies</td>
                </tr>
                <tr style={{ borderTop: `2px solid ${colors.black}` }}>
                  <td className="p-3" style={{ borderRight: `2px solid ${colors.black}` }}>Performance Tests</td>
                  <td className="p-3">Predict bottlenecks and suggest optimizations</td>
                </tr>
              </tbody>
            </table>

            <h3 id="debugging-assistance" className="text-2xl font-bold mb-3 mt-8">AI-Powered Debugging</h3>
            <p className="mb-4">
              Modern AI tools can analyze error messages, stack traces, and code context to provide 
              intelligent debugging suggestions and automatically fix common issues.
            </p>
            <blockquote 
              className="pl-6 py-4 mb-6"
              style={{
                borderLeft: `4px solid ${colors.electricOrange}`,
                background: colors.concrete,
              }}
            >
              <p className="italic">
                "AI debugging assistants have reduced our average bug resolution time by 40%, 
                allowing our team to focus on feature development rather than troubleshooting."
              </p>
              <cite className="block mt-2 text-sm" style={{ color: colors.graphite }}>
                — Alex Thompson, Lead Developer at TechCorp
              </cite>
            </blockquote>
          </section>

          {/* Implementation Guide */}
          <section id="implementation-guide" className="mt-12">
            <h2 className="text-3xl font-bold mb-4">Implementation Guide</h2>
            <p className="mb-6">
              Ready to integrate AI into your development workflow? Follow this step-by-step guide 
              to get started with AI-powered development tools.
            </p>

            <h3 id="choosing-tools" className="text-2xl font-bold mb-3 mt-8">Choosing the Right Tools</h3>
            <p className="mb-4">
              The AI development tool landscape is vast and growing. Here's how to choose the right 
              tools for your needs:
            </p>
            <ol className="list-decimal pl-6 mb-6 space-y-3">
              <li>
                <strong>Assess Your Needs:</strong> Identify pain points in your current workflow
              </li>
              <li>
                <strong>Evaluate Integration:</strong> Ensure tools work with your existing stack
              </li>
              <li>
                <strong>Consider Team Size:</strong> Some tools are better suited for enterprises
              </li>
              <li>
                <strong>Test Performance:</strong> Run pilot projects before full adoption
              </li>
            </ol>

            <h3 id="best-practices" className="text-2xl font-bold mb-3 mt-8">Best Practices</h3>
            <p className="mb-4">
              To maximize the benefits of AI in your development process, follow these proven 
              best practices:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {[
                { title: 'Code Review', desc: 'Always review AI-generated code before merging' },
                { title: 'Context Matters', desc: 'Provide clear context for better AI suggestions' },
                { title: 'Security First', desc: 'Validate AI output for security vulnerabilities' },
                { title: 'Continuous Learning', desc: 'Keep your AI tools updated with latest models' },
              ].map((practice, index) => (
                <div
                  key={index}
                  className="p-4"
                  style={{
                    background: colors.white,
                    border: `2px solid ${colors.black}`,
                    boxShadow: `3px 3px 0px ${colors.black}`,
                  }}
                >
                  <h4 className="font-bold mb-2">{practice.title}</h4>
                  <p className="text-sm" style={{ color: colors.charcoal }}>
                    {practice.desc}
                  </p>
                </div>
              ))}
            </div>

            <h3 id="common-pitfalls" className="text-2xl font-bold mb-3 mt-8">Common Pitfalls to Avoid</h3>
            <p className="mb-4">
              While AI can significantly enhance productivity, there are common mistakes to avoid:
            </p>
            <div 
              className="p-6 mb-6"
              style={{
                background: colors.crimsonRed,
                color: colors.white,
                border: `3px solid ${colors.black}`,
                boxShadow: `4px 4px 0px ${colors.black}`,
              }}
            >
              <p className="font-bold mb-3">⚠️ Warning: Common Pitfalls</p>
              <ul className="space-y-2">
                <li>• Over-reliance on AI without understanding the generated code</li>
                <li>• Ignoring security implications of AI-generated solutions</li>
                <li>• Failing to maintain consistent coding standards</li>
                <li>• Not validating AI output against requirements</li>
              </ul>
            </div>
          </section>

          {/* Future Trends */}
          <section id="future-trends" className="mt-12">
            <h2 className="text-3xl font-bold mb-4">Future Trends</h2>
            <p className="mb-6">
              The future of AI in software development is bright and full of possibilities. 
              Here are the trends that will shape the next decade of AI-powered development.
            </p>
            
            <div className="space-y-4 mb-6">
              {[
                {
                  trend: 'Autonomous Coding Agents',
                  description: 'AI systems that can independently implement entire features based on specifications',
                  timeline: '2-3 years',
                },
                {
                  trend: 'Real-time Pair Programming',
                  description: 'AI assistants that actively collaborate during coding sessions',
                  timeline: '1-2 years',
                },
                {
                  trend: 'Self-Healing Systems',
                  description: 'Applications that can automatically detect and fix bugs in production',
                  timeline: '3-5 years',
                },
                {
                  trend: 'Natural Language Programming',
                  description: 'Writing entire applications using conversational language',
                  timeline: '5-7 years',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-6"
                  style={{
                    background: `linear-gradient(135deg, ${colors.cyberBlue}10 0%, ${colors.white} 100%)`,
                    border: `3px solid ${colors.black}`,
                    boxShadow: `4px 4px 0px ${colors.black}`,
                  }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">{item.trend}</h3>
                    <span 
                      className="px-3 py-1 text-xs font-bold"
                      style={{
                        background: colors.cyberBlue,
                        color: colors.white,
                        border: `2px solid ${colors.black}`,
                      }}
                    >
                      {item.timeline}
                    </span>
                  </div>
                  <p style={{ color: colors.charcoal }}>{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Conclusion */}
          <section id="conclusion" className="mt-12">
            <h2 className="text-3xl font-bold mb-4">Conclusion</h2>
            <p className="mb-4">
              AI is not just a buzzword in software development—it's a transformative force that's 
              already changing how we write, test, and maintain code. By embracing AI tools and 
              following best practices, developers can significantly boost productivity while 
              maintaining code quality.
            </p>
            <p className="mb-6">
              The key to success lies in viewing AI as a powerful assistant rather than a replacement 
              for human creativity and problem-solving. As we move forward, the symbiosis between 
              human developers and AI will create unprecedented opportunities for innovation.
            </p>
            
            {/* Call to Action */}
            <div 
              className="p-8 text-center"
              style={{
                background: `linear-gradient(135deg, ${colors.electricOrange} 0%, ${colors.deepMagenta} 100%)`,
                color: colors.white,
                border: `3px solid ${colors.black}`,
                boxShadow: `6px 6px 0px ${colors.black}`,
              }}
            >
              <h3 className="text-2xl font-bold mb-4 uppercase">
                Ready to Transform Your Development Process?
              </h3>
              <p className="mb-6">
                Get started with AI-powered development tools and join the future of software engineering.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  className="px-8 py-3 font-bold uppercase transition-all"
                  style={{
                    background: colors.white,
                    color: colors.black,
                    border: `3px solid ${colors.black}`,
                    boxShadow: `4px 4px 0px ${colors.black}`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `2px 2px 0px ${colors.black}`;
                    e.currentTarget.style.transform = 'translate(2px, 2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = `4px 4px 0px ${colors.black}`;
                    e.currentTarget.style.transform = 'translate(0, 0)';
                  }}
                >
                  Schedule Consultation
                </button>
                <button 
                  className="px-8 py-3 font-bold uppercase transition-all"
                  style={{
                    background: 'transparent',
                    color: colors.white,
                    border: `3px solid ${colors.white}`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = colors.white;
                    e.currentTarget.style.color = colors.black;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = colors.white;
                  }}
                >
                  Download Guide
                </button>
              </div>
            </div>
          </section>
        </div>
      </BlogLayout>

      {/* Related Articles */}
      <section 
        className="px-4 py-16 sm:px-6 lg:px-8"
        style={{
          background: colors.concrete,
          borderTop: `3px solid ${colors.black}`,
        }}
      >
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-3xl font-bold uppercase">Related Articles</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'Building Your First AI-Powered Application',
                excerpt: 'A step-by-step guide to integrating AI into your next project.',
                category: 'Tutorial',
                image: 'https://picsum.photos/seed/ai-app/400/300',
                readTime: '8 min read',
              },
              {
                title: 'The Ethics of AI in Software Development',
                excerpt: 'Exploring the moral implications and responsibilities of AI-assisted coding.',
                category: 'Opinion',
                image: 'https://picsum.photos/seed/ai-ethics/400/300',
                readTime: '12 min read',
              },
              {
                title: 'Top 10 AI Development Tools for 2025',
                excerpt: 'Our comprehensive review of the best AI tools for modern developers.',
                category: 'Review',
                image: 'https://picsum.photos/seed/ai-tools/400/300',
                readTime: '10 min read',
              },
            ].map((article, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer overflow-hidden"
                style={{
                  background: colors.white,
                  border: `3px solid ${colors.black}`,
                  boxShadow: `4px 4px 0px ${colors.black}`,
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `6px 6px 0px ${colors.black}`;
                  e.currentTarget.style.transform = 'translate(-2px, -2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = `4px 4px 0px ${colors.black}`;
                  e.currentTarget.style.transform = 'translate(0, 0)';
                }}
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-48 w-full object-cover"
                  style={{ borderBottom: `3px solid ${colors.black}` }}
                />
                <div className="p-6">
                  <span 
                    className="text-xs font-bold uppercase"
                    style={{ color: colors.electricOrange }}
                  >
                    {article.category}
                  </span>
                  <h3 className="mt-2 mb-2 text-xl font-bold group-hover:text-orange-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="mb-4 text-sm" style={{ color: colors.charcoal }}>
                    {article.excerpt}
                  </p>
                  <p className="text-xs" style={{ color: colors.graphite }}>
                    {article.readTime}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ExampleBlogPost;