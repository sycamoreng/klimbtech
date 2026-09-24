export interface CaseMetric {
  value: string
  label: string
}

export interface CaseStudy {
  id: string
  slug: string
  title: string
  client: string
  industry: string
  service: string
  summary: string
  challenge: string
  solution: string
  results: string
  metrics: CaseMetric[]
  accent: string
  sort_order: number
}

const CASE_FIELDS =
  'id, slug, title, client, industry, service, summary, challenge, solution, results, metrics, accent, sort_order'

export function useCaseStudies() {
  return useAsyncData<CaseStudy[]>('case-studies', async () => {
    const supabase = useSupabase()
    const { data, error } = await supabase
      .from('case_studies')
      .select(CASE_FIELDS)
      .eq('published', true)
      .order('sort_order', { ascending: true })
    if (error) throw error
    return (data ?? []) as CaseStudy[]
  })
}

export function useCaseStudy(slug: string) {
  return useAsyncData<CaseStudy | null>(`case-study-${slug}`, async () => {
    const supabase = useSupabase()
    const { data, error } = await supabase
      .from('case_studies')
      .select(CASE_FIELDS)
      .eq('slug', slug)
      .eq('published', true)
      .maybeSingle()
    if (error) throw error
    return (data as CaseStudy) ?? null
  })
}
