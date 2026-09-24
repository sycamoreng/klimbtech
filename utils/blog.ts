export interface BlogAuthor {
  name: string
  role: string
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: string
  coverImage: string
  author: BlogAuthor
  publishedAt: string
  readingMinutes: number
  /** Article body as an ordered list of blocks, kept source-agnostic so a
   *  headless CMS can map onto the same shape when it replaces this data. */
  body: BlogBlock[]
}

export type BlogBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'quote'; text: string; attribution?: string }
  | { type: 'list'; items: string[] }

export const blogPosts: BlogPost[] = [
  {
    slug: 'building-email-that-actually-lands',
    title: 'Building email that actually lands: a deliverability primer',
    excerpt:
      'Great product emails are worthless if they never reach the inbox. Here is how we think about deliverability at Klimb, and the levers that matter most.',
    category: 'Product',
    coverImage:
      'https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=1600',
    author: { name: 'Priya Raman', role: 'Product Lead' },
    publishedAt: '2026-08-28',
    readingMinutes: 6,
    body: [
      {
        type: 'paragraph',
        text: 'Every team we talk to obsesses over open rates, but almost none of them measure the one thing that gates every other metric: whether the message reached the inbox at all. Deliverability is invisible until it breaks, and by then you have already lost trust with both your users and the mailbox providers.',
      },
      { type: 'heading', text: 'Authentication is the price of entry' },
      {
        type: 'paragraph',
        text: 'SPF, DKIM, and DMARC are not optional in 2026. Mailbox providers treat unauthenticated mail as guilty until proven innocent. Getting these three aligned is the single highest-leverage change most teams can make in an afternoon.',
      },
      {
        type: 'list',
        items: [
          'SPF tells receivers which servers may send on your behalf.',
          'DKIM cryptographically signs each message so it cannot be forged.',
          'DMARC ties the two together and tells receivers what to do on failure.',
        ],
      },
      { type: 'heading', text: 'Reputation is earned slowly, lost quickly' },
      {
        type: 'paragraph',
        text: 'New sending domains start with no reputation. Ramp volume gradually, keep complaint rates low, and prune unengaged recipients aggressively. One bad send to a stale list can undo months of careful warming.',
      },
      {
        type: 'quote',
        text: 'Deliverability is not a feature you ship once. It is a relationship you maintain with every mailbox provider, every day.',
        attribution: 'Priya Raman',
      },
      {
        type: 'paragraph',
        text: 'Inside our email platform we surface these signals in real time, so the moment a domain drifts you know before your customers do. That early warning is often the difference between a quiet fix and a painful incident.',
      },
    ],
  },
  {
    slug: 'when-to-hire-a-fractional-cto',
    title: 'When to hire a fractional CTO (and when not to)',
    excerpt:
      'Not every early-stage company needs a full-time technology leader. Here is a practical framework for deciding what technical leadership you actually need.',
    category: 'Consulting',
    coverImage:
      'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1600',
    author: { name: 'Marcus Fenn', role: 'Principal Consultant' },
    publishedAt: '2026-08-14',
    readingMinutes: 5,
    body: [
      {
        type: 'paragraph',
        text: 'Founders often reach for a full-time CTO the moment engineering feels hard. Sometimes that is right. Just as often, what they need is a sharper problem definition and a few months of experienced guidance, not a permanent hire and a large equity grant.',
      },
      { type: 'heading', text: 'Signs you need permanent leadership' },
      {
        type: 'list',
        items: [
          'Technology is your core differentiator, not a supporting function.',
          'You are scaling a team of engineers faster than anyone can mentor them.',
          'The roadmap demands deep, ongoing architectural ownership.',
        ],
      },
      { type: 'heading', text: 'Signs a fractional engagement fits better' },
      {
        type: 'paragraph',
        text: 'If your questions are bounded — is this architecture sound, is this hire strong, is this vendor the right call — a fractional or advisory engagement gives you senior judgment without the overhead. You get the answer, put the structure in place, and keep your equity.',
      },
      {
        type: 'quote',
        text: 'The goal of good technical advice is to make itself unnecessary. If your advisor is indispensable after a year, something has gone wrong.',
        attribution: 'Marcus Fenn',
      },
    ],
  },
  {
    slug: 'reading-your-product-analytics-honestly',
    title: 'Reading your product analytics honestly',
    excerpt:
      'Dashboards are easy to build and easy to fool yourself with. A short guide to asking better questions of your product data.',
    category: 'Engineering',
    coverImage:
      'https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=1600',
    author: { name: 'Dana Okoro', role: 'Engineering Lead' },
    publishedAt: '2026-07-30',
    readingMinutes: 7,
    body: [
      {
        type: 'paragraph',
        text: 'A dashboard full of green numbers feels like progress. But analytics only earn their keep when they change a decision. If a chart cannot alter what you do next week, it is decoration.',
      },
      { type: 'heading', text: 'Start from the decision, not the metric' },
      {
        type: 'paragraph',
        text: 'Before adding a chart, write down the decision it informs and the threshold that would change your mind. Metrics without a decision attached quietly accumulate until nobody trusts the dashboard at all.',
      },
      { type: 'heading', text: 'Beware the averages' },
      {
        type: 'paragraph',
        text: 'Averages hide the customers who are struggling and the ones who love you. Distributions and cohorts tell the truth. We default to cohort views for exactly this reason: the median user is a fiction you should not design for.',
      },
      {
        type: 'list',
        items: [
          'Segment before you celebrate — a rising average can mask churn at the edges.',
          'Watch leading indicators, not just outcomes you cannot influence.',
          'Instrument the funnel, not just the finish line.',
        ],
      },
    ],
  },
]

export function formatBlogDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
