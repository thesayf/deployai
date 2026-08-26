/**
 * Dynamic Template Page
 * Handles all template-based landing pages via Next.js dynamic routing
 */

import React from "react";
import { GetServerSideProps } from "next";
import { DynamicTemplate } from "@/components/templates/DynamicTemplate";
import { LandingPageTemplate, getTemplateBySlug } from "@/lib/templates";

interface TemplatePageProps {
  template: LandingPageTemplate;
}

export default function TemplatePage({ template }: TemplatePageProps) {
  return <DynamicTemplate template={template} />;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const slug = params?.slug as string;

    console.log("Template page - slug:", slug);

    if (!slug) {
      console.log("No slug provided");
      return {
        notFound: true,
      };
    }

    const template = getTemplateBySlug(slug);

    console.log("Template found:", !!template);
    if (template) {
      console.log("Template title:", template.meta.title);
      console.log("Template slug:", template.slug);
    }

    if (!template) {
      console.log("Template not found for slug:", slug);
      return {
        notFound: true,
      };
    }

    return {
      props: {
        template,
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    return {
      notFound: true,
    };
  }
};
