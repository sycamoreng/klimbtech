<script setup lang="ts">
import { publicProducts } from '~/utils/products'

const route = useRoute()
const mobileOpen = ref(false)
const productsOpen = ref(false)
const scrolled = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 8
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

watch(
  () => route.fullPath,
  () => {
    mobileOpen.value = false
    productsOpen.value = false
  },
)
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 border-b transition-all duration-300"
    :class="scrolled || mobileOpen ? 'border-slate-200/70 bg-white/90 shadow-sm backdrop-blur-xl' : 'border-transparent bg-white/60 backdrop-blur-md'"
  >
    <div class="container-page flex h-16 items-center justify-between lg:h-20">
      <NuxtLink to="/" class="group flex items-center" aria-label="Klimb Technology home">
        <img
          src="/logo-primary.png"
          alt="Klimb Technology"
          class="h-8 w-auto transition-transform duration-200 group-hover:scale-105 lg:h-9"
          width="600"
          height="240"
        />
      </NuxtLink>

      <nav class="hidden items-center gap-1 lg:flex" aria-label="Primary">
        <NuxtLink to="/" class="nav-link">Home</NuxtLink>
        <div v-if="publicProducts.length" class="relative" @mouseenter="productsOpen = true" @mouseleave="productsOpen = false">
          <button
            class="nav-link flex items-center gap-1"
            :aria-expanded="productsOpen"
            @click="productsOpen = !productsOpen"
          >
            Products
            <AppIcon name="chevron" class="h-4 w-4 transition-transform" :class="productsOpen ? 'rotate-180' : ''" />
          </button>
          <transition
            enter-active-class="transition duration-150 ease-out"
            enter-from-class="opacity-0 translate-y-1"
            leave-active-class="transition duration-100 ease-in"
            leave-to-class="opacity-0 translate-y-1"
          >
            <div
              v-if="productsOpen"
              class="absolute left-0 top-full w-80 pt-3"
            >
              <div class="rounded-2xl border border-slate-200 bg-white p-2 shadow-card">
                <NuxtLink
                  v-for="p in publicProducts"
                  :key="p.slug"
                  :to="`/products/${p.slug}`"
                  class="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-brand-50"
                >
                  <span class="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
                    <AppIcon :name="p.slug === 'pulse' ? 'chart' : 'inbox'" class="h-5 w-5" />
                  </span>
                  <span>
                    <span class="block font-semibold text-brand-900">{{ p.name }}</span>
                    <span class="block text-sm text-neutralgrey">{{ p.category }}</span>
                  </span>
                </NuxtLink>
                <NuxtLink
                  to="/products"
                  class="mt-1 flex items-center justify-between rounded-xl bg-brand-50 p-3 text-sm font-semibold text-brand-700 hover:bg-brand-100"
                >
                  View all products
                  <AppIcon name="arrow" class="h-4 w-4" />
                </NuxtLink>
              </div>
            </div>
          </transition>
        </div>
        <NuxtLink to="/consulting" class="nav-link">Consulting</NuxtLink>
        <NuxtLink to="/work" class="nav-link">Work</NuxtLink>
        <NuxtLink to="/blog" class="nav-link">Insights</NuxtLink>
        <NuxtLink to="/about" class="nav-link">About</NuxtLink>
        <NuxtLink to="/contact" class="nav-link">Contact</NuxtLink>
      </nav>

      <div class="hidden lg:block">
        <NuxtLink to="/contact" class="btn-accent">Get started</NuxtLink>
      </div>

      <button
        class="flex h-10 w-10 items-center justify-center rounded-lg text-brand-900 hover:bg-brand-50 lg:hidden"
        :aria-expanded="mobileOpen"
        aria-label="Toggle menu"
        @click="mobileOpen = !mobileOpen"
      >
        <svg v-if="!mobileOpen" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
          <path stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16" />
        </svg>
        <svg v-else class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
          <path stroke-linecap="round" d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </div>

    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="mobileOpen" class="border-t border-slate-200 bg-white lg:hidden">
        <div class="container-page space-y-1 py-4">
          <NuxtLink to="/" class="mobile-link">Home</NuxtLink>
          <template v-if="publicProducts.length">
            <div class="px-4 pt-3 text-xs font-semibold uppercase tracking-wider text-neutralgrey">Products</div>
            <NuxtLink
              v-for="p in publicProducts"
              :key="p.slug"
              :to="`/products/${p.slug}`"
              class="mobile-link pl-4"
            >
              {{ p.name }}
            </NuxtLink>
            <NuxtLink to="/products" class="mobile-link pl-4">All products</NuxtLink>
          </template>
          <NuxtLink to="/consulting" class="mobile-link">Consulting</NuxtLink>
          <NuxtLink to="/work" class="mobile-link">Work</NuxtLink>
          <NuxtLink to="/blog" class="mobile-link">Insights</NuxtLink>
          <NuxtLink to="/about" class="mobile-link">About</NuxtLink>
          <NuxtLink to="/contact" class="mobile-link">Contact</NuxtLink>
          <NuxtLink to="/contact" class="btn-accent mt-3 w-full">Get started</NuxtLink>
        </div>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.nav-link {
  @apply rounded-lg px-3 py-2 text-sm font-medium text-brand-900/70 transition-colors hover:bg-brand-50 hover:text-brand-900;
}
.router-link-exact-active.nav-link {
  @apply text-brand-900;
}
.mobile-link {
  @apply block rounded-lg px-4 py-2.5 text-base font-medium text-brand-900 hover:bg-brand-50;
}
</style>
