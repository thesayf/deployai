## DataForSEO Tools Available
#  This document translates ahrefs on-page landing page development from keyword research to content production. It can be followed by an AI agent with access to data_for_seo tools. It uses these tools in place of the AHREFS recommended tools to complete its task

### **Keyword Research Tools:**
- `keywords_data_google_ads_search_volume` - Get search volume data from Google Ads
- `dataforseo_labs_google_keyword_ideas` - Generate keyword ideas for up to 200 seed keywords  
- `dataforseo_labs_google_related_keywords` - Find "searches related to" keywords
- `dataforseo_labs_google_keyword_suggestions` - Find search queries containing seed keywords
- `dataforseo_labs_google_keyword_overview` - Get comprehensive keyword data (volume, CPC, competition)
- `dataforseo_labs_search_intent` - Analyze search intent for up to 1000 keywords
- `dataforseo_labs_bulk_keyword_difficulty` - Get keyword difficulty for up to 1000 keywords

### **SERP Analysis Tools:**
- `serp_organic_live_advanced` - Get organic search results for keywords
- `dataforseo_labs_google_historical_serp` - Historical SERP data over time
- `dataforseo_labs_google_serp_competitors` - Domains ranking for specified keywords

### **Competitor Analysis Tools:**
- `dataforseo_labs_google_ranked_keywords` - Keywords any domain/webpage ranks for
- `dataforseo_labs_google_competitors_domain` - Find competitor domains 
- `dataforseo_labs_google_domain_rank_overview` - Domain ranking and traffic data
- `dataforseo_labs_google_keywords_for_site` - Keywords relevant to target domain
- `dataforseo_labs_google_domain_intersection` - Keywords both domains rank for

### **Content Analysis Tools:**
- `on_page_content_parsing` - Parse content structure of any page
- `on_page_instant_pages` - Get detailed page SEO analysis

---

# DataForSEO New Page Creation Guide

## PHASE 1: SEED KEYWORD GENERATION

### Step 1: Generate Initial Keyword Ideas
**Tool:** `dataforseo_labs_google_keyword_ideas`
**Process:**
```
Input: ["custom software development", "MVP development", "AI automation"]
Parameters: language_code="en", location_name="United Arab Emirates"
```
**Action:** Export 50-100 keyword ideas with search volume and difficulty data

### Step 2: Expand with Related Keywords  
**Tool:** `dataforseo_labs_google_related_keywords`
**Process:**
```
For each high-potential seed keyword:
Input: keyword="custom software development"
Parameters: depth=2, language_code="en", location_name="United Arab Emirates"
```
**Action:** Collect "searches related to" variations

### Step 3: Get Keyword Suggestions
**Tool:** `dataforseo_labs_google_keyword_suggestions`
**Process:**
```
Input: keyword="MVP development dubai"
Parameters: language_code="en", location_name="United Arab Emirates"
```
**Action:** Find long-tail keyword variations containing your seeds

## PHASE 2: KEYWORD VALIDATION & SELECTION

### Step 4: Get Comprehensive Keyword Data
**Tool:** `dataforseo_labs_google_keyword_overview`
**Process:**
```
Input: [list of 50-100 keywords from previous steps]
Parameters: language_code="en", location_name="United Arab Emirates"
```
**Validation Criteria:**
- Search volume: 100+ monthly searches
- Competition level: Low to Medium preferred
- CPC: $2+ indicates commercial intent

### Step 5: Analyze Search Intent
**Tool:** `dataforseo_labs_search_intent`
**Process:**
```
Input: [filtered keyword list from Step 4]
```
**Filter for:** Commercial and Transactional intent keywords only

### Step 6: Check Keyword Difficulty
**Tool:** `dataforseo_labs_bulk_keyword_difficulty`
**Process:**
```
Input: [final keyword shortlist]
Parameters: language_code="en", location_name="United Arab Emirates"
```
**Select:** Keywords with difficulty score matching your domain authority

## PHASE 3: SERP & COMPETITOR ANALYSIS

### Step 7: Analyze Current SERP Results
**Tool:** `serp_organic_live_advanced`
**Process:**
```
For each target keyword:
Input: keyword="custom software development dubai"
Parameters: language_code="en", location_name="Dubai,United Arab Emirates", depth=10
```
**Analyze:**
- Content types ranking (product pages vs blog posts)
- Search intent patterns
- Competitor strategies

