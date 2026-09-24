import { publicProducts } from '~/utils/products'
import { blogPosts } from '~/utils/blog'
import { createClient } from '@supabase/supabase-js'

const STATIC_ROUTES = [
  '/',
  '/products',
  '/consulting',
  '/work',
  '/blog',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
]

async function caseStudyPaths(): Promise<string[]> {
  const url = process.env.VITE_SUPABASE_URL
  const key = process.env.VITE_SUPABASE_ANON_KEY
  if (!url || !key) return []
  try {
    const supabase = createClient(url, key)
    const { data, error } = await supabase
      .from('case_studies')
      .select('slug')
      .eq('published', true)
    if (error || !data) return []
    return data.map((row) => `/work/${row.slug}`)
  } catch {
    return []
  }
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const base = (config.public.siteUrl as string).replace(/\/$/, '')

  const paths = [
    ...STATIC_ROUTES,
    ...publicProducts.map((p) => `/products/${p.slug}`),
    ...blogPosts.map((b) => `/blog/${b.slug}`),
    ...(await caseStudyPaths()),
  ]

  const urls = paths
    .map((path) => `  <url>\n    <loc>${base}${path}</loc>\n  </url>`)
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`

  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  return xml
})
