/*
# Add enquiry routing to the lead form

1. Changes
   - Add `enquiry_type` (text) to `demo_requests`. This distinguishes a SaaS product
     demo request ('product') from a technology consulting enquiry ('consulting'),
     so leads can be routed to the right team.
   - Defaults to 'product' so existing rows and product-only submissions stay valid.

2. Security
   - No RLS changes. Existing insert-only policy for anon/authenticated still applies.

3. Notes
   1. This is a purely additive column; no data is modified or removed.
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'demo_requests' AND column_name = 'enquiry_type'
  ) THEN
    ALTER TABLE demo_requests ADD COLUMN enquiry_type text NOT NULL DEFAULT 'product';
  END IF;
END $$;