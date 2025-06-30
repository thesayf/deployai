import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Footer } from "@/components/footer/Footer";
import { AnimatedNavBar } from "@/components/navigation/AnimatedNavBar";
import { motion } from "framer-motion";
import { FiArrowLeft, FiCalendar, FiClock, FiShare2, FiDownload } from "react-icons/fi";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { getPostBySlug, getAllPosts, PostMeta } from "@/lib/mdx";

interface BlogPostProps {
  post: {
    meta: PostMeta;
    source: MDXRemoteSerializeResult;
    relatedPosts: PostMeta[];
  };
}

const components = {
  h2: (props: any) => <h2 className="mb-4 mt-8 text-2xl font-bold" {...props} />,
  h3: (props: any) => <h3 className="mb-3 mt-6 text-xl font-semibold" {...props} />,
  p: (props: any) => <p className="mb-4 leading-relaxed text-zinc-700" {...props} />,
  ul: (props: any) => <ul className="mb-4 ml-6 list-disc space-y-2 text-zinc-700" {...props} />,
  ol: (props: any) => <ol className="mb-4 ml-6 list-decimal space-y-2 text-zinc-700" {...props} />,
  li: (props: any) => <li className="leading-relaxed" {...props} />,
  table: (props: any) => (
    <div className="my-8 overflow-x-auto rounded-lg border-2 border-zinc-900 shadow-[4px_4px_0px_#18181b]">
      <table className="w-full" {...props} />
    </div>
  ),
  thead: (props: any) => <thead className="border-b-2 border-zinc-900 bg-orange-50" {...props} />,
  th: (props: any) => <th className="border-r border-zinc-300 px-4 py-3 text-left font-bold text-zinc-900 last:border-r-0" {...props} />,
  td: (props: any) => <td className="border-r border-t border-zinc-300 px-4 py-3 text-zinc-700 last:border-r-0" {...props} />,
  tbody: (props: any) => <tbody className="bg-white" {...props} />,
  strong: (props: any) => <strong className="font-bold text-zinc-900" {...props} />,
  em: (props: any) => <em className="italic" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="my-6 border-l-4 border-orange-400 pl-6 italic text-zinc-600" {...props} />
  ),
  code: (props: any) => {
    // Inline code
    if (!props.className) {
      return <code className="rounded bg-zinc-100 px-1 py-0.5 text-sm font-mono text-zinc-800" {...props} />;
    }
    // Code blocks
    return <code className="block overflow-x-auto rounded-lg bg-zinc-900 p-4 text-sm text-zinc-100" {...props} />;
  },
  pre: (props: any) => <pre className="my-6 overflow-x-auto rounded-lg border-2 border-zinc-900 bg-zinc-900 shadow-[4px_4px_0px_#18181b]" {...props} />,
  hr: () => <hr className="my-8 border-t-2 border-zinc-300" />,
  a: (props: any) => <a className="text-orange-600 underline hover:text-orange-700" {...props} />,
};

