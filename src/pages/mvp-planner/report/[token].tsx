import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Footer } from '@/components/footer/Footer';
import { SectionWrapper } from '@/components/section-wrapper';
import { MVPBlueprint } from '@/components/mvp-blueprint';

const MVPPlannerReport = () => {
  const router = useRouter();
  const { token } = router.query;

  return (
    <>
      <Head>
        <title>Your MVP Development Plan | deployAI Studio</title>
        <link rel="stylesheet" href="/styles/print.css" />
      </Head>

      {/* Header */}
      <div className="bg-[#212121] py-8 print:hidden">
        <div className="container mx-auto px-6 flex justify-center">
          <img
            src="/logo.png"
            alt="deployAI studio"
            className="h-16 w-auto brightness-0 invert"
          />
        </div>
      </div>

      <main className="min-h-screen bg-gray-50">
        <SectionWrapper variant="default" spacing="large">
          <MVPBlueprint 
            summary={{
              projectName: "TaskFlow Pro",
              description: "A streamlined task management platform designed specifically for remote teams to collaborate efficiently",
              targetMarket: "Small to medium remote teams (5-50 people)",
              mainGoal: "Reduce project chaos and missed deadlines by 60%",
              timeline: "4 weeks to MVP launch",
              keyOutcome: "10 beta users managing real projects"
            }}
            userCapabilities={[
              "Users can create an account and set up their profile",
              "Users can create and organize projects",
              "Users can add tasks with priorities and deadlines",
              "Users can assign tasks to team members",
              "Users can track progress with kanban boards",
              "Users can comment and collaborate on tasks",
              "Users can receive email notifications",
              "Users can generate project reports",
              "Users can integrate with Slack",
              "Users can export data to CSV"
            ]}
            investment={{
              developmentCost: 12500,
              weeklyBreakdown: [
                { week: 1, tasks: ["Design system", "Database", "Auth"], cost: 3125 },
                { week: 2, tasks: ["Core features", "API integration"], cost: 3125 },
                { week: 3, tasks: ["Additional features", "Payments"], cost: 3125 },
                { week: 4, tasks: ["Polish", "Testing", "Deploy"], cost: 3125 }
              ],
              monthlyRunningCosts: {
                min: 50,
                max: 250,
                breakdown: [
                  { item: "Hosting (Vercel)", cost: "£20-100" },
                  { item: "Database (Supabase)", cost: "£25+" },
                  { item: "AI APIs", cost: "£5-125" }
                ]
              },
              costPerUser: "£0.50 - £2.00"
            }}
            techStack={{
              frontend: "Next.js + TypeScript",
              backend: "Supabase",
              database: "PostgreSQL",
              apis: ["OpenAI API", "Stripe", "SendGrid", "Analytics"],
              infrastructure: "Vercel"
            }}
            timeline={[
              {
                week: 1,
                title: "Foundation & Setup",
                description: "Set up the core infrastructure and authentication",
                deliverables: [
                  "Design system with components",
                  "Database schema and migrations",
                  "User authentication flow",
                  "Basic navigation and routing"
                ]
              },
              {
                week: 2,
                title: "Core Features",
                description: "Build the main functionality that validates your hypothesis",
                deliverables: [
                  "Primary user workflows",
                  "Data management features",
                  "API integrations",
                  "Basic dashboard"
                ]
              },
              {
                week: 3,
                title: "Enhanced Features & Payments",
                description: "Add supporting features and monetization",
                deliverables: [
                  "Payment integration",
                  "Email notifications",
                  "User settings",
                  "Advanced features"
                ]
              },
              {
                week: 4,
                title: "Polish & Deploy",
                description: "Final testing, optimization, and go-live",
                deliverables: [
                  "Bug fixes and testing",
                  "Performance optimization",
                  "Production deployment",
                  "Launch preparation"
                ]
              }
            ]}
          />
        </SectionWrapper>
      </main>

      <Footer />
    </>
  );
};

export default MVPPlannerReport;