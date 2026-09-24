<script setup lang="ts">
import { publicProducts } from '~/utils/products'
import { consultingPillars } from '~/utils/consulting'

useHead({ title: 'Get started — Klimb Technology' })

const route = useRoute()
type Enquiry = 'product' | 'consulting'

// While products are unreleased, the contact form only offers consulting.
const productsEnabled = publicProducts.length > 0

const form = reactive({
  name: '',
  work_email: '',
  company: '',
  interest: '',
  message: '',
})
// Honeypot: real people never see or fill this. Bots that auto-fill every input
// will, so a non-empty value marks the submission as spam.
const honeypot = ref('')
const mountedAt = Date.now()
const enquiryType = ref<Enquiry>(
  !productsEnabled || route.query.type === 'consulting' ? 'consulting' : 'product',
)

const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const errorMsg = ref('')

function setType(t: Enquiry) {
  if (t === enquiryType.value) return
  enquiryType.value = t
  form.interest = ''
}

const heading = computed(() =>
  enquiryType.value === 'consulting' ? 'Book a consultation' : 'Request a demo',
)
const interestLabel = computed(() =>
  enquiryType.value === 'consulting' ? 'What do you need help with?' : 'Product of interest',
)
const messageLabel = computed(() =>
  enquiryType.value === 'consulting'
    ? 'Tell us about your situation'
    : 'What are you looking to solve?',
)
const submitLabel = computed(() =>
  enquiryType.value === 'consulting' ? 'Book a consultation' : 'Request a demo',
)

const sidePoints = computed(() =>
  enquiryType.value === 'consulting'
    ? [
        { icon: 'layers', title: 'Independent assessment', text: 'A clear, objective read on your technology, team, and processes.' },
        { icon: 'flow', title: 'Practical roadmap', text: 'Prioritized recommendations you can actually act on.' },
        { icon: 'shield', title: 'No obligation', text: 'Every engagement starts with a simple conversation.' },
      ]
    : [
        { icon: 'spark', title: 'See it in action', text: 'A live walkthrough of our platform tailored to your use case.' },
        { icon: 'code', title: 'Talk to engineers', text: 'Real answers about APIs, integration, and scale from the people who built it.' },
        { icon: 'shield', title: 'Security & compliance', text: 'Review our controls and how we support demanding, regulated workloads.' },
      ],
)

function validate(): string | null {
  if (!form.name.trim()) return 'Please enter your name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.work_email.trim())) return 'Please enter a valid work email.'
  return null
}

async function submit() {
  if (status.value === 'loading') return
  const err = validate()
  if (err) {
    status.value = 'error'
    errorMsg.value = err
    return
  }
  // Drop obvious bots: a filled honeypot or a form submitted within two seconds
  // of loading. We show the normal success screen so we don't tip them off.
  if (honeypot.value.trim() !== '' || Date.now() - mountedAt < 2000) {
    status.value = 'success'
    return
  }

  status.value = 'loading'
  errorMsg.value = ''
  const supabase = useSupabase()
  const { error } = await supabase.from('demo_requests').insert({
    name: form.name.trim(),
    work_email: form.work_email.trim(),
    company: form.company.trim(),
    product_interest: form.interest,
    enquiry_type: enquiryType.value,
    message: form.message.trim(),
  })
  if (error) {
    status.value = 'error'
    errorMsg.value = 'Something went wrong sending your request. Please try again.'
    return
  }

  // Fire off a confirmation email. Delivery is best-effort: a failure here
  // must not turn a successfully-recorded request into an error for the user.
  try {
    const config = useRuntimeConfig()
    await fetch(`${config.public.supabaseUrl}/functions/v1/send-confirmation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.public.supabaseAnonKey}`,
      },
      body: JSON.stringify({
        name: form.name.trim(),
        work_email: form.work_email.trim(),
        enquiry_type: enquiryType.value,
      }),
    })
  } catch {
    /* confirmation email is non-blocking */
  }

  status.value = 'success'
}
</script>

