import { fitCheckAssessmentUrl } from "./nav-config";

const CAMPAIGN_PARAMETERS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "utm_id",
  "fbclid",
] as const;

const SITE_ORIGIN = "https://www.deployai.studio";

// Carry only ad attribution, never arbitrary query parameters, through the
// marketing site and into our assessment. Other external links stay untouched.
export function withCampaignTracking(href: string, sourcePath: string): string {
  const internal = href.startsWith("/") && !href.startsWith("//");
  const assessment = href.split(/[?#]/, 1)[0] === fitCheckAssessmentUrl;
  if (!sourcePath || (!internal && !assessment)) return href;

  const source = new URL(sourcePath, SITE_ORIGIN);
  const destination = new URL(href, SITE_ORIGIN);
  let changed = false;

  for (const key of CAMPAIGN_PARAMETERS) {
    const value = source.searchParams.get(key);
    if (value && !destination.searchParams.has(key)) {
      destination.searchParams.set(key, value);
      changed = true;
    }
  }

  if (!changed) return href;
  return internal
    ? `${destination.pathname}${destination.search}${destination.hash}`
    : destination.toString();
}
