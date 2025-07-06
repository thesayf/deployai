/**
 * Template Management Dashboard
 * Admin interface for managing and previewing templates
 */

import React, { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import { LandingPageTemplate, getAllTemplates } from "@/lib/templates";
import { templateGenerator } from "@/lib/templates/generator";

interface TemplatesDashboardProps {
  templates: LandingPageTemplate[];
  summary: any;
}

export default function TemplatesDashboard({
  templates,
  summary,
}: TemplatesDashboardProps) {
  const [selectedTemplate, setSelectedTemplate] =
    useState<LandingPageTemplate | null>(null);
  const [filterVariant, setFilterVariant] = useState<string>("all");
  const [filterLocation, setFilterLocation] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);

  const filteredTemplates = templates.filter((template) => {
    const matchesVariant =
      filterVariant === "all" || template.variant === filterVariant;
    const matchesLocation =
      filterLocation === "all" || template.content.location === filterLocation;
    const matchesSearch =
      searchTerm === "" ||
      template.meta.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.slug.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesVariant && matchesLocation && matchesSearch;
  });

  const handleGenerateTemplates = async () => {
    setIsGenerating(true);
    try {
      const result = await templateGenerator.generate({
        generateFiles: false, // Client-side can't write files
        fileFormat: "tsx",
      });

      // Download the templates as a zip file or show success message
      const dataStr = JSON.stringify(result.templates, null, 2);
      const dataUri =
        "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
      const exportFileDefaultName = "templates.json";
      const linkElement = document.createElement("a");
      linkElement.setAttribute("href", dataUri);
      linkElement.setAttribute("download", exportFileDefaultName);
      linkElement.click();

      alert(
        `Generated ${result.summary.total} templates successfully! Downloaded as templates.json`
      );
    } catch (error: any) {
      alert("Error generating templates: " + (error?.message || error));
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePreviewTemplate = (template: LandingPageTemplate) => {
    window.open(`/templates/${template.slug}`, "_blank");
  };

  const handleDownloadTemplate = (template: LandingPageTemplate) => {
    const dataStr = JSON.stringify(template, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = `${template.slug}.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Template Management Dashboard
          </h1>
          <p className="text-gray-600">
            Manage and preview your landing page templates
          </p>
        </div>

        {/* Summary Cards */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
          <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              Total Templates
            </h3>
            <p className="text-3xl font-bold text-blue-600">{summary.total}</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              Variants
            </h3>
            <p className="text-3xl font-bold text-green-600">
              {Object.keys(summary.byVariant).length}
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              Locations
            </h3>
            <p className="text-3xl font-bold text-purple-600">
              {Object.keys(summary.byLocation).length}
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              Patterns
            </h3>
            <p className="text-3xl font-bold text-orange-600">
              {Object.keys(summary.byPattern).length}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="mb-8 rounded-lg bg-white p-6 shadow">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
                <svg
                  className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              {/* Variant Filter */}
              <select
                value={filterVariant}
                onChange={(e) => setFilterVariant(e.target.value)}
                className="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Variants</option>
                {Object.keys(summary.byVariant).map((variant) => (
                  <option key={variant} value={variant}>
                    {variant}
                  </option>
                ))}
              </select>

              {/* Location Filter */}
              <select
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
                className="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Locations</option>
                {Object.keys(summary.byLocation).map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={handleGenerateTemplates}
                disabled={isGenerating}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {isGenerating ? "Generating..." : "Download Templates"}
              </button>
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      template.variant === "customSoftware"
                        ? "bg-blue-100 text-blue-800"
                        : template.variant === "webapp"
                          ? "bg-green-100 text-green-800"
                          : template.variant === "ai"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {template.variant}
                  </span>
                  <span className="text-sm text-gray-500">
                    {template.content.location}
                  </span>
                </div>

                <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-gray-900">
                  {template.meta.title}
                </h3>

                <p className="mb-4 line-clamp-3 text-sm text-gray-600">
                  {template.meta.description}
                </p>

                <div className="mb-4 flex flex-wrap gap-2">
                  {template.meta.keywords.slice(0, 3).map((keyword, index) => (
                    <span
                      key={index}
                      className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handlePreviewTemplate(template)}
                    className="flex-1 rounded-lg bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => setSelectedTemplate(template)}
                    className="flex-1 rounded-lg bg-gray-600 px-3 py-2 text-sm text-white hover:bg-gray-700"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => handleDownloadTemplate(template)}
                    className="rounded-lg bg-green-600 px-3 py-2 text-sm text-white hover:bg-green-700"
                  >
                    📥
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Template Details Modal */}
        {selectedTemplate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-white">
              <div className="border-b border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Template Details
                  </h2>
                  <button
                    onClick={() => setSelectedTemplate(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="mb-3 text-lg font-semibold">
                      Meta Information
                    </h3>
                    <div className="space-y-2">
                      <div>
                        <strong>Title:</strong> {selectedTemplate.meta.title}
                      </div>
                      <div>
                        <strong>Description:</strong>{" "}
                        {selectedTemplate.meta.description}
                      </div>
                      <div>
                        <strong>Slug:</strong> {selectedTemplate.slug}
                      </div>
                      <div>
                        <strong>Variant:</strong> {selectedTemplate.variant}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-3 text-lg font-semibold">Content</h3>
                    <div className="space-y-2">
                      <div>
                        <strong>Location:</strong>{" "}
                        {selectedTemplate.content.location}
                      </div>
                      <div>
                        <strong>Service:</strong>{" "}
                        {selectedTemplate.content.service}
                      </div>
                      <div>
                        <strong>Industry:</strong>{" "}
                        {selectedTemplate.content.industry || "N/A"}
                      </div>
                      <div>
                        <strong>Target Audience:</strong>{" "}
                        {selectedTemplate.content.targetAudience}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="mb-3 text-lg font-semibold">Sections</h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {selectedTemplate.sections.map((section) => (
                      <div
                        key={section.component}
                        className={`rounded-lg border p-3 ${
                          section.enabled
                            ? "border-green-200 bg-green-50"
                            : "border-gray-200 bg-gray-50"
                        }`}
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <span className="font-medium">
                            {section.component}
                          </span>
                          <span className="text-sm text-gray-500">
                            #{section.order}
                          </span>
                        </div>
                        <div
                          className={`text-sm ${section.enabled ? "text-green-600" : "text-gray-500"}`}
                        >
                          {section.enabled ? "Enabled" : "Disabled"}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const templates = getAllTemplates();
    const result = await templateGenerator.generate();

    return {
      props: {
        templates,
        summary: result.summary,
      },
    };
  } catch (error) {
    console.error("Error loading templates:", error);
    return {
      props: {
        templates: [],
        summary: { total: 0, byPattern: {}, byVariant: {}, byLocation: {} },
      },
    };
  }
};
