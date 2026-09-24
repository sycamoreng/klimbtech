<script setup lang="ts">
import { getProduct, publicProducts, PRODUCTS_PUBLIC } from '~/utils/products'

const route = useRoute()
const slug = computed(() => route.params.slug as string)
const product = computed(() => getProduct(slug.value))

if (!PRODUCTS_PUBLIC || !product.value) {
  throw createError({ statusCode: 404, statusMessage: 'Product not found', fatal: true })
}

useHead(() => ({
  title: product.value ? `${product.value.name} — Klimb Technology` : 'Klimb Technology',
  meta: [{ name: 'description', content: product.value?.oneLiner || '' }],
}))

useSeoMeta({
  ogTitle: () => (product.value ? `${product.value.name} — Klimb Technology` : 'Klimb Technology'),
  ogDescription: () => product.value?.oneLiner || '',
  twitterTitle: () => (product.value ? product.value.name : 'Klimb Technology'),
  twitterDescription: () => product.value?.oneLiner || '',
})

const productIcon: Record<string, string> = { pulse: 'chart', sendral: 'inbox' }
const other = computed(() => publicProducts.filter((p) => p.slug !== slug.value))
</script>

<template>
  <div v-if="product">
    <!-- Hero -->
    <section class="panel-sky relative overflow-hidden">
      <div class="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-200/40 blur-3xl" />
      <div class="container-page relative py-16 lg:py-24">
        <NuxtLink to="/products" class="inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-800">
          <AppIcon name="chevron" class="h-4 w-4 rotate-90" />
          All products
        </NuxtLink>
        <div class="mt-6 grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span class="rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand-600 shadow-sm">{{ product.category }}</span>
            <h1 class="mt-4 text-5xl font-medium tracking-tight text-brand-900 lg:text-6xl">{{ product.name }}</h1>
            <p class="mt-4 text-xl font-medium text-brand-700">{{ product.tagline }}</p>
            <p class="mt-4 text-lg leading-relaxed text-neutralgrey">{{ product.description }}</p>
            <div class="mt-8 flex flex-col gap-3 sm:flex-row">
              <NuxtLink to="/contact" class="btn-primary">
                Request a demo
                <AppIcon name="arrow" class="h-4 w-4" />
              </NuxtLink>
              <a href="#features" class="btn-secondary">See features</a>
            </div>
          </div>
          <div class="relative overflow-hidden rounded-3xl bg-brand-800 p-8 text-white shadow-card lg:p-10">
            <div class="pointer-events-none absolute -bottom-16 -left-10 h-56 w-56 rounded-full bg-brand-600/40 blur-3xl" />
            <span class="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
              <AppIcon :name="productIcon[product.slug]" class="h-8 w-8" />
            </span>
            <div class="relative mt-8 grid grid-cols-3 gap-6 border-t border-white/10 pt-6">
              <div v-for="s in product.stats" :key="s.label">
                <p class="text-2xl font-extrabold lg:text-3xl">{{ s.value }}</p>
                <p class="mt-1 text-xs text-brand-200">{{ s.label }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Problem / Solution -->
    <section class="container-page py-16 lg:py-24">
      <div class="grid gap-6 lg:grid-cols-2">
        <div class="rounded-2xl border border-brand-100 bg-white p-8 shadow-card">
          <p class="eyebrow text-neutralgrey">The problem</p>
          <p class="mt-3 text-lg leading-relaxed text-brand-900">{{ product.problem }}</p>
        </div>
        <div class="rounded-2xl border border-brand-200 bg-brand-800 p-8 text-white shadow-card">
          <p class="eyebrow text-brand-300">How {{ product.name }} helps</p>
          <p class="mt-3 text-lg leading-relaxed text-brand-50">{{ product.solution }}</p>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section id="features" class="bg-brand-50 py-16 lg:py-24">
      <div class="container-page">
        <div class="mx-auto max-w-2xl text-center">
          <p class="eyebrow">Features</p>
          <h2 class="mt-3 text-4xl font-medium lg:text-5xl">Everything you need, nothing you don't</h2>
        </div>
        <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="f in product.features"
            :key="f.title"
            class="rounded-2xl border border-brand-100 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-cardhover"
          >
            <span class="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
              <AppIcon :name="f.icon" class="h-6 w-6" />
            </span>
            <h3 class="mt-4 text-lg font-semibold text-brand-800">{{ f.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-neutralgrey">{{ f.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How it works -->
    <section class="container-page py-16 lg:py-24">
      <div class="mx-auto max-w-2xl text-center">
        <p class="eyebrow">How it works</p>
        <h2 class="mt-3 text-4xl font-medium lg:text-5xl">Live in three steps</h2>
      </div>
      <div class="mt-12 grid gap-8 md:grid-cols-3">
        <div v-for="step in product.howItWorks" :key="step.step" class="relative">
          <span class="text-5xl font-extrabold text-brand-100">{{ step.step }}</span>
          <h3 class="mt-2 text-xl font-semibold text-brand-800">{{ step.title }}</h3>
          <p class="mt-2 text-base leading-relaxed text-neutralgrey">{{ step.description }}</p>
        </div>
      </div>
    </section>

    <!-- Use cases -->
    <section class="bg-brand-50 py-16 lg:py-24">
      <div class="container-page">
        <div class="mx-auto max-w-2xl text-center">
          <p class="eyebrow">Use cases</p>
          <h2 class="mt-3 text-4xl font-medium lg:text-5xl">Where teams put {{ product.name }} to work</h2>
        </div>
        <div class="mt-12 grid gap-6 md:grid-cols-3">
          <div v-for="u in product.useCases" :key="u.title" class="rounded-2xl border border-brand-100 bg-white p-6 shadow-card">
            <span class="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-800 text-white">
              <AppIcon name="spark" class="h-5 w-5" />
            </span>
            <h3 class="mt-4 text-lg font-semibold text-brand-800">{{ u.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-neutralgrey">{{ u.description }}</p>
          </div>
        </div>
        <p class="mt-10 flex items-center justify-center gap-2 text-sm text-neutralgrey">
          <AppIcon name="code" class="h-4 w-4 text-brand-600" />
          {{ product.docsNote }}
        </p>
      </div>
    </section>

    <!-- Other products -->
    <section class="container-page py-16 lg:py-24">
      <h2 class="text-3xl font-medium">Explore more from Klimb</h2>
      <div class="mt-6 grid gap-6 sm:grid-cols-2">
        <NuxtLink
          v-for="p in other"
          :key="p.slug"
          :to="`/products/${p.slug}`"
          class="group flex items-center justify-between rounded-2xl border border-brand-100 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-cardhover"
        >
          <div class="flex items-center gap-4">
            <span class="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
              <AppIcon :name="productIcon[p.slug]" class="h-6 w-6" />
            </span>
            <div>
              <p class="font-semibold text-brand-800">{{ p.name }}</p>
              <p class="text-sm text-neutralgrey">{{ p.category }}</p>
            </div>
          </div>
          <AppIcon name="arrow" class="h-5 w-5 text-brand-600 transition-transform group-hover:translate-x-1" />
        </NuxtLink>
      </div>
    </section>

    <CtaSection :title="`Ready to try ${product.name}?`" />
  </div>
</template>
