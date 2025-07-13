# Landing Page Generation Prompt Template

## Overview
This template contains all the variables needed to generate a complete landing page. Replace the placeholders in curly braces `{VARIABLE}` with your actual values, then provide the filled prompt to Claude.

---

## Master Prompt Template

```
Generate a complete landing page for DeployAI with the following specifications:

## Basic Information
- **Location**: {LOCATION_NAME} (e.g., "Dubai", "Abu Dhabi", "Sharjah")
- **Service**: {SERVICE_NAME} (e.g., "Custom Software Development", "AI Solutions", "Web Development")
- **Industry** (optional): {INDUSTRY_NAME} (e.g., "Real Estate", "Healthcare", "Fintech")
- **Service Variant**: {VARIANT} (e.g., "customSoftware", "ai", "webapp", "automation")

## SEO & Metadata
- **Page Title**: {PAGE_TITLE} (60 chars max, e.g., "Custom Software Development Dubai | DeployAI")
- **Meta Description**: {META_DESCRIPTION} (160 chars max, e.g., "Leading custom software development in Dubai. Build powerful solutions that eliminate SaaS costs. 100% ownership, 30-day delivery.")
- **Keywords**: {KEYWORDS} (comma-separated, e.g., "custom software dubai, software development uae, dubai tech solutions")
- **Canonical URL**: {CANONICAL_URL} (e.g., "https://deployai.com/custom-software-development-dubai")

## Target Audience & Value Proposition
- **Target Audience**: {TARGET_AUDIENCE} (e.g., "SMEs in Dubai looking to replace expensive SaaS subscriptions")
- **Main Value Proposition**: {VALUE_PROPOSITION} (e.g., "Own your software forever - no monthly fees, 100% customized for your business")
- **Urgency Factor**: {URGENCY} (e.g., "Limited slots available this month", "Special pricing for Q1 2024")

## Business Context
- **Location Business Context**: {BUSINESS_CONTEXT} (e.g., "Dubai's thriving business ecosystem demands innovative technology solutions...")
- **Market Insights**: 
  1. {MARKET_INSIGHT_1} (e.g., "73% of Dubai businesses plan to increase tech spending in 2024")
  2. {MARKET_INSIGHT_2} (e.g., "Dubai's Vision 2071 positions the city as a global tech hub")
  3. {MARKET_INSIGHT_3} (e.g., "Free zones offer 100% foreign ownership for tech companies")

## Pain Points & Solutions
- **Customer Pain Points**:
  1. {PAIN_POINT_1} (e.g., "Paying $2,000+/month for software that only solves 60% of needs")
  2. {PAIN_POINT_2} (e.g., "Generic software forcing you to change your business processes")
  3. {PAIN_POINT_3} (e.g., "No control over features, updates, or data")
  4. {PAIN_POINT_4} (e.g., "Multiple disconnected tools creating data silos")

- **Your Solutions**:
  1. {SOLUTION_1} (e.g., "One-time payment for software built exactly for your workflows")
  2. {SOLUTION_2} (e.g., "Custom features that match your business processes perfectly")
  3. {SOLUTION_3} (e.g., "100% ownership - your code, your data, your control")
  4. {SOLUTION_4} (e.g., "Integrated solution replacing 5-12 separate tools")

## Service Details
- **Key Features**:
  1. {FEATURE_1} (e.g., "Custom business logic and automated workflows")
  2. {FEATURE_2} (e.g., "Real-time analytics and reporting dashboards")
  3. {FEATURE_3} (e.g., "Mobile-responsive design for field teams")
  4. {FEATURE_4} (e.g., "API integrations with existing systems")
  5. {FEATURE_5} (e.g., "24/7 monitoring and support")

- **Tech Stack**: {TECH_STACK} (e.g., "React, Node.js, PostgreSQL, AWS, Docker")
- **Delivery Timeline**: {TIMELINE} (e.g., "MVP in 2 weeks, full deployment in 30 days")

## Pricing Information
- **Starting Price**: {STARTING_PRICE} {CURRENCY} (e.g., "15,000 AED")
- **Pricing Model**: {PRICING_MODEL} (e.g., "One-time fixed cost", "Monthly subscription")
- **Payment Terms**: {PAYMENT_TERMS} (e.g., "50% upfront, 50% on delivery")
- **ROI Promise**: {ROI_PROMISE} (e.g., "Save $24,000/year on SaaS subscriptions")

## Social Proof
- **Client Testimonial 1**: 
  - Quote: "{TESTIMONIAL_1_QUOTE}"
  - Author: {TESTIMONIAL_1_AUTHOR}
  - Company: {TESTIMONIAL_1_COMPANY}
  - Result: {TESTIMONIAL_1_RESULT}

- **Client Testimonial 2**: 
  - Quote: "{TESTIMONIAL_2_QUOTE}"
  - Author: {TESTIMONIAL_2_AUTHOR}
  - Company: {TESTIMONIAL_2_COMPANY}
  - Result: {TESTIMONIAL_2_RESULT}

- **Case Study Highlight**: {CASE_STUDY} (e.g., "JB Luxury Detailing: 85% reduction in booking time, 3x revenue growth")

## Call-to-Action
- **Primary CTA Text**: {PRIMARY_CTA} (e.g., "Book Your Free Strategy Call")
- **Secondary CTA Text**: {SECONDARY_CTA} (e.g., "See How It Works")
- **Calendly URL**: {CALENDLY_URL} (e.g., "https://calendly.com/hello-deployai/30min")

## Contact Information
- **Phone**: {PHONE} (e.g., "+971 4 XXX XXXX")
- **Email**: {EMAIL} (e.g., "hello@deployai.studio")
- **Address**: {ADDRESS} (e.g., "Dubai Internet City, Dubai, UAE")
- **Business Hours**: {HOURS} (e.g., "Sunday-Thursday 9AM-6PM GST")

## Additional Specifications
- **Competitor Differentiation**: {COMPETITOR_DIFF} (e.g., "Unlike Zoho or Salesforce, you own the code forever")
- **Industry Compliance**: {COMPLIANCE} (e.g., "GDPR compliant, UAE data residency")
- **Support Offerings**: {SUPPORT} (e.g., "24/7 technical support, weekly training sessions")
- **Guarantee**: {GUARANTEE} (e.g., "30-day money-back guarantee if not satisfied")

## Analytics & Tracking
- **Google Analytics ID**: {GA_ID} (optional, e.g., "G-XXXXXXXXXX")
- **Facebook Pixel ID**: {FB_PIXEL} (optional, e.g., "XXXXXXXXXXXXXXX")
- **Conversion Event**: {CONVERSION_EVENT} (e.g., "schedule_meeting")

Please generate a complete landing page with all sections properly configured, maintaining the professional tone and conversion-focused copy style of DeployAI.
```

