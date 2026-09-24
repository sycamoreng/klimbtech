<script setup lang="ts">
import { formatBlogDate } from '~/utils/blog'

const route = useRoute()
const slug = computed(() => String(route.params.slug))

const { data: post, error } = await useBlogPost(slug.value)

if (!post.value && !error.value) {
  throw createError({ statusCode: 404, statusMessage: 'Article not found', fatal: true })
}

useHead(() => ({
  title: post.value ? `${post.value.title} — Klimb Technology` : 'Article — Klimb Technology',
  meta: [{ name: 'description', content: post.value?.excerpt ?? '' }],
}))

useSeoMeta({
  ogType: 'article',
  ogTitle: () => (post.value ? `${post.value.title} — Klimb Technology` : 'Klimb Technology'),
  ogDescription: () => post.value?.excerpt ?? '',
  ogImage: () => post.value?.coverImage ?? undefined,
  twitterImage: () => post.value?.coverImage ?? undefined,
  twitterTitle: () => (post.value ? post.value.title : 'Klimb Technology'),
  twitterDescription: () => post.value?.excerpt ?? '',
})
</script>

<template>
  <div v-if="post">
    <!-- Hero (dark) -->
    <section class="section-dark relative overflow-hidden bg-brand-950">
      <div class="pointer-events-none absolute inset-0 bg-grid opacity-[0.15]" />
      <div class="pointer-events-none absolute -right-32 -top-24 h-96 w-96 rounded-full bg-brand-600/20 blur-3xl" />
      <div class="container-page relative py-16 lg:py-24">
        <NuxtLink to="/blog" class="inline-flex items-center gap-1.5 text-sm font-medium text-brand-300 transition-colors hover:text-white">
          <AppIcon name="arrow" class="h-4 w-4 rotate-180" />
          All insights
        </NuxtLink>
        <div class="mt-8 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wider">
          <span class="rounded-full bg-white/10 px-3 py-1 text-brand-100">{{ post.category }}</span>
          <span class="text-brand-300">{{ post.readingMinutes }} min read</span>
        </div>
        <h1 class="mt-5 max-w-4xl text-4xl font-medium leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
          {{ post.title }}
        </h1>
        <div class="mt-8 flex items-center gap-3">
          <span class="flex h-11 w-11 items-center justify-center rounded-full bg-brand-700 text-sm font-semibold text-white">
            {{ post.author.name.charAt(0) }}
          </span>
          <div>
            <p class="text-sm font-semibold text-white">{{ post.author.name }}</p>
            <p class="text-sm text-brand-300">{{ post.author.role }} · {{ formatBlogDate(post.publishedAt) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Cover -->
    <div class="container-page -mt-8 lg:-mt-12">
      <div class="overflow-hidden rounded-3xl border border-brand-100 shadow-card">
        <img :src="post.coverImage" :alt="post.title" class="h-64 w-full object-cover sm:h-80 lg:h-[26rem]" />
      </div>
    </div>

    <!-- Body -->
    <article class="container-page py-14 lg:py-20">
      <div class="mx-auto max-w-3xl space-y-6">
        <template v-for="(block, i) in post.body" :key="i">
          <h2 v-if="block.type === 'heading'" class="pt-4 text-2xl font-medium text-brand-900 lg:text-3xl">
            {{ block.text }}
          </h2>

          <p v-else-if="block.type === 'paragraph'" class="text-lg leading-relaxed text-brand-900/80">
            {{ block.text }}
          </p>

          <ul v-else-if="block.type === 'list'" class="space-y-3">
            <li v-for="(item, j) in block.items" :key="j" class="flex items-start gap-3 text-lg leading-relaxed text-brand-900/80">
              <span class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                <AppIcon name="check" class="h-3.5 w-3.5" />
              </span>
              <span>{{ item }}</span>
            </li>
          </ul>

          <blockquote v-else-if="block.type === 'quote'" class="border-l-4 border-brand-500 bg-brand-50 py-5 pl-6 pr-4">
            <p class="text-xl font-medium italic leading-relaxed text-brand-900">"{{ block.text }}"</p>
            <footer v-if="block.attribution" class="mt-3 text-sm font-semibold text-brand-700">— {{ block.attribution }}</footer>
          </blockquote>
        </template>
      </div>
    </article>

    <CtaSection
      title="Let's build something worth writing about"
      subtitle="Tell us what you're working on and see how Klimb can help."
    />
  </div>
</template>
