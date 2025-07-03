/**
 * Dynamic Template Page
 * Handles all template-based landing pages via Next.js dynamic routing
 */

import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { DynamicTemplate } from "@/components/templates/DynamicTemplate";
import {
  LandingPageTemplate,
  getTemplateBySlug,
  generateStaticPaths,
} from "@/lib/templates";

interface TemplatePageProps {
  template: LandingPageTemplate;
}

export default function TemplatePage({ template }: TemplatePageProps) {
  return <DynamicTemplate template={template} />;
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    // Generate paths for all templates
    const staticPaths = generateStaticPaths();

    // For development, limit to first 10 templates to speed up builds
    if (process.env.NODE_ENV === "development") {
      return {
        paths: staticPaths.paths.slice(0, 10),
        fallback: "blocking",
      };
    }

    return staticPaths;
  } catch (error) {
    console.error("Error generating static paths:", error);
    return {
      paths: [],
      fallback: "blocking",
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const slug = params?.slug as string;

    if (!slug) {
      return {
        notFound: true,
      };
    }

    const template = getTemplateBySlug(slug);

    if (!template) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        template,
      },
      revalidate: 86400, // Revalidate once per day
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return {
      notFound: true,
    };
  }
};