const TableOfContents = ({ headings }: { headings: string[] }) => {
  const toc = headings.map(heading => ({
    text: heading.replace(/^##\s+/, ''),
    id: heading.replace(/^##\s+/, '').toLowerCase().replace(/\s+/g, '-')
  }));

  return (
    <nav className="mb-8 rounded-lg border-2 border-zinc-900 bg-orange-50 p-6 shadow-[4px_4px_0px_#18181b]">
      <h3 className="mb-4 text-lg font-bold">Table of Contents</h3>
      <ul className="space-y-2">
        {toc.map((item, index) => (
          <li key={index}>
            <a
              href={`#${item.id}`}
              className="text-zinc-700 hover:text-orange-600 transition-colors"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const CostCalculator = () => {
  return (
    <div className="my-12 rounded-lg border-2 border-zinc-900 bg-gradient-to-br from-orange-50 to-white p-8 shadow-[4px_4px_0px_#18181b]">
      <h3 className="mb-4 text-2xl font-bold">Calculate Your Property Management Costs</h3>
      <p className="mb-6 text-zinc-600">
        Get an instant estimate of your potential savings with custom AI automation.
      </p>
      
      <form className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-semibold">Number of Properties</label>
          <input
            type="number"
            placeholder="e.g., 100"
            className="w-full rounded-md border-2 border-zinc-900 px-4 py-3 shadow-[4px_4px_0px_#18181b] outline-none transition-all focus:shadow-[2px_2px_0px_#18181b]"
          />
        </div>
        
        <div>
          <label className="mb-2 block text-sm font-semibold">Current Monthly Software Cost (AED)</label>
          <input
            type="number"
            placeholder="e.g., 15000"
            className="w-full rounded-md border-2 border-zinc-900 px-4 py-3 shadow-[4px_4px_0px_#18181b] outline-none transition-all focus:shadow-[2px_2px_0px_#18181b]"
          />
        </div>
        
        <div>
          <label className="mb-2 block text-sm font-semibold">Team Size</label>
          <input
            type="number"
            placeholder="e.g., 10"
            className="w-full rounded-md border-2 border-zinc-900 px-4 py-3 shadow-[4px_4px_0px_#18181b] outline-none transition-all focus:shadow-[2px_2px_0px_#18181b]"
          />
        </div>
        
        <button
          type="submit"
          className="w-full rounded-md border-2 border-zinc-900 bg-orange-400 px-6 py-3 font-semibold text-zinc-900 shadow-[4px_4px_0px_#18181b] transition-all hover:bg-orange-500 hover:shadow-[2px_2px_0px_#18181b]"
        >
          Calculate Savings
        </button>
      </form>
    </div>
  );
};

export default function BlogPost({ post }: BlogPostProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{post.meta.title} - DeployAI Blog</title>
        <meta name="description" content={post.meta.excerpt} />
        <meta property="og:title" content={post.meta.title} />
        <meta property="og:description" content={post.meta.excerpt} />
        <meta property="og:image" content={post.meta.image} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AnimatedNavBar />

      <main className="relative min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b-2 border-zinc-900 px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <Link href="/blog" className="mb-6 inline-flex items-center gap-2 text-zinc-600 hover:text-orange-600 transition-colors">
              <FiArrowLeft />
              <span>Back to Blog</span>
            </Link>

            <div className="mb-6">
              <span className="rounded border border-zinc-900 bg-orange-400 px-3 py-1 text-xs font-semibold uppercase">
                {post.meta.category}
              </span>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl"
            >
              {post.meta.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-8 text-lg text-zinc-600 sm:text-xl"
            >
              {post.meta.excerpt}
            </motion.p>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.meta.author}`}
                  alt={post.meta.author}
                  className="h-12 w-12 rounded-full border-2 border-zinc-900"
                />
                <div>
                  <p className="font-semibold">{post.meta.author}</p>
                  <p className="text-sm text-zinc-600">Industry Analysis</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-zinc-600">
                <div className="flex items-center gap-1">
                  <FiCalendar className="h-4 w-4" />
                  <span>{new Date(post.meta.date).toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FiClock className="h-4 w-4" />
                  <span>{post.meta.readingTime}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="border-b-2 border-zinc-900">
          <img
            src={post.meta.image}
            alt={post.meta.title}
            className="h-64 w-full object-cover sm:h-80 lg:h-96"
          />
        </section>

        {/* Article Content */}
        <article className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="prose prose-lg prose-zinc max-w-none">
              <MDXRemote {...post.source} components={components} />
            </div>

            <CostCalculator />

            {/* Tags */}
            <div className="mt-12 flex flex-wrap gap-2">
              {post.meta.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border-2 border-zinc-900 bg-zinc-100 px-3 py-1 text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Share Buttons */}
            <div className="mt-8 flex items-center gap-4 border-t-2 border-zinc-900 pt-8">
              <span className="font-semibold">Share this article:</span>
              <button className="rounded-md border-2 border-zinc-900 bg-white p-2 shadow-[4px_4px_0px_#18181b] transition-all hover:shadow-[2px_2px_0px_#18181b]">
                <FiShare2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {post.relatedPosts.length > 0 && (
          <section className="border-t-2 border-zinc-900 bg-zinc-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
              <h2 className="mb-8 text-2xl font-bold">Related Articles</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {post.relatedPosts.map((relatedPost) => (
                  <Link 
                    key={relatedPost.slug} 
                    href={`/blog/${relatedPost.slug}`}
                    className="group block overflow-hidden rounded-lg border-2 border-zinc-900 bg-white shadow-[4px_4px_0px_#18181b] transition-all hover:shadow-[2px_2px_0px_#18181b]"
                  >
                    <div className="flex h-full">
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="h-32 w-32 object-cover"
                      />
                      <div className="flex-1 p-4">
                        <h3 className="mb-2 font-semibold line-clamp-2 group-hover:text-orange-600">
                          {relatedPost.title}
                        </h3>
                        <p className="text-sm text-zinc-600 line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="border-t-2 border-zinc-900 bg-gradient-to-br from-orange-50 to-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-3xl font-bold">
              Ready to Transform Your {post.meta.category} Operations?
            </h2>
            <p className="mb-8 text-lg text-zinc-600">
              Get a custom AI automation strategy tailored to your business needs.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button className="rounded-md border-2 border-zinc-900 bg-orange-400 px-8 py-3 font-semibold text-zinc-900 shadow-[4px_4px_0px_#18181b] transition-all hover:bg-orange-500 hover:shadow-[2px_2px_0px_#18181b]">
                Schedule a Consultation
              </button>
              <button className="flex items-center gap-2 rounded-md border-2 border-zinc-900 bg-white px-8 py-3 font-semibold text-zinc-900 shadow-[4px_4px_0px_#18181b] transition-all hover:shadow-[2px_2px_0px_#18181b]">
                <FiDownload />
                Download Cost Analysis Template
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts();
  
  return {
    paths: posts.map((post) => ({
      params: { slug: post.slug },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await getPostBySlug(params!.slug as string);
  
  if (!post) {
    return {
      notFound: true,
    };
  }

  // Get related posts (for now, just get all other posts)
  const allPosts = await getAllPosts();
  const relatedPosts = allPosts
    .filter(p => p.slug !== post.slug)
    .slice(0, 2);

  return {
    props: {
      post: {
        meta: post.meta,
        source: post.source,
        relatedPosts,
      },
    },
  };
};