### Step 8: Identify SERP Competitors
**Tool:** `dataforseo_labs_google_serp_competitors`
**Process:**
```
Input: keywords=[your target keyword list]
Parameters: language_code="en", location_name="United Arab Emirates"
```
**Action:** Identify top 5-10 domains consistently ranking

### Step 9: Analyze Competitor Content
**Tool:** `on_page_content_parsing`
**Process:**
```
For each top-ranking competitor URL:
Input: url="competitor-landing-page-url"
Parameters: enable_javascript=true
```
**Extract:**
- Content structure and headings
- Page length and format
- Key topics covered

## PHASE 4: CONTENT STRATEGY DEVELOPMENT

### Step 10: Competitor Keyword Gap Analysis
**Tool:** `dataforseo_labs_google_ranked_keywords`
**Process:**
```
For each main competitor:
Input: target="competitor-domain.com"
Parameters: language_code="en", location_name="United Arab Emirates"
Filters: Search volume >100, Commercial intent
```
**Identify:** Keywords competitors rank for that you could target

### Step 11: Content Format Decision
**Based on SERP analysis from Step 7:**
- If product pages dominate → Create service/product landing page
- If blog posts dominate → Create detailed guide/comparison content  
- If mixed → Test both approaches

### Step 12: Content Outline Creation
**Structure based on top-ranking competitors:**
- Problem acknowledgment (first 100 words)
- Solution presentation (your service/product)
- Feature/benefit breakdown
- Social proof section
- Clear conversion CTA

## PHASE 5: PAGE OPTIMIZATION

### Step 13: SEO Element Optimization
**From content analysis in Step 9:**
- **Title Tag:** Target keyword + compelling modifier (under 60 chars)
- **Meta Description:** Include keyword + CTA (under 160 chars)  
- **H1:** Include exact target keyword
- **URL:** /target-keyword format
- **First 100 words:** Natural keyword inclusion

### Step 14: Content Creation
**Guidelines:**
- Address search intent identified in Step 5
- Match content format from Step 11
- Include topics found in competitor analysis (Step 9)
- Optimize for target keyword naturally (1-2% density)
- Add 3-5 internal links to related pages

### Step 15: Technical Validation
**Tool:** `on_page_instant_pages`
**Process:**
```
Input: url="your-new-page-url"
```
**Check:**
- Page speed optimization
- Mobile responsiveness  
- SEO element implementation
- Technical SEO issues

## PHASE 6: MONITORING & ITERATION

### Step 16: Track Rankings
**Tool:** `serp_organic_live_advanced`
**Process:**
```
Weekly check:
Input: keyword="your-target-keyword"
Parameters: location_name="Dubai,United Arab Emirates"
```
**Monitor:** Your page position for target keywords

### Step 17: Content Gap Updates
**Tool:** `dataforseo_labs_google_ranked_keywords`
**Process:**
```
Monthly check your own domain:
Input: target="your-domain.com"
```
**Identify:** New keyword opportunities and content gaps

---

## Quick Implementation Checklist Per Page:

**Research Phase (30 minutes):**
- [ ] Generate keyword ideas with `keyword_ideas` tool
- [ ] Validate with `keyword_overview` for volume/competition
- [ ] Check search intent with `search_intent` tool
- [ ] Analyze SERP with `serp_organic_live_advanced`

**Analysis Phase (30 minutes):**
- [ ] Parse competitor content with `on_page_content_parsing`
- [ ] Identify competitor keywords with `ranked_keywords`
- [ ] Determine content format based on SERP analysis

**Creation Phase (60-90 minutes):**
- [ ] Write content matching search intent and competitor analysis
- [ ] Optimize title, meta, H1 with target keyword
- [ ] Add 3-5 internal links
- [ ] Include clear conversion CTA

**Validation Phase (15 minutes):**
- [ ] Check technical implementation with `on_page_instant_pages`
- [ ] Verify mobile optimization
- [ ] Confirm page speed

This guide provides a systematic approach using only DataForSEO tools to research, analyze, create, and optimize new pages for bottom-of-funnel keywords.