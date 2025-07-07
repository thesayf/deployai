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

// Write files to disk
function writeFiles(files, outputDir) {
  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const writtenFiles = [];

  for (const file of files) {
    const filePath = path.join(outputDir, file.path);

    // Ensure the directory exists for the file
    const fileDir = path.dirname(filePath);
    if (!fs.existsSync(fileDir)) {
      fs.mkdirSync(fileDir, { recursive: true });
    }

    // Write the file
    fs.writeFileSync(filePath, file.content, "utf8");
    writtenFiles.push(filePath);
  }

  return writtenFiles;
}

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

    // Write files to disk
    if (result.files && result.files.length > 0) {
      console.log(`📁 Writing files to: ${config.outputDir}`);
      const writtenFiles = writeFiles(result.files, config.outputDir);
      console.log(`📄 Total files written: ${writtenFiles.length}`);

      // Show first few files as examples
      if (writtenFiles.length > 0) {
        console.log("📝 Sample files:");
        writtenFiles.slice(0, 5).forEach((file) => {
          console.log(`  - ${file}`);
        });
        if (writtenFiles.length > 5) {
          console.log(`  ... and ${writtenFiles.length - 5} more`);
        }
      }
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

    console.log("\n🎉 All done! Happy templating!");
  } catch (error) {
    console.error("❌ Error during generation:", error);
    process.exit(1);
  }
}

// Run the CLI
main().catch((error) => {
  console.error("❌ Unexpected error:", error);
  process.exit(1);
});
