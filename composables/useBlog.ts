import { blogPosts, type BlogPost } from '~/utils/blog'

// Single data layer for the blog. Today it returns bundled dummy posts; when a
// headless blog service is connected, swap the bodies of these two functions to
// fetch from its API — the pages consuming them do not change.

export function useBlogPosts() {
  return useAsyncData<BlogPost[]>('blog-posts', async () => {
    return [...blogPosts].sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
  })
}

export function useBlogPost(slug: string) {
  return useAsyncData<BlogPost | null>(`blog-post-${slug}`, async () => {
    return blogPosts.find((p) => p.slug === slug) ?? null
  })
}
