<script setup lang="ts">
import { publicProducts } from '~/utils/products'

withDefaults(
  defineProps<{
    title?: string
    subtitle?: string
  }>(),
  {
    title: 'Ready to build on Klimb?',
    subtitle: 'See what we can do for your business. Book a walkthrough with our team.',
  },
)

const productsEnabled = publicProducts.length > 0
</script>

<template>
  <section class="container-page py-20 lg:py-28">
    <div class="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-900 via-brand-800 to-brand-900 px-8 py-16 text-center shadow-cardhover lg:px-16 lg:py-24">
      <div class="pointer-events-none absolute inset-0 bg-dots opacity-20" />
      <div class="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand-500/30 blur-[90px]" />
      <div class="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-brand-400/20 blur-[90px]" />
      <div class="relative mx-auto max-w-2xl">
        <h2 class="text-4xl font-medium text-white lg:text-5xl">{{ title }}</h2>
        <p class="mt-5 text-lg text-brand-100">{{ subtitle }}</p>
        <div class="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <NuxtLink to="/contact" class="btn bg-white text-brand-900 hover:-translate-y-0.5 hover:bg-brand-50">
            {{ productsEnabled ? 'Request a demo' : 'Get started' }}
            <AppIcon name="arrow" class="h-4 w-4" />
          </NuxtLink>
          <NuxtLink
            :to="productsEnabled ? '/products' : '/consulting'"
            class="btn border border-brand-400/40 bg-brand-800/40 text-white backdrop-blur hover:bg-brand-700/60"
          >
            {{ productsEnabled ? 'Explore products' : 'Explore consulting' }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
