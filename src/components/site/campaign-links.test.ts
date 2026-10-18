import assert from "node:assert/strict";
import { test } from "node:test";
import { withCampaignTracking } from "./campaign-links";
import { fitCheckAssessmentUrl } from "./nav-config";

test("an ad visitor keeps campaign tags and Meta click ID through another page into the assessment", () => {
  const landing = "/fit-check?utm_source=meta&utm_medium=paid_social&utm_campaign=launch&utm_content=ad05a&fbclid=click-123";
  const about = withCampaignTracking("/about#founder", landing);
  assert.equal(about, "/about?utm_source=meta&utm_medium=paid_social&utm_campaign=launch&utm_content=ad05a&fbclid=click-123#founder");
  const assessment = new URL(withCampaignTracking(fitCheckAssessmentUrl, about));
  assert.equal(assessment.origin + assessment.pathname, fitCheckAssessmentUrl);
  assert.deepEqual(Object.fromEntries(assessment.searchParams), {
    utm_source: "meta", utm_medium: "paid_social", utm_campaign: "launch",
    utm_content: "ad05a", fbclid: "click-123",
  });
});

test("does not copy unrelated or sensitive parameters into the assessment", () => {
  const destination = new URL(withCampaignTracking(fitCheckAssessmentUrl,
    "/fit-check?email=person%40example.com&token=secret&next=https%3A%2F%2Fevil.test&utm_content=receipt%20%26%20quotes"));
  assert.deepEqual(Object.fromEntries(destination.searchParams), { utm_content: "receipt & quotes" });
});

test("preserves destination query, anchors and explicit attribution", () => {
  const href = `${fitCheckAssessmentUrl}?mode=preview&utm_source=existing#start`;
  const destination = new URL(withCampaignTracking(href, "/fit-check?utm_source=meta&utm_campaign=launch"));
  assert.equal(destination.searchParams.get("mode"), "preview");
  assert.equal(destination.searchParams.get("utm_source"), "existing");
  assert.equal(destination.searchParams.get("utm_campaign"), "launch");
  assert.equal(destination.hash, "#start");
});

test("leaves organic visits, anchors and unrelated destinations unchanged", () => {
  for (const href of ["#final", "mailto:hello@example.com", "https://calendly.com/example", "//outside.example/path", "https://www.consultkit.ai/another/assessment"]) {
    assert.equal(withCampaignTracking(href, "/fit-check?utm_source=meta&fbclid=123"), href);
  }
  assert.equal(withCampaignTracking(fitCheckAssessmentUrl, "/fit-check"), fitCheckAssessmentUrl);
  assert.equal(withCampaignTracking(fitCheckAssessmentUrl, ""), fitCheckAssessmentUrl);
});
