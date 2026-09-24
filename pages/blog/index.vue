<script setup lang="ts">
import { formatBlogDate } from '~/utils/blog'

const seoDescription =
  'Practical writing on product, engineering, and technology leadership from the team behind Klimb.'

useHead({
  title: 'Insights — Klimb Technology',
  meta: [{ name: 'description', content: seoDescription }],
})

useSeoMeta({
  ogTitle: 'Insights — Klimb Technology',
  ogDescription: seoDescription,
  twitterTitle: 'Insights — Klimb Technology',
  twitterDescription: seoDescription,
})

const { data: posts, pending, error } = await useBlogPosts()

const featured = computed(() => posts.value?.[0] ?? null)
const rest = computed(() => posts.value?.slice(1) ?? [])
</script>

<template>
  <div>
    <!-- Hero (dark) -->
    <section class="section-dark relative overflow-hidden bg-brand-950">
      <div class="pointer-events-none absolute inset-0 bg-grid opacity-[0.15]" />
      <div class="pointer-events-none absolute -right-32 -top-24 h-96 w-96 rounded-full bg-brand-600/20 blur-3xl" />
      <div class="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-brand-700/20 blur-3xl" />
      <div class="container-page relative py-20 lg:py-28">
        <div class="max-w-3xl">
          <span class="eyebrow text-brand-300">Insights</span>
          <h1 class="mt-4 text-5xl font-medium leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Notes from the
            <span class="italic text-brand-300">Klimb team</span>
          </h1>
          <p class="mt-6 max-w-2xl text-lg leading-relaxed text-brand-200">
            Practical writing on product, engineering, and technology leadership — drawn from what we
            build and the teams we advise.
          </p>
        </div>
      </div>
    </section>

    <section class="container-page py-16 lg:py-24">
      <div v-if="pending" class="space-y-8">
        <div class="h-80 animate-pulse rounded-3xl bg-brand-50" />
        <div class="grid gap-8 lg:grid-cols-3">
          <div v-for="n in 3" :key="n" class="h-72 animate-pulse rounded-3xl bg-brand-50" />
        </div>
      </div>

      <div v-else-if="error" class="mx-auto max-w-md rounded-2xl border border-red-100 bg-red-50 p-8 text-center">
        <p class="font-semibold text-red-700">We couldn't load our articles</p>
        <p class="mt-2 text-sm text-red-600">Please refresh the page and try again.</p>
      </div>

      <div v-else-if="!posts || posts.length === 0" class="mx-auto max-w-md text-center text-neutralgrey">
        <p>New articles are on the way. Check back soon.</p>
      </div>

      <div v-else class="space-y-14">
        <!-- Featured -->
        <NuxtLink
          v-if="featured"
          v-reveal
          :to="`/blog/${featured.slug}`"
          class="group grid overflow-hidden rounded-3xl border border-brand-100 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-cardhover lg:grid-cols-2"
        >
          <div class="relative min-h-[16rem] overflow-hidden">
            <img
              :src="featured.coverImage"
              :alt="featured.title"
              class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <div class="flex flex-col justify-center p-8 lg:p-10">
            <div class="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider">
              <span class="rounded-full bg-brand-100 px-3 py-1 text-brand-700">{{ featured.category }}</span>
              <span class="text-neutralgrey">{{ featured.readingMinutes }} min read</span>
            </div>
            <h2 class="mt-5 text-3xl font-medium leading-snug text-brand-900 lg:text-4xl">{{ featured.title }}</h2>
            <p class="mt-4 leading-relaxed text-neutralgrey">{{ featured.excerpt }}</p>
            <div class="mt-6 flex items-center gap-3 text-sm">
              <span class="font-semibold text-brand-900">{{ featured.author.name }}</span>
              <span class="text-neutralgrey">{{ formatBlogDate(featured.publishedAt) }}</span>
            </div>
          </div>
        </NuxtLink>

        <!-- Remaining posts -->
        <div v-if="rest.length" class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <NuxtLink
            v-for="(post, i) in rest"
            :key="post.slug"
            v-reveal="i * 80"
            :to="`/blog/${post.slug}`"
            class="group flex flex-col overflow-hidden rounded-3xl border border-brand-100 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-cardhover"
          >
            <div class="relative h-48 overflow-hidden">
              <img
                :src="post.coverImage"
                :alt="post.title"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div class="flex flex-1 flex-col p-6">
              <div class="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider">
                <span class="rounded-full bg-brand-100 px-3 py-1 text-brand-700">{{ post.category }}</span>
                <span class="text-neutralgrey">{{ post.readingMinutes }} min</span>
              </div>
              <h3 class="mt-4 text-xl font-medium leading-snug text-brand-900">{{ post.title }}</h3>
              <p class="mt-3 flex-1 text-sm leading-relaxed text-neutralgrey">{{ post.excerpt }}</p>
              <div class="mt-5 flex items-center gap-2 text-xs text-neutralgrey">
                <span class="font-semibold text-brand-900">{{ post.author.name }}</span>
                <span aria-hidden="true">•</span>
                <span>{{ formatBlogDate(post.publishedAt) }}</span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <CtaSection
      title="Want this kind of thinking on your team?"
      subtitle="Whether it's our products or our consulting, we'd love to help you build."
    />
  </div>
</template>
