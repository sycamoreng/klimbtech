-- Remove unreleased product names (Pulse, Sendral) from seeded case studies.
-- Runs after the original seed so both existing and fresh databases stay clean.

UPDATE case_studies SET
  service = 'Customer Engagement',
  solution = 'We unified customer profiles and built lifecycle journeys triggered by real behaviour — guiding new customers through verification and their first meaningful action.'
WHERE slug = 'northwind-onboarding';

UPDATE case_studies SET
  service = 'Email Delivery',
  summary = 'A payments platform moved its transactional email onto our infrastructure and turned deliverability from a constant worry into a non-issue.',
  solution = 'We migrated Meridian onto dedicated IPs, proper authentication, and real-time event tracking — giving the team full visibility into every message.'
WHERE slug = 'meridian-deliverability';

UPDATE case_studies SET
  service = 'Customer Engagement',
  summary = 'A wealth platform ran sophisticated, personalised customer journeys with a small team.',
  solution = 'We gave them segmentation, multi-channel campaigns, and analytics in one place, so a small team could operate like a much larger one.'
WHERE slug = 'lattice-scale';
