# SEO Keyword Research Workflow Guide

_A step-by-step guide for finding profitable keywords around any topic for specific locations using DataForSEO MCP tools_

## Overview

This workflow helps you discover, analyze, and prioritize keywords for SEO campaigns using DataForSEO's comprehensive data. The process moves from broad topic research to specific, actionable keyword lists.

## Prerequisites

- Access to DataForSEO MCP tools
- Target topic/industry defined
- Target location(s) identified
- Basic understanding of search intent types

## Workflow Steps

### 1. 🎯 **Seed Keyword Discovery & Expansion**

Start with your core topic and expand to find related opportunities.

#### A. Generate Keyword Ideas

```
Tool: mcp_dataforseo_dataforseo_labs_google_keyword_ideas
Purpose: Find keywords relevant to your seed terms
Input: Up to 200 seed keywords
Output: Related keyword suggestions with search volume, CPC, competition
```

#### B. Find Related Keywords

```
Tool: mcp_dataforseo_dataforseo_labs_google_related_keywords
Purpose: Discover keywords from "searches related to" sections
Input: Single keyword + depth (0-4)
Output: Keywords appearing in related searches with metrics
```

#### C. Get Keyword Suggestions

```
Tool: mcp_dataforseo_dataforseo_labs_google_keyword_suggestions
Purpose: Find long-tail variations containing your seed keyword
Input: Single keyword
Output: Keyword suggestions with full-text search matches
```

**💡 Pro Tip:** Start with 3-5 broad seed keywords, then use the results to find more specific opportunities.

---

### 2. 📊 **Keyword Metrics Analysis**

Evaluate your expanded keyword list to understand potential and difficulty.

#### A. Search Volume Data

```
Tool: mcp_dataforseo_keywords_data_google_ads_search_volume
Purpose: Get accurate search volume from Google Ads
Input: Up to 1000 keywords
Output: Monthly search volume, trends, demographic data
```

#### B. Keyword Difficulty Assessment

```
Tool: mcp_dataforseo_dataforseo_labs_bulk_keyword_difficulty
Purpose: Understand ranking difficulty (0-100 scale)
Input: Up to 1000 keywords
Output: Difficulty scores for each keyword
```

#### C. Search Intent Analysis

```
Tool: mcp_dataforseo_dataforseo_labs_search_intent
Purpose: Classify keywords by user intent
Input: Up to 1000 keywords
Output: Intent classification (informational, navigational, commercial, transactional)
```

**📋 Create a scoring matrix:**

- High volume + Low difficulty + Right intent = Priority keywords
- Medium volume + Medium difficulty + Right intent = Secondary keywords
- Low volume + High difficulty = Avoid or long-term targets

---

### 3. 🔍 **Competitive Landscape Analysis**

Understand what's currently ranking and identify opportunities.

#### A. SERP Analysis

```
Tool: mcp_dataforseo_serp_organic_live_advanced
Purpose: See current rankings for your target keywords
Input: Keywords + location + depth (10-700 results)
Output: Current SERP results with ranking positions, titles, snippets
```

#### B. Competitor Keywords

```
Tool: mcp_dataforseo_dataforseo_labs_google_serp_competitors
Purpose: Find domains ranking for multiple keywords in your space
Input: Array of keywords
Output: Competing domains with their ranking metrics
```

#### C. Domain Analysis (if targeting specific competitors)

```
Tool: mcp_dataforseo_dataforseo_labs_google_ranked_keywords
Purpose: See all keywords a specific domain ranks for
Input: Target domain
Output: Keywords the domain ranks for with positions and metrics
```

**🎯 Look for:**

- Weak competitors in top 10 (opportunities)
- Content gaps (keywords without great content)
- SERP features you could target (featured snippets, etc.)

---

### 4. 🌍 **Location-Specific Optimization**

Ensure your research is tailored to your target geographic market.

#### A. Available Locations

```
Tool: mcp_dataforseo_serp_locations
Purpose: Get list of available locations for targeting
Input: Country code (e.g., "US")
Output: Available location options for targeting
```

#### B. Location Formatting

- **Country only:** "United States"
- **Region, Country:** "California,United States"
- **City, Region, Country:** "Los Angeles,California,United States"

