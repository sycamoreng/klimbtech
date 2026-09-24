<script setup lang="ts">
import { publicProducts } from '~/utils/products'

useHead({ title: 'Products — Klimb Technology' })
const productIcon: Record<string, string> = { pulse: 'chart', sendral: 'inbox' }
</script>

<template>
  <div>
    <section class="panel-sky relative overflow-hidden">
      <div class="pointer-events-none absolute -right-32 -top-24 h-96 w-96 rounded-full bg-brand-200/40 blur-3xl" />
      <div class="container-page relative py-20 text-center lg:py-28">
        <p class="eyebrow eyebrow-center">Products</p>
        <h1 class="mx-auto mt-4 max-w-3xl text-5xl font-medium tracking-tight lg:text-6xl">
          Purpose-built SaaS for <span class="gradient-text">high-end operations</span>
        </h1>
        <p class="mx-auto mt-5 max-w-2xl text-lg text-neutralgrey">
          Focused products that solve hard infrastructure problems — so your team can move faster and ship with
          confidence.
        </p>
      </div>
    </section>

    <!-- Coming soon: no products are public yet -->
    <section v-if="!publicProducts.length" class="container-page py-20 lg:py-28">
      <div class="mx-auto max-w-xl rounded-3xl border border-brand-100 bg-white p-10 text-center shadow-card lg:p-14">
        <span class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-100 text-brand-700">
          <AppIcon name="bolt" class="h-7 w-7" />
        </span>
        <h2 class="mt-6 text-3xl font-medium text-brand-900">Something is on the way</h2>
        <p class="mt-3 text-lg leading-relaxed text-neutralgrey">
          We're putting the finishing touches on our first products. In the meantime, our consulting team is ready to
          help with your biggest technology decisions.
        </p>
        <div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <NuxtLink to="/consulting" class="btn-primary">
            Explore consulting
            <AppIcon name="arrow" class="h-4 w-4" />
          </NuxtLink>
          <NuxtLink to="/contact" class="btn-secondary">Talk to us</NuxtLink>
        </div>
      </div>
    </section>

    <section v-else class="container-page py-16 lg:py-24">
      <div class="space-y-8">
        <div
          v-for="(p, i) in publicProducts"
          :key="p.slug"
          v-reveal
          class="grid items-center gap-8 rounded-3xl border border-brand-100 bg-white p-8 shadow-card lg:grid-cols-2 lg:p-12"
        >
          <div :class="i % 2 === 1 ? 'lg:order-2' : ''">
            <span class="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-600">{{ p.category }}</span>
            <h2 class="mt-4 text-4xl font-medium text-brand-900">{{ p.name }}</h2>
            <p class="mt-3 text-lg leading-relaxed text-neutralgrey">{{ p.description }}</p>
            <ul class="mt-6 space-y-2">
              <li v-for="f in p.features.slice(0, 4)" :key="f.title" class="flex items-center gap-3 text-brand-900">
                <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                  <AppIcon name="check" class="h-4 w-4" />
                </span>
                {{ f.title }}
              </li>
            </ul>
            <NuxtLink :to="`/products/${p.slug}`" class="btn-primary mt-8">
              Explore {{ p.name }}
              <AppIcon name="arrow" class="h-4 w-4" />
            </NuxtLink>
          </div>
          <div :class="i % 2 === 1 ? 'lg:order-1' : ''">
            <div class="relative overflow-hidden rounded-2xl bg-brand-800 p-8 text-white lg:p-10">
              <div class="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-600/40 blur-2xl" />
              <span class="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                <AppIcon :name="productIcon[p.slug]" class="h-7 w-7" />
              </span>
              <p class="relative mt-6 text-xl font-semibold">{{ p.tagline }}</p>
              <div class="relative mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                <div v-for="s in p.stats" :key="s.label">
                  <p class="text-2xl font-extrabold">{{ s.value }}</p>
                  <p class="mt-1 text-xs text-brand-200">{{ s.label }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <CtaSection
      v-if="publicProducts.length"
      title="Not sure which product fits?"
      subtitle="Tell us about your stack and we'll show you where our products can help."
    />
  </div>
</template>
