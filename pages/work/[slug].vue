<script setup lang="ts">
const route = useRoute()
const slug = computed(() => String(route.params.slug))

const { data: caseStudy, error } = await useCaseStudy(slug.value)

if (!caseStudy.value && !error.value) {
  throw createError({ statusCode: 404, statusMessage: 'Case study not found', fatal: true })
}

useHead(() => ({
  title: caseStudy.value ? `${caseStudy.value.title} — Klimb Technology` : 'Case study — Klimb Technology',
  meta: [{ name: 'description', content: caseStudy.value?.summary ?? '' }],
}))

useSeoMeta({
  ogType: 'article',
  ogTitle: () => (caseStudy.value ? `${caseStudy.value.title} — Klimb Technology` : 'Klimb Technology'),
  ogDescription: () => caseStudy.value?.summary ?? '',
  twitterTitle: () => (caseStudy.value ? caseStudy.value.title : 'Klimb Technology'),
  twitterDescription: () => caseStudy.value?.summary ?? '',
})
</script>

<template>
  <div v-if="caseStudy">
    <!-- Hero (dark) -->
    <section class="section-dark relative overflow-hidden bg-brand-950">
      <div class="pointer-events-none absolute inset-0 bg-grid opacity-[0.15]" />
      <div class="pointer-events-none absolute -right-32 -top-24 h-96 w-96 rounded-full bg-brand-600/20 blur-3xl" />
      <div class="container-page relative py-16 lg:py-24">
        <NuxtLink to="/work" class="inline-flex items-center gap-1.5 text-sm font-medium text-brand-300 transition-colors hover:text-white">
          <AppIcon name="arrow" class="h-4 w-4 rotate-180" />
          All work
        </NuxtLink>
        <div class="mt-8 flex flex-wrap items-center gap-3">
          <span class="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-100">
            {{ caseStudy.service }}
          </span>
          <span class="text-sm font-medium text-brand-300">{{ caseStudy.industry }}</span>
        </div>
        <h1 class="mt-5 max-w-4xl text-4xl font-medium leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
          {{ caseStudy.title }}
        </h1>
        <p class="mt-5 max-w-2xl text-lg leading-relaxed text-brand-200">{{ caseStudy.summary }}</p>
        <p class="mt-6 text-sm font-semibold text-brand-300">Client — {{ caseStudy.client }}</p>
      </div>
    </section>

    <!-- Metrics band -->
    <section class="border-b border-brand-100 bg-brand-50">
      <div class="container-page grid grid-cols-1 gap-8 py-10 sm:grid-cols-3">
        <div v-for="m in caseStudy.metrics" :key="m.label" class="text-center sm:text-left">
          <p class="text-4xl font-semibold text-brand-700 lg:text-5xl">{{ m.value }}</p>
          <p class="mt-2 text-sm leading-tight text-neutralgrey">{{ m.label }}</p>
        </div>
      </div>
    </section>

    <!-- Narrative -->
    <section class="container-page py-16 lg:py-24">
      <div class="mx-auto max-w-3xl space-y-14">
        <div v-reveal>
          <p class="eyebrow">The challenge</p>
          <p class="mt-4 text-lg leading-relaxed text-brand-900">{{ caseStudy.challenge }}</p>
        </div>
        <div v-reveal>
          <p class="eyebrow">What we did</p>
          <p class="mt-4 text-lg leading-relaxed text-brand-900">{{ caseStudy.solution }}</p>
        </div>
        <div v-reveal class="rounded-3xl border border-brand-100 bg-brand-50 p-8 lg:p-10">
          <p class="eyebrow">The results</p>
          <p class="mt-4 text-lg leading-relaxed text-brand-900">{{ caseStudy.results }}</p>
        </div>
      </div>
    </section>

    <CtaSection
      title="Let's write your success story"
      subtitle="Book a conversation and see how Klimb can move your numbers."
    />
  </div>
</template>
