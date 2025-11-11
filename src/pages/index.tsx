import React from "react";
import Head from "next/head";
import Link from "next/link";
import { ArrowRight, Check, Zap, Users, TrendingUp, Clock, Shield } from "lucide-react";

const HomePage: React.FC = () => {
  return (
    <>
      <Head>
        <title>White-Label AI Assessment Platform for Consultants | DeployAI</title>
        <meta
          name="description"
          content="Help your clients discover AI opportunities with fully branded assessments. Automated reports, lead generation, and revenue insights. 14-day free trial."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-white">
        {/* Navigation */}
        <nav className="border-b-[3px] border-black bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="text-2xl font-black text-gray-900">
                DeployAI
              </div>
              <div className="flex items-center gap-4">
                <Link
                  href="/login"
                  className="px-4 py-2 font-bold text-gray-900 hover:text-orange-500 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-6 py-2 bg-orange-500 text-white font-bold border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
                >
                  Start Free Trial
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block mb-4 px-4 py-2 bg-orange-100 border-[3px] border-black font-bold text-sm">
                  FOR AI CONSULTANTS
                </div>
                <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
                  Turn Every Prospect Into a High-Value AI Client
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  White-label AI assessment platform that positions you as the expert.
                  Generate detailed roadmaps, uncover $50k+ opportunities, and close more deals.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/signup"
                    className="inline-flex items-center justify-center px-8 py-4 bg-orange-500 text-white font-bold text-lg border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
                  >
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                  <Link
                    href="/login"
                    className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-bold text-lg border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
                  >
                    Sign In
                  </Link>
                </div>
                <p className="mt-6 text-sm text-gray-500">
                  14-day free trial • No credit card required • Setup in 5 minutes
                </p>
              </div>
              <div className="bg-gradient-to-br from-orange-100 to-blue-100 border-[3px] border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div className="bg-white border-[3px] border-black p-6 mb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-orange-500 border-[3px] border-black flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="font-black text-2xl text-gray-900">$50k+</div>
                      <div className="text-sm text-gray-600">Avg Deal Size</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-700">
                    Generate detailed AI opportunity reports that justify $50k+ implementations
                  </div>
                </div>
                <div className="bg-white border-[3px] border-black p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-500 border-[3px] border-black flex items-center justify-center">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="font-black text-2xl text-gray-900">100%</div>
                      <div className="text-sm text-gray-600">Your Brand</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-700">
                    Fully white-labeled with your logo, colors, and domain
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 text-center">
              Everything You Need to Win AI Deals
            </h2>
            <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
              Position yourself as the AI expert with automated assessments that do the heavy lifting
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Zap,
                  title: "Automated AI Reports",
                  description: "14-question assessment generates detailed roadmaps with tool recommendations, ROI calculations, and implementation timelines",
                  color: "bg-orange-500"
                },
                {
                  icon: TrendingUp,
                  title: "Revenue Opportunity Insights",
                  description: "Show prospects exactly how much they're losing without AI. Surface $50k+ implementation opportunities automatically",
                  color: "bg-blue-500"
                },
                {
                  icon: Users,
                  title: "Fully White-Labeled",
                  description: "Your logo, your colors, your domain. Clients think you built it. No DeployAI branding anywhere",
                  color: "bg-green-500"
                },
                {
                  icon: Clock,
                  title: "Lead Generation When Paused",
                  description: "Pause assessments when busy. Collect leads in a waitlist. Send individual assessments for an overage fee",
                  color: "bg-purple-500"
                },
                {
                  icon: Shield,
                  title: "Real-Time Notifications",
                  description: "Get alerted when leads join, assessments complete, or usage hits thresholds. Never miss an opportunity",
                  color: "bg-red-500"
                },
                {
                  icon: Check,
                  title: "No Technical Setup",
                  description: "Sign up, customize your branding, share your link. That's it. No code, no integrations, no headaches",
                  color: "bg-yellow-500"
                }
              ].map((feature, index) => (
                <div key={index} className="bg-white border-[3px] border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
                  <div className={`w-12 h-12 ${feature.color} border-[3px] border-black flex items-center justify-center mb-4`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 text-center">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 mb-12 text-center">
              Start free, scale as you grow. Cancel anytime.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Starter",
                  price: "$199",
                  period: "/month",
                  description: "Perfect for solo consultants getting started",
                  assessments: "25 assessments/month",
                  overage: "$4 per additional",
                  features: [
                    "Fully white-labeled portal",
                    "Automated AI reports",
                    "Revenue opportunity insights",
                    "Lead generation & waitlist",
                    "Email notifications",
                    "Basic analytics"
                  ],
                  cta: "Start Free Trial",
                  highlighted: false
                },
                {
                  name: "Professional",
                  price: "$399",
                  period: "/month",
                  description: "For growing agencies with multiple clients",
                  assessments: "75 assessments/month",
                  overage: "$3 per additional",
                  features: [
                    "Everything in Starter",
                    "Custom domain support",
                    "Advanced analytics",
                    "Priority support",
                    "Bulk assessment sending",
                    "Export client data"
                  ],
                  cta: "Start Free Trial",
                  highlighted: true
                },
                {
                  name: "Scale",
                  price: "$799",
                  period: "/month",
                  description: "For established firms at scale",
                  assessments: "200 assessments/month",
                  overage: "$2 per additional",
                  features: [
                    "Everything in Professional",
                    "Unlimited team members",
                    "White-label email domain",
                    "API access",
                    "Dedicated account manager",
                    "Custom integrations"
                  ],
                  cta: "Start Free Trial",
                  highlighted: false
                }
              ].map((plan, index) => (
                <div
                  key={index}
                  className={`bg-white border-[3px] border-black p-8 ${
                    plan.highlighted
                      ? 'shadow-[8px_8px_0px_0px_rgba(249,115,22,1)] scale-105'
                      : 'shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'
                  } hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all relative`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-4 py-1 font-bold text-sm border-[3px] border-black">
                      MOST POPULAR
                    </div>
                  )}
                  <h3 className="text-2xl font-black text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-6">
                    {plan.description}
                  </p>
                  <div className="mb-6">
                    <span className="text-5xl font-black text-gray-900">
                      {plan.price}
                    </span>
                    <span className="text-gray-600 text-lg">
                      {plan.period}
                    </span>
                  </div>
                  <div className="mb-6 p-4 bg-gray-50 border-[3px] border-black">
                    <div className="font-bold text-gray-900 mb-1">
                      {plan.assessments}
                    </div>
                    <div className="text-sm text-gray-600">
                      {plan.overage}
                    </div>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/signup"
                    className={`block text-center px-6 py-3 font-bold border-[3px] border-black transition-all ${
                      plan.highlighted
                        ? 'bg-orange-500 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'
                        : 'bg-white text-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'
                    } hover:translate-x-[-2px] hover:translate-y-[-2px]`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              ))}
            </div>
            <p className="text-center text-gray-600 mt-8">
              All plans include a 14-day free trial. No credit card required.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-500 to-orange-600 border-t-[3px] border-b-[3px] border-black">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Ready to Win More AI Deals?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join consultants who are closing $50k+ AI implementations every month
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-bold text-lg border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
            >
              Start Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <p className="mt-6 text-white/80 text-sm">
              No credit card required • Setup in 5 minutes • Cancel anytime
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t-[3px] border-black bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-2xl font-black mb-4">DeployAI</h3>
                <p className="text-gray-400">
                  White-label AI assessment platform for consultants
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-4">Product</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/signup" className="hover:text-white">Pricing</Link></li>
                  <li><Link href="/login" className="hover:text-white">Login</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Support</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="mailto:support@deployai.studio" className="hover:text-white">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Legal</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white">Privacy</a></li>
                  <li><a href="#" className="hover:text-white">Terms</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
              <p>&copy; 2025 DeployAI. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
};

export default HomePage;
