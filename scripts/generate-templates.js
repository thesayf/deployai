#!/usr/bin/env node

/**
 * Template Generation CLI Script
 * Command-line tool for generating landing page templates
 */

const fs = require("fs");
const path = require("path");

// Import template system (assuming it's compiled to JS)
const { templateGenerator } = require("../src/lib/templates/generator");

// CLI argument parsing
const args = process.argv.slice(2);

const config = {
  outputDir: "./generated-templates",
  format: "tsx",
  locations: ["dubai", "abu-dhabi", "sharjah", "uae"],
  services: [
    "custom-software-development",
    "web-development",
    "mobile-development",
  ],
  industries: ["real-estate", "healthcare", "fintech"],
  patterns: ["locationService", "industryLocation", "serviceIndustry"],
  generateSitemap: false,
  generateRobots: false,
  baseUrl: "https://deployai.co",
  help: false,
};

// Parse command line arguments
for (let i = 0; i < args.length; i++) {
  const arg = args[i];

  switch (arg) {
    case "--output":
    case "-o":
      config.outputDir = args[++i];
      break;

    case "--format":
    case "-f":
      config.format = args[++i];
      break;

    case "--locations":
      config.locations = args[++i].split(",");
      break;

    case "--services":
      config.services = args[++i].split(",");
      break;

    case "--industries":
      config.industries = args[++i].split(",");
      break;

    case "--patterns":
      config.patterns = args[++i].split(",");
      break;

    case "--sitemap":
      config.generateSitemap = true;
      break;

    case "--robots":
      config.generateRobots = true;
      break;

    case "--base-url":
      config.baseUrl = args[++i];
      break;

    case "--help":
    case "-h":
      config.help = true;
      break;

    default:
      if (arg.startsWith("-")) {
        console.error(`Unknown option: ${arg}`);
        process.exit(1);
      }
  }
}

// Help text
const showHelp = () => {
  console.log(`
📋 Template Generation CLI

Usage: node scripts/generate-templates.js [options]

Options:
  -o, --output <dir>        Output directory (default: ./generated-templates)
  -f, --format <format>     Output format: tsx, json, md (default: tsx)
  --locations <list>        Comma-separated list of locations
  --services <list>         Comma-separated list of services
  --industries <list>       Comma-separated list of industries
  --patterns <list>         Comma-separated list of patterns
  --sitemap                 Generate sitemap.xml
  --robots                  Generate robots.txt
  --base-url <url>          Base URL for sitemap (default: https://deployai.co)
  -h, --help                Show this help message

Examples:
  # Generate all templates
  node scripts/generate-templates.js

  # Generate only Dubai templates
  node scripts/generate-templates.js --locations dubai

  # Generate with custom output directory
  node scripts/generate-templates.js -o ./my-templates

  # Generate JSON format with sitemap
  node scripts/generate-templates.js -f json --sitemap

  # Generate specific services and industries
  node scripts/generate-templates.js --services web-development --industries healthcare,fintech
`);
};

// Main execution
async function main() {
  if (config.help) {
    showHelp();
    return;
  }

  console.log("🚀 Starting template generation...");
  console.log("📋 Configuration:", {
    outputDir: config.outputDir,
    format: config.format,
    locations: config.locations.length,
    services: config.services.length,
    industries: config.industries.length,
    patterns: config.patterns,
  });

  try {
    // Generate templates
    const result = await templateGenerator.generate({
      outputDir: config.outputDir,
      generateFiles: true,
      fileFormat: config.format,
      locations: config.locations,
      services: config.services,
      industries: config.industries,
      patterns: config.patterns,
    });

    console.log("✅ Template generation completed!");
    console.log(`📊 Generated ${result.summary.total} templates`);
    console.log("📈 Summary:");
    console.log("  - By Pattern:", result.summary.byPattern);
    console.log("  - By Variant:", result.summary.byVariant);
    console.log("  - By Location:", result.summary.byLocation);

    if (result.files) {
      console.log(`📁 Files written to: ${config.outputDir}`);
      console.log(`📄 Total files: ${result.files.length}`);
    }

    // Generate sitemap if requested
    if (config.generateSitemap) {
      console.log("🗺️  Generating sitemap...");
      const sitemap = templateGenerator.generateSitemap(
        result.templates,
        config.baseUrl
      );
      const sitemapPath = path.join("./public", "sitemap.xml");

      // Ensure public directory exists
      if (!fs.existsSync("./public")) {
        fs.mkdirSync("./public", { recursive: true });
      }

      fs.writeFileSync(sitemapPath, sitemap, "utf8");
      console.log(`✅ Sitemap generated: ${sitemapPath}`);
    }

    // Generate robots.txt if requested
    if (config.generateRobots) {
      console.log("🤖 Generating robots.txt...");
      const robots = templateGenerator.generateRobotsTxt(config.baseUrl);
      const robotsPath = path.join("./public", "robots.txt");

      // Ensure public directory exists
      if (!fs.existsSync("./public")) {
        fs.mkdirSync("./public", { recursive: true });
      }

      fs.writeFileSync(robotsPath, robots, "utf8");
      console.log(`✅ Robots.txt generated: ${robotsPath}`);
    }

    // Generate analytics events file
    const analyticsPath = path.join(config.outputDir, "analytics-events.json");
    const analyticsEvents = templateGenerator.generateAnalyticsEvents(
      result.templates
    );
    fs.writeFileSync(
      analyticsPath,
      JSON.stringify(analyticsEvents, null, 2),
      "utf8"
    );
    console.log(`📊 Analytics events generated: ${analyticsPath}`);

    console.log("🎉 All tasks completed successfully!");
  } catch (error) {
    console.error("❌ Error during template generation:", error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main().catch((error) => {
    console.error("❌ Fatal error:", error);
    process.exit(1);
  });
}

module.exports = { main, config };
