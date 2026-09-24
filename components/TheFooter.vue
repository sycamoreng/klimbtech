<script setup lang="ts">
import { publicProducts } from '~/utils/products'

const email = ref('')
const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const message = ref('')
const year = new Date().getFullYear()
const { reset } = useConsent()

async function subscribe() {
  if (status.value === 'loading') return
  const value = email.value.trim()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    status.value = 'error'
    message.value = 'Please enter a valid email address.'
    return
  }
  status.value = 'loading'
  const supabase = useSupabase()
  const { error } = await supabase.from('newsletter_subscribers').insert({ email: value })
  if (error) {
    if (error.code === '23505') {
      status.value = 'success'
      message.value = "You're already subscribed — thanks!"
      email.value = ''
      return
    }
    status.value = 'error'
    message.value = 'Something went wrong. Please try again.'
    return
  }
  status.value = 'success'
  message.value = 'Thanks for subscribing!'
  email.value = ''
}
</script>

<template>
  <footer class="border-t border-brand-800 bg-brand-950 text-brand-200">
    <div class="container-page py-16">
      <div
        class="grid gap-12"
        :class="publicProducts.length ? 'lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]' : 'lg:grid-cols-[1.6fr_1fr_1.2fr]'"
      >
        <div>
          <NuxtLink to="/" class="inline-flex items-center" aria-label="Klimb Technology home">
            <img
              src="/logo-reversed.png"
              alt="Klimb Technology"
              class="h-9 w-auto"
              width="600"
              height="240"
            />
          </NuxtLink>
          <p class="mt-4 max-w-xs text-sm leading-relaxed text-brand-200">
            High-end software for ambitious, high-growth businesses. We build the products that power customer
            engagement and communication at scale.
          </p>
        </div>

        <div v-if="publicProducts.length">
          <h4 class="text-sm font-semibold uppercase tracking-wider text-brand-400">Products</h4>
          <ul class="mt-4 space-y-3 text-sm">
            <li v-for="p in publicProducts" :key="p.slug">
              <NuxtLink :to="`/products/${p.slug}`" class="text-brand-200 transition-colors hover:text-white">
                {{ p.name }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/products" class="text-brand-200 transition-colors hover:text-white">All products</NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-sm font-semibold uppercase tracking-wider text-brand-400">Company</h4>
          <ul class="mt-4 space-y-3 text-sm">
            <li><NuxtLink to="/consulting" class="text-brand-200 transition-colors hover:text-white">Consulting</NuxtLink></li>
            <li><NuxtLink to="/work" class="text-brand-200 transition-colors hover:text-white">Work</NuxtLink></li>
            <li><NuxtLink to="/blog" class="text-brand-200 transition-colors hover:text-white">Insights</NuxtLink></li>
            <li><NuxtLink to="/about" class="text-brand-200 transition-colors hover:text-white">About</NuxtLink></li>
            <li><NuxtLink to="/contact" class="text-brand-200 transition-colors hover:text-white">Contact</NuxtLink></li>
            <li><NuxtLink to="/contact" class="text-brand-200 transition-colors hover:text-white">Get started</NuxtLink></li>
          </ul>
        </div>

        <div>
          <h4 class="text-sm font-semibold uppercase tracking-wider text-brand-400">Stay in the loop</h4>
          <p class="mt-4 text-sm text-brand-200">Product updates and engineering notes. No spam.</p>
          <form class="mt-4" @submit.prevent="subscribe">
            <div class="flex gap-2">
              <input
                v-model="email"
                type="email"
                required
                placeholder="you@company.com"
                aria-label="Email address"
                class="w-full rounded-lg border border-brand-700 bg-brand-900 px-3 py-2.5 text-sm text-white placeholder-brand-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              />
              <button
                type="submit"
                :disabled="status === 'loading'"
                class="shrink-0 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-semibold text-brand-950 transition-colors hover:bg-brand-400 disabled:opacity-60"
              >
                {{ status === 'loading' ? '...' : 'Subscribe' }}
              </button>
            </div>
            <p
              v-if="message"
              class="mt-2 text-xs"
              :class="status === 'error' ? 'text-red-300' : 'text-brand-300'"
            >
              {{ message }}
            </p>
          </form>
        </div>
      </div>

      <div class="mt-14 flex flex-col items-center justify-between gap-4 border-t border-brand-800 pt-8 text-sm text-brand-300 sm:flex-row">
        <p>&copy; {{ year }} Klimb Technology. All rights reserved.</p>
        <nav class="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <NuxtLink to="/privacy" class="text-brand-300 transition-colors hover:text-white">Privacy</NuxtLink>
          <NuxtLink to="/terms" class="text-brand-300 transition-colors hover:text-white">Terms</NuxtLink>
          <button type="button" class="text-brand-300 transition-colors hover:text-white" @click="reset">
            Cookie settings
          </button>
        </nav>
      </div>
    </div>
  </footer>
</template>