---

## How to Use This Template

1. **Copy the template** above
2. **Replace all placeholders** in curly braces with your actual values
3. **Remove any optional sections** you don't need
4. **Provide to Claude** with any additional specific requirements
5. **Review and refine** the generated output

## Example Filled Template

Here's a partial example with real values:

```
Generate a complete landing page for DeployAI with the following specifications:

## Basic Information
- **Location**: Dubai
- **Service**: Custom Software Development
- **Industry**: Real Estate
- **Service Variant**: customSoftware

## SEO & Metadata
- **Page Title**: Custom Software Development for Real Estate Dubai | DeployAI
- **Meta Description**: Build custom real estate software in Dubai. Replace expensive property management tools with solutions you own. 30-day delivery.
- **Keywords**: custom software dubai, real estate software dubai, property management software uae
...
```

## Variable Reference Guide

### Location Options
- Dubai
- Abu Dhabi
- Sharjah
- UAE (general)

### Service Variants
- `customSoftware` - Custom software development
- `ai` - AI automation solutions
- `webapp` - Web application development
- `automation` - Business process automation
- `inventory` - Inventory management systems
- `saas` - SaaS replacement solutions
- `mobile` - Mobile app development
- `ecommerce` - E-commerce platforms

### Industry Options
- Real Estate
- Healthcare
- Fintech
- Logistics
- Education
- Hospitality
- Retail
- Manufacturing

### Currency Options
- AED (UAE Dirham)
- USD (US Dollar)
- EUR (Euro)
- GBP (British Pound)

---

## Tips for Best Results

1. **Be specific** with pain points and solutions - use real numbers and scenarios
2. **Include local context** - mention specific regulations, market conditions, or cultural factors
3. **Use compelling testimonials** - include specific results and metrics
4. **Keep SEO in mind** - use location + service combinations naturally
5. **Maintain consistency** - ensure all sections align with your main value proposition

## Need Help?

- Review existing examples at `/templates/*`
- Check the [Template System Documentation](./TEMPLATE_SYSTEM.md)
- Contact: dev@deployai.com