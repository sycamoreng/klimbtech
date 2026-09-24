export interface ProductFeature {
  title: string
  description: string
  icon: string
}

export interface ProductUseCase {
  title: string
  description: string
}

export interface Product {
  slug: string
  name: string
  category: string
  oneLiner: string
  tagline: string
  description: string
  accent: string
  problem: string
  solution: string
  features: ProductFeature[]
  howItWorks: { step: string; title: string; description: string }[]
  useCases: ProductUseCase[]
  stats: { value: string; label: string }[]
  docsNote: string
}

export const products: Product[] = [
  {
    slug: 'pulse',
    name: 'Pulse',
    category: 'Customer Engagement / CRM',
    oneLiner: 'Understand every customer and act on it — engagement and CRM built for high-growth teams.',
    tagline: 'Customer engagement that keeps a pulse on every relationship.',
    description:
      'Pulse unifies customer data, campaigns, and lifecycle messaging into one platform so high-growth teams can engage the right customer at the right moment.',
    accent: 'brand',
    problem:
      'Growing teams juggle fragmented tools — a CRM here, a campaign tool there, spreadsheets everywhere. Customer signals get lost, onboarding stalls, and churn creeps up before anyone notices.',
    solution:
      'Pulse brings profiles, segmentation, journeys, and analytics into a single workspace. Every interaction updates a live customer view, and AI-assisted insights surface who needs attention next.',
    features: [
      {
        title: 'Unified customer profiles',
        description: 'A single, live view of every customer — activity, accounts, and history in one place.',
        icon: 'user',
      },
      {
        title: 'Segmentation & journeys',
        description: 'Build precise audiences and automate lifecycle journeys without writing code.',
        icon: 'flow',
      },
      {
        title: 'Multi-channel campaigns',
        description: 'Reach customers across email, in-app, and SMS from one campaign builder.',
        icon: 'megaphone',
      },
      {
        title: 'AI-assisted insights',
        description: 'Surface churn risk, upsell moments, and next-best actions automatically.',
        icon: 'spark',
      },
      {
        title: 'Real-time analytics',
        description: 'Track engagement, conversion, and retention with dashboards built for growth teams.',
        icon: 'chart',
      },
      {
        title: 'Secure by design',
        description: 'Role-based access, audit trails, and compliance controls suited to demanding, regulated industries.',
        icon: 'shield',
      },
    ],
    howItWorks: [
      {
        step: '01',
        title: 'Connect your data',
        description: 'Sync customer and product data through the API or prebuilt integrations.',
      },
      {
        step: '02',
        title: 'Segment & automate',
        description: 'Define audiences and lifecycle journeys that trigger on real customer behavior.',
      },
      {
        step: '03',
        title: 'Engage & measure',
        description: 'Launch campaigns across channels and watch results update in real time.',
      },
    ],
    useCases: [
      {
        title: 'Onboarding activation',
        description: 'Guide new customers through verification and first-value moments with timed journeys.',
      },
      {
        title: 'Retention & churn prevention',
        description: 'Detect at-risk accounts early and trigger win-back campaigns automatically.',
      },
      {
        title: 'Cross-sell & upsell',
        description: 'Spot the right moment to introduce new products to existing customers.',
      },
    ],
    stats: [
      { value: '360°', label: 'customer view' },
      { value: '3x', label: 'faster campaign launch' },
      { value: '99.9%', label: 'platform uptime' },
    ],
    docsNote: 'Developer docs and REST API reference available for Pulse.',
  },
  {
    slug: 'sendral',
    name: 'Sendral',
    category: 'Email Delivery / Transactional API',
    oneLiner: 'Transactional and email delivery infrastructure built for scale and deliverability.',
    tagline: 'Email that always arrives — transactional delivery at serious scale.',
    description:
      'Sendral is a developer-first email platform for transactional and high-volume sending, engineered for deliverability, reliability, and observability.',
    accent: 'brand',
    problem:
      'Password resets, statements, and alerts have to arrive — instantly and in the inbox. Homegrown email breaks under scale, lands in spam, and gives teams no visibility when it fails.',
    solution:
      'Sendral delivers transactional and marketing email through a simple API with reputation management, real-time event tracking, and infrastructure tuned for regulated, high-volume senders.',
    features: [
      {
        title: 'Transactional email API',
        description: 'Send with a single API call and sub-second latency, backed by robust SDKs.',
        icon: 'code',
      },
      {
        title: 'Deliverability engineering',
        description: 'Dedicated IPs, authentication, and reputation monitoring keep mail in the inbox.',
        icon: 'inbox',
      },
      {
        title: 'Real-time event tracking',
        description: 'Webhooks and dashboards for delivery, opens, clicks, bounces, and complaints.',
        icon: 'chart',
      },
      {
        title: 'Templates & versioning',
        description: 'Manage, test, and version email templates without redeploying your app.',
        icon: 'template',
      },
      {
        title: 'Scale & reliability',
        description: 'Elastic infrastructure that handles millions of messages with predictable performance.',
        icon: 'bolt',
      },
      {
        title: 'Compliance & security',
        description: 'Encryption in transit, audit logging, and controls built for regulated senders.',
        icon: 'shield',
      },
    ],
    howItWorks: [
      {
        step: '01',
        title: 'Integrate the API',
        description: 'Drop in an SDK or call the REST API and authenticate with a project key.',
      },
      {
        step: '02',
        title: 'Send & template',
        description: 'Fire transactional messages or manage reusable templates from the dashboard.',
      },
      {
        step: '03',
        title: 'Monitor & optimize',
        description: 'Track every event in real time and tune deliverability from live insights.',
      },
    ],
    useCases: [
      {
        title: 'Security & auth emails',
        description: 'Deliver password resets, OTPs, and login alerts instantly and reliably.',
      },
      {
        title: 'Statements & receipts',
        description: 'Send account statements, receipts, and confirmations at high volume.',
      },
      {
        title: 'Alerts & notifications',
        description: 'Power real-time transaction alerts and compliance notifications at scale.',
      },
    ],
    stats: [
      { value: '99.99%', label: 'delivery uptime' },
      { value: '<1s', label: 'median send latency' },
      { value: 'Billions', label: 'of emails delivered' },
    ],
    docsNote: 'Full API reference, SDKs, and webhook docs available for Sendral.',
  },
]

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

// Pulse and Sendral are not ready for public release yet. Flip this to `true`
// to reveal the products across the site (nav, footer, homepage, products
// pages, contact form, and sitemap) without touching any other code.
export const PRODUCTS_PUBLIC = false

// The only list public-facing pages should read from. Empty while products
// are unreleased, so nothing about them is exposed.
export const publicProducts: Product[] = PRODUCTS_PUBLIC ? products : []