**🗺️ Location Strategy:**

- Start broad (country-level) for market overview
- Narrow down (city-level) for local businesses
- Compare metrics across different locations

---

### 5. 📈 **Trend Analysis & Timing**

Understand keyword performance over time and seasonal patterns.

#### A. Google Trends Data

```
Tool: mcp_dataforseo_keywords_data_google_trends_explore
Purpose: Analyze keyword popularity trends
Input: Up to 5 keywords + time range
Output: Trend data, seasonal patterns, geographic distribution
```

#### B. DataForSEO Trends

```
Tool: mcp_dataforseo_keywords_data_dataforseo_trends_explore
Purpose: Alternative trend analysis with more data points
Input: Up to 5 keywords + time range
Output: Keyword popularity over time
```

---

## 🎯 **Example Workflow**

Let's say you're researching "AI automation tools" for the US market:

### Step 1: Seed Expansion

1. Start with: `["AI automation", "automation tools", "business automation"]`
2. Run keyword ideas → Get 200+ related terms
3. Run related keywords → Find "searches related to" terms
4. Compile master list of ~500 keywords

### Step 2: Metrics Analysis

1. Get search volume for all 500 keywords
2. Calculate keyword difficulty scores
3. Classify search intent for each
4. Score and prioritize: High volume + Low difficulty + Commercial intent

### Step 3: Competitive Analysis

1. Check SERPs for top 20 priority keywords
2. Identify competitor domains
3. Analyze their keyword portfolios
4. Find content gaps and opportunities

### Step 4: Location Targeting

1. Confirm targeting "United States"
2. Compare with "California,United States" for regional differences
3. Adjust strategy based on local vs. national competition

### Step 5: Final Keyword List

- **Primary (10-15 keywords):** High volume, medium difficulty, strong commercial intent
- **Secondary (20-30 keywords):** Medium volume, low-medium difficulty, mixed intent
- **Long-term (50+ keywords):** Lower volume, high difficulty, strategic value

---

## 🛠️ **Implementation Tips**

### Filtering Best Practices

- **Search Volume:** Minimum 100 monthly searches (adjust based on niche)
- **Keyword Difficulty:** Target 30-60 range for most businesses
- **Search Intent:** Align with your content strategy goals
- **Competition:** Look for keywords with varied SERP results

### Tool Configuration

- **Language:** Always specify language code (e.g., "en")
- **Location:** Use full hierarchical format
- **Depth:** Start with 10-50 results, increase for comprehensive analysis
- **Filters:** Use filtering to focus on relevant metrics ranges

### Documentation

- Save all raw data exports
- Track keyword performance over time
- Document decision rationale for future reference
- Create keyword mapping to content strategy

---

## 📋 **Quick Reference Commands**

```bash
# Location check
mcp_dataforseo_serp_locations(country_code="US")

# Keyword ideas (start here)
mcp_dataforseo_dataforseo_labs_google_keyword_ideas(
  keywords=["your", "seed", "keywords"],
  location_name="United States",
  language_code="en",
  limit=100
)

# Search volume analysis
mcp_dataforseo_keywords_data_google_ads_search_volume(
  keywords=["keyword1", "keyword2"],
  location_name="United States"
)

# Keyword difficulty
mcp_dataforseo_dataforseo_labs_bulk_keyword_difficulty(
  keywords=["keyword1", "keyword2"],
  location_name="United States",
  language_code="en"
)

# SERP analysis
mcp_dataforseo_serp_organic_live_advanced(
  keyword="target keyword",
  location_name="United States",
  language_code="en",
  depth=10
)
```

---

## 🚀 **Next Steps**

After completing this workflow:

1. **Content Strategy:** Map keywords to content topics and pages
2. **Technical SEO:** Ensure site can support target keywords
3. **Content Creation:** Develop content targeting priority keywords
4. **Monitoring:** Set up rank tracking for chosen keywords
5. **Iteration:** Repeat process monthly/quarterly for new opportunities

**Remember:** Keyword research is an ongoing process. Markets change, competition evolves, and new opportunities emerge regularly. Schedule regular keyword research sessions to stay competitive.

---

_Last updated: [Current Date]_
_Tools: DataForSEO MCP Integration_
