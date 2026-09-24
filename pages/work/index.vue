<script setup lang="ts">
useHead({
  title: 'Work — Klimb Technology',
  meta: [
    {
      name: 'description',
      content:
        'Real results from teams building with Klimb. Case studies across customer engagement, email deliverability, and technology consulting.',
    },
  ],
})

const { data: caseStudies, pending, error } = await useCaseStudies()
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
          <span class="eyebrow text-brand-300">Our work</span>
          <h1 class="mt-4 text-5xl font-medium leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Outcomes we're
            <span class="italic text-brand-300">proud of</span>
          </h1>
          <p class="mt-6 max-w-2xl text-lg leading-relaxed text-brand-200">
            A look at how teams put Klimb products and consulting to work — the problems they faced, what we built
            together, and the numbers that moved.
          </p>
        </div>
      </div>
    </section>

    <!-- Case studies grid -->
    <section class="container-page py-16 lg:py-24">
      <div v-if="pending" class="grid gap-8 lg:grid-cols-2">
        <div v-for="n in 4" :key="n" class="h-80 animate-pulse rounded-3xl bg-brand-50" />
      </div>

      <div v-else-if="error" class="mx-auto max-w-md rounded-2xl border border-red-100 bg-red-50 p-8 text-center">
        <p class="font-semibold text-red-700">We couldn't load our case studies</p>
        <p class="mt-2 text-sm text-red-600">Please refresh the page and try again.</p>
      </div>

      <div v-else-if="!caseStudies || caseStudies.length === 0" class="mx-auto max-w-md text-center text-neutralgrey">
        <p>Case studies are on the way. Check back soon.</p>
      </div>

      <div v-else class="grid gap-8 lg:grid-cols-2">
        <NuxtLink
          v-for="(cs, i) in caseStudies"
          :key="cs.id"
          v-reveal="i * 80"
          :to="`/work/${cs.slug}`"
          class="group flex flex-col overflow-hidden rounded-3xl border border-brand-100 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-cardhover"
        >
          <div class="relative overflow-hidden bg-brand-900 p-8">
            <div class="pointer-events-none absolute inset-0 bg-dots opacity-20" />
            <div class="relative flex items-center justify-between">
              <span class="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-100">
                {{ cs.service }}
              </span>
              <span class="text-sm font-medium text-brand-300">{{ cs.industry }}</span>
            </div>
            <h2 class="relative mt-6 text-3xl font-medium leading-snug text-white">{{ cs.title }}</h2>
            <p class="relative mt-1 text-sm font-medium text-brand-300">{{ cs.client }}</p>
          </div>

          <div class="flex flex-1 flex-col p-8">
            <p class="text-sm leading-relaxed text-neutralgrey">{{ cs.summary }}</p>
            <div class="mt-6 grid grid-cols-3 gap-4 border-t border-brand-100 pt-6">
              <div v-for="m in cs.metrics" :key="m.label">
                <p class="text-2xl font-extrabold text-brand-700">{{ m.value }}</p>
                <p class="mt-1 text-xs leading-tight text-neutralgrey">{{ m.label }}</p>
              </div>
            </div>
            <span class="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
              Read the story
              <AppIcon name="arrow" class="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </NuxtLink>
      </div>
    </section>

    <CtaSection
      title="Want results like these?"
      subtitle="Tell us what you're working on and we'll show you how Klimb can help."
    />
  </div>
</template>
