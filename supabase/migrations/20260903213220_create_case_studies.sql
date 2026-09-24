/*
# Case studies (portfolio) content

1. New Tables
   - `case_studies` — editable portfolio/case-study entries shown in the Work section.
     - `id` (uuid, primary key)
     - `slug` (text, unique) — URL identifier
     - `title` (text) — case study headline
     - `client` (text) — client / company name
     - `industry` (text) — sector label
     - `service` (text) — which Klimb offering it relates to (Pulse, Sendral, Consulting)
     - `summary` (text) — short blurb for cards
     - `challenge` (text) — the problem
     - `solution` (text) — what Klimb did
     - `results` (text) — the outcome narrative
     - `metrics` (jsonb) — array of { value, label } headline results
     - `accent` (text) — optional color hint
     - `sort_order` (int) — manual ordering (lower first)
     - `published` (boolean) — visibility flag
     - `created_at` (timestamptz)

2. Security
   - Enable RLS on `case_studies`.
   - Public marketing content: anon + authenticated may SELECT only published rows.
   - No INSERT/UPDATE/DELETE policies are defined, so the table is read-only to all
     Data API clients; edits happen via privileged tooling only.

3. Notes
   1. Seed rows are inserted for immediate content. Insert is idempotent via slug guard.
*/

CREATE TABLE IF NOT EXISTS case_studies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  client text NOT NULL DEFAULT '',
  industry text NOT NULL DEFAULT '',
  service text NOT NULL DEFAULT '',
  summary text NOT NULL DEFAULT '',
  challenge text NOT NULL DEFAULT '',
  solution text NOT NULL DEFAULT '',
  results text NOT NULL DEFAULT '',
  metrics jsonb NOT NULL DEFAULT '[]'::jsonb,
  accent text NOT NULL DEFAULT 'brand',
  sort_order int NOT NULL DEFAULT 0,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_published_case_studies" ON case_studies;
CREATE POLICY "public_read_published_case_studies" ON case_studies FOR SELECT
  TO anon, authenticated USING (published = true);

CREATE INDEX IF NOT EXISTS case_studies_sort_idx ON case_studies (sort_order, created_at);

INSERT INTO case_studies (slug, title, client, industry, service, summary, challenge, solution, results, metrics, sort_order)
SELECT * FROM (VALUES
  (
    'northwind-onboarding',
    'Turning sign-ups into activated customers',
    'Northwind',
    'Digital banking',
    'Pulse',
    'We helped a fast-growing neobank rebuild onboarding around live customer signals, lifting activation and cutting early churn.',
    'Northwind was acquiring users quickly but losing them before first value. Onboarding was fragmented across tools, and the team had no single view of where customers dropped off.',
    'Using Pulse, we unified customer profiles and built lifecycle journeys triggered by real behaviour — guiding new customers through verification and their first meaningful action.',
    'Within a quarter, activation climbed sharply and early churn fell as at-risk customers were re-engaged automatically.',
    '[{"value":"42%","label":"higher activation"},{"value":"28%","label":"less early churn"},{"value":"3x","label":"faster journeys"}]'::jsonb,
    1
  ),
  (
    'meridian-deliverability',
    'Making critical email a solved problem',
    'Meridian',
    'Payments',
    'Sendral',
    'A payments platform moved its transactional email to Sendral and turned deliverability from a constant worry into a non-issue.',
    'Password resets and payment alerts were landing in spam or arriving late, generating support tickets and eroding trust at exactly the wrong moments.',
    'We migrated Meridian to Sendral with dedicated IPs, proper authentication, and real-time event tracking — giving the team full visibility into every message.',
    'Deliverability stabilised near-perfect, latency dropped below a second, and email-related support tickets all but disappeared.',
    '[{"value":"99.99%","label":"inbox delivery"},{"value":"<1s","label":"median latency"},{"value":"-90%","label":"email tickets"}]'::jsonb,
    2
  ),
  (
    'vantage-tech-assessment',
    'A clear roadmap before a major raise',
    'Vantage',
    'Lending',
    'Consulting',
    'Ahead of a funding round, we gave a lending startup an independent read on its architecture, team, and delivery.',
    'Vantage''s leadership needed to know whether their technology could scale — and where the real risks were — before committing to an aggressive growth plan.',
    'Our consulting team ran a structured evaluation of the stack, assessed the engineering team, and mapped the gaps, then delivered a prioritised roadmap.',
    'Vantage entered its raise with a credible technical story and a clear plan, and implemented the highest-priority fixes within weeks.',
    '[{"value":"6 wks","label":"to a clear plan"},{"value":"18","label":"risks surfaced"},{"value":"100%","label":"of P0s resolved"}]'::jsonb,
    3
  ),
  (
    'lattice-scale',
    'Scaling engagement without scaling headcount',
    'Lattice',
    'Wealth tech',
    'Pulse',
    'A wealth platform used Pulse to run sophisticated, personalised customer journeys with a small team.',
    'Lattice wanted enterprise-grade engagement but had a lean team and no appetite for a sprawling martech stack.',
    'Pulse gave them segmentation, multi-channel campaigns, and analytics in one place, so a small team could operate like a much larger one.',
    'The team launched campaigns in a fraction of the time and grew engaged accounts steadily quarter over quarter.',
    '[{"value":"3x","label":"faster launches"},{"value":"+35%","label":"engaged accounts"},{"value":"1","label":"platform, not five"}]'::jsonb,
    4
  )
) AS v(slug, title, client, industry, service, summary, challenge, solution, results, metrics, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM case_studies cs WHERE cs.slug = v.slug);