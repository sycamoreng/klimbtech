/*
# Klimb marketing site: lead capture tables

1. New Tables
   - `demo_requests` — stores "Request a demo" / contact form submissions.
     - `id` (uuid, primary key)
     - `name` (text, not null) — submitter's name
     - `work_email` (text, not null) — business email
     - `company` (text) — company name
     - `product_interest` (text) — which product they care about
     - `message` (text) — free-form message
     - `created_at` (timestamptz) — submission time
   - `newsletter_subscribers` — stores footer newsletter email captures.
     - `id` (uuid, primary key)
     - `email` (text, unique, not null)
     - `created_at` (timestamptz)

2. Security
   - Enable RLS on both tables.
   - This is a public no-auth marketing site: the anon-key client must be able to
     INSERT submissions. Anonymous visitors can submit (INSERT) but CANNOT read,
     update, or delete any rows, protecting captured leads from public exposure.

3. Notes
   1. No SELECT policy is added intentionally so lead data is never publicly readable.
   2. `newsletter_subscribers.email` is unique to avoid duplicate signups.
*/

CREATE TABLE IF NOT EXISTS demo_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  work_email text NOT NULL,
  company text DEFAULT '',
  product_interest text DEFAULT '',
  message text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE demo_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_demo_requests" ON demo_requests;
CREATE POLICY "anon_insert_demo_requests" ON demo_requests FOR INSERT
  TO anon, authenticated WITH CHECK (true);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_newsletter" ON newsletter_subscribers;
CREATE POLICY "anon_insert_newsletter" ON newsletter_subscribers FOR INSERT
  TO anon, authenticated WITH CHECK (true);