<template>
  <div>
    <section class="panel-sky relative overflow-hidden">
      <div class="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-200/40 blur-3xl" />
      <div class="container-page relative py-16 lg:py-20">
        <div class="mx-auto max-w-2xl text-center">
          <p class="eyebrow eyebrow-center">Get in touch</p>
          <h1 class="mt-4 text-5xl font-medium tracking-tight lg:text-6xl">Let's <span class="gradient-text">talk</span></h1>
          <p class="mt-4 text-lg text-neutralgrey">
            Whether you want to see our products or get expert eyes on your technology, tell us a little about your
            needs and we'll get back to you within one business day.
          </p>
        </div>
      </div>
    </section>

    <section class="container-page py-16 lg:py-20">
      <div class="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1fr_1.3fr]">
        <div class="space-y-6">
          <h2 class="text-3xl font-medium text-brand-900">{{ heading }}</h2>
          <div v-for="s in sidePoints" :key="s.title" class="flex gap-4">
            <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
              <AppIcon :name="s.icon" class="h-6 w-6" />
            </span>
            <div>
              <h3 class="font-semibold text-brand-800">{{ s.title }}</h3>
              <p class="mt-1 text-sm leading-relaxed text-neutralgrey">{{ s.text }}</p>
            </div>
          </div>
        </div>

        <div class="rounded-3xl border border-brand-100 bg-white p-8 shadow-card lg:p-10">
          <div v-if="status === 'success'" class="flex flex-col items-center py-10 text-center">
            <span class="flex h-14 w-14 items-center justify-center rounded-full bg-brand-100 text-brand-700">
              <AppIcon name="check" class="h-8 w-8" />
            </span>
            <h3 class="mt-5 text-3xl font-medium text-brand-900">Thanks, we've got it!</h3>
            <p class="mt-2 max-w-sm text-neutralgrey">
              Your {{ enquiryType === 'consulting' ? 'consultation request' : 'request' }} is in. A member of the Klimb
              team will reach out within one business day.
            </p>
            <NuxtLink to="/" class="btn-secondary mt-6">Back to home</NuxtLink>
          </div>

          <form v-else class="space-y-5" @submit.prevent="submit">
            <div class="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden" aria-hidden="true">
              <label for="website">Leave this field empty</label>
              <input id="website" v-model="honeypot" type="text" tabindex="-1" autocomplete="off" />
            </div>
            <div v-if="productsEnabled">
              <span class="mb-1.5 block text-sm font-medium text-brand-900">I'm interested in</span>
              <div class="grid grid-cols-2 gap-2 rounded-xl bg-brand-50 p-1">
                <button
                  type="button"
                  class="rounded-lg px-3 py-2.5 text-sm font-semibold transition-all"
                  :class="enquiryType === 'product' ? 'bg-white text-brand-800 shadow-sm' : 'text-neutralgrey hover:text-brand-800'"
                  @click="setType('product')"
                >
                  Product demo
                </button>
                <button
                  type="button"
                  class="rounded-lg px-3 py-2.5 text-sm font-semibold transition-all"
                  :class="enquiryType === 'consulting' ? 'bg-white text-brand-800 shadow-sm' : 'text-neutralgrey hover:text-brand-800'"
                  @click="setType('consulting')"
                >
                  Technology consulting
                </button>
              </div>
            </div>

            <div class="grid gap-5 sm:grid-cols-2">
              <div>
                <label for="name" class="mb-1.5 block text-sm font-medium text-brand-900">Full name *</label>
                <input id="name" v-model="form.name" type="text" class="field" placeholder="Jane Doe" />
              </div>
              <div>
                <label for="email" class="mb-1.5 block text-sm font-medium text-brand-900">Work email *</label>
                <input id="email" v-model="form.work_email" type="email" class="field" placeholder="jane@company.com" />
              </div>
            </div>
            <div>
              <label for="company" class="mb-1.5 block text-sm font-medium text-brand-900">Company</label>
              <input id="company" v-model="form.company" type="text" class="field" placeholder="Acme Financial" />
            </div>
            <div>
              <label for="interest" class="mb-1.5 block text-sm font-medium text-brand-900">{{ interestLabel }}</label>
              <select id="interest" v-model="form.interest" class="field">
                <option value="">No preference</option>
                <template v-if="enquiryType === 'product'">
                  <option v-for="p in publicProducts" :key="p.slug" :value="p.name">{{ p.name }} — {{ p.category }}</option>
                  <option value="Both">Both products</option>
                </template>
                <template v-else>
                  <option v-for="c in consultingPillars" :key="c.slug" :value="c.title">{{ c.title }}</option>
                  <option value="Not sure yet">Not sure yet</option>
                </template>
              </select>
            </div>
            <div>
              <label for="message" class="mb-1.5 block text-sm font-medium text-brand-900">{{ messageLabel }}</label>
              <textarea id="message" v-model="form.message" rows="4" class="field resize-none" placeholder="A few words about your needs..." />
            </div>

            <p v-if="status === 'error'" class="text-sm text-red-600">{{ errorMsg }}</p>

            <button type="submit" :disabled="status === 'loading'" class="btn-primary w-full disabled:opacity-60">
              {{ status === 'loading' ? 'Sending...' : submitLabel }}
              <AppIcon v-if="status !== 'loading'" name="arrow" class="h-4 w-4" />
            </button>
            <p class="text-center text-xs text-neutralgrey">By submitting, you agree to be contacted by the Klimb team.</p>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.field {
  @apply w-full rounded-lg border border-brand-200 bg-white px-3.5 py-2.5 text-sm text-brand-900 placeholder-neutralgrey/60 transition-colors focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500;
}
</style>
