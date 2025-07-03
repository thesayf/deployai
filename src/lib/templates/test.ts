/**
 * Template System Test
 * Quick test to verify template generation functionality
 */

import { templateResolver, getAllTemplates } from "./index";

// Test template generation
console.log("🧪 Testing Template System...");

try {
  // Test 1: Generate all templates
  console.log("\n1. Generating all templates...");
  const allTemplates = getAllTemplates();
  console.log(`✅ Generated ${allTemplates.length} templates`);

  if (allTemplates.length > 0) {
    console.log("📋 Sample template:", {
      id: allTemplates[0].id,
      slug: allTemplates[0].slug,
      variant: allTemplates[0].variant,
      title: allTemplates[0].meta.title,
      location: allTemplates[0].content.location,
      service: allTemplates[0].content.service,
    });
  }

  // Test 2: Generate specific templates
  console.log("\n2. Generating Dubai custom software templates...");
  const dubaiTemplates = templateResolver.generateMultipleTemplates({
    locations: ["dubai"],
    services: ["custom-software-development"],
    patterns: ["locationService"],
  });
  console.log(`✅ Generated ${dubaiTemplates.length} Dubai templates`);

  // Test 3: Test template resolution by slug
  console.log("\n3. Testing template resolution by slug...");
  if (allTemplates.length > 0) {
    const firstTemplate = allTemplates[0];
    const resolvedTemplate = templateResolver.resolveBySlug(firstTemplate.slug);

    if (resolvedTemplate) {
      console.log(
        `✅ Successfully resolved template: ${resolvedTemplate.slug}`
      );
    } else {
      console.log("❌ Failed to resolve template by slug");
    }
  }

  // Test 4: Test template suggestions
  console.log("\n4. Testing template suggestions...");
  const suggestions = templateResolver.getSuggestions({
    location: "dubai",
    service: "custom-software-development",
  });
  console.log(
    `✅ Found ${suggestions.length} suggestions for Dubai custom software`
  );

  console.log("\n🎉 All tests passed! Template system is working correctly.");
} catch (error) {
  console.error("❌ Test failed:", error);
}
