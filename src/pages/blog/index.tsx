import Head from "next/head";
import Link from "next/link";
import { Footer } from "@/components/footer/Footer";
import { AnimatedNavBar } from "@/components/navigation/AnimatedNavBar";
import { motion } from "framer-motion";
import { useState } from "react";
import { FiCalendar, FiClock } from "react-icons/fi";
import { GetStaticProps } from "next";
import { getAllPosts, PostMeta } from "@/lib/mdx";

interface BlogProps {
  posts: PostMeta[];
}

const BlogCard = ({ post }: { post: PostMeta }) => {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      className="group cursor-pointer"
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="overflow-hidden rounded-lg border-2 border-zinc-900 bg-white shadow-[4px_4px_0px_#18181b] transition-all hover:shadow-[2px_2px_0px_#18181b]">
          <div className="relative h-48 overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute top-4 left-4">
              <span className="rounded border border-zinc-900 bg-orange-400 px-3 py-1 text-xs font-semibold uppercase">
                {post.category}
              </span>
            </div>
          </div>
          
          <div className="p-6">
            <div className="mb-3 flex items-center gap-4 text-sm text-zinc-600">
              <div className="flex items-center gap-1">
                <FiCalendar className="h-4 w-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <FiClock className="h-4 w-4" />
                <span>{post.readingTime}</span>
              </div>
            </div>
            
            <h2 className="mb-3 text-xl font-bold leading-tight text-zinc-900 line-clamp-2">
              {post.title}
            </h2>
            
            <p className="mb-4 text-zinc-600 line-clamp-3">
              {post.excerpt}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.author}`}
                  alt={post.author}
                  className="h-8 w-8 rounded-full border-2 border-zinc-900"
                />
                <span className="text-sm font-medium text-zinc-700">
                  {post.author}
                </span>
              </div>
              
              <span className="text-sm font-semibold text-orange-600 group-hover:text-orange-700">
                Read more →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default function Blog({ posts }: BlogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  
  const categories = ["All", ...Array.from(new Set(posts.map(post => post.category)))];
  
  const filteredPosts = selectedCategory === "All" 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  return (
    <>
      <Head>
        <title>Blog - DeployAI | Custom AI Automation Insights</title>
        <meta 
          name="description" 
          content="Expert insights on custom AI automation for businesses in Dubai and the UAE. Learn how to reduce costs and improve efficiency with strategic automation." 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AnimatedNavBar />

      <main className="relative min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b-2 border-zinc-900 bg-gradient-to-br from-orange-50 to-white px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h1 className="mb-6 text-4xl font-black sm:text-5xl lg:text-6xl">
                <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Expert Insights
                </span>{" "}
                on Custom AI Automation
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-zinc-600 sm:text-xl">
                Strategic analysis and industry insights to help Dubai and UAE businesses 
                make informed decisions about automation and technology investments.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="border-b-2 border-zinc-900 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-md border-2 px-4 py-2 text-sm font-semibold transition-all ${
                    selectedCategory === category
                      ? "border-zinc-900 bg-zinc-900 text-white shadow-[4px_4px_0px_#f97316]"
                      : "border-zinc-900 bg-white text-zinc-900 shadow-[4px_4px_0px_#18181b] hover:shadow-[2px_2px_0px_#18181b]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <BlogCard post={post} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="border-t-2 border-zinc-900 bg-gradient-to-br from-orange-50 to-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-3xl font-bold">
              Stay Updated with Industry Insights
            </h2>
            <p className="mb-8 text-lg text-zinc-600">
              Get weekly analysis on automation trends and cost-saving strategies for UAE businesses.
            </p>
            <form className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-md border-2 border-zinc-900 px-4 py-3 text-zinc-900 shadow-[4px_4px_0px_#18181b] outline-none transition-all focus:shadow-[2px_2px_0px_#18181b]"
              />
              <button
                type="submit"
                className="rounded-md border-2 border-zinc-900 bg-orange-400 px-6 py-3 font-semibold text-zinc-900 shadow-[4px_4px_0px_#18181b] transition-all hover:bg-orange-500 hover:shadow-[2px_2px_0px_#18181b]"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPosts();
  
  return {
    props: {
      posts,
    },
  };
};