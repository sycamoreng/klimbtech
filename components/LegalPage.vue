<script setup lang="ts">
import type { LegalSection } from '~/utils/legal'
import { LEGAL_LAST_UPDATED } from '~/utils/legal'

defineProps<{
  eyebrow: string
  title: string
  intro: string
  sections: LegalSection[]
}>()
</script>

<template>
  <div>
    <section class="section-dark relative overflow-hidden bg-brand-950">
      <div class="pointer-events-none absolute inset-0 bg-grid opacity-[0.15]" />
      <div class="pointer-events-none absolute -right-32 -top-24 h-96 w-96 rounded-full bg-brand-600/20 blur-3xl" />
      <div class="container-page relative py-16 lg:py-20">
        <div class="max-w-3xl">
          <span class="eyebrow text-brand-300">{{ eyebrow }}</span>
          <h1 class="mt-4 text-4xl font-medium leading-[1.08] tracking-tight text-white sm:text-5xl">{{ title }}</h1>
          <p class="mt-5 text-lg leading-relaxed text-brand-200">{{ intro }}</p>
          <p class="mt-6 text-sm font-medium text-brand-300">Last updated {{ LEGAL_LAST_UPDATED }}</p>
        </div>
      </div>
    </section>

    <section class="container-page py-14 lg:py-20">
      <div class="mx-auto max-w-3xl space-y-10">
        <div v-for="(s, i) in sections" :key="i">
          <h2 class="text-2xl font-medium text-brand-900">{{ s.heading }}</h2>
          <p
            v-for="(p, j) in s.paragraphs ?? []"
            :key="`p-${j}`"
            class="mt-4 text-lg leading-relaxed text-brand-900/80"
          >
            {{ p }}
          </p>
          <ul v-if="s.bullets?.length" class="mt-4 space-y-3">
            <li
              v-for="(b, k) in s.bullets"
              :key="`b-${k}`"
              class="flex items-start gap-3 text-lg leading-relaxed text-brand-900/80"
            >
              <span class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                <AppIcon name="check" class="h-3.5 w-3.5" />
              </span>
              <span>{{ b }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>
