<script setup lang="ts">
import { publicProducts } from '~/utils/products'
import { consultingPillars } from '~/utils/consulting'

useHead({ title: 'Klimb Technology — Products & consulting for ambitious businesses' })

const { data: caseStudies } = await useCaseStudies()
const featuredCases = computed(() => (caseStudies.value ?? []).slice(0, 3))

const img = {
  hero: 'https://images.pexels.com/photos/4350098/pexels-photo-4350098.jpeg?auto=compress&cs=tinysrgb&h=1400&w=1000',
  team: 'https://images.pexels.com/photos/7691694/pexels-photo-7691694.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200',
  partners: 'https://images.pexels.com/photos/3865555/pexels-photo-3865555.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200',
  phone: 'https://images.pexels.com/photos/8938259/pexels-photo-8938259.jpeg?auto=compress&cs=tinysrgb&h=1200&w=900',
  colleagues: 'https://images.pexels.com/photos/30690402/pexels-photo-30690402.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200',
}

const productIcon: Record<string, string> = { pulse: 'chart', sendral: 'inbox' }
const productImage: Record<string, string> = { pulse: img.colleagues, phone: img.phone, sendral: img.phone }

const stats = [
  { value: 99.9, suffix: '%', decimals: 1, label: 'Platform uptime' },
  { value: 40, suffix: '+', label: 'High-growth teams served' },
  { value: 3, suffix: 'x', label: 'Faster time to launch' },
]

const features = [
  { icon: 'bolt', title: 'Built for scale', description: 'Millions of interactions with predictable, low-latency performance.' },
  { icon: 'shield', title: 'Secure & compliant', description: 'Encryption, audit trails, and access controls built for demanding, regulated industries.' },
  { icon: 'code', title: 'Developer-first', description: 'Clean APIs, SDKs, and docs so your team integrates in hours, not weeks.' },
  { icon: 'globe', title: 'Global by default', description: 'Reliable delivery and engagement wherever your customers are.' },
]

const testimonials = [
  { quote: 'Klimb has become part of our core stack. The reliability and the team behind it are exactly what a serious business needs.', name: 'Head of Engineering', company: 'Digital bank' },
  { quote: 'Their technology assessment gave us a clear, honest roadmap. We made better decisions because of it.', name: 'Founder & CEO', company: 'Payments startup' },
  { quote: 'Deliverability went from a constant worry to a solved problem. Onboarding took an afternoon.', name: 'VP Product', company: 'Lending platform' },
]
</script>

<template>
  <div class="bg-white">
    <!-- HERO -->
    <section class="container-page pt-24 lg:pt-28">
      <div class="grid overflow-hidden rounded-[2rem] border border-slate-100 shadow-card lg:grid-cols-2">
        <!-- Left panel -->
        <div class="panel-sky relative flex flex-col justify-center overflow-hidden px-7 py-14 sm:px-12 lg:py-20">
          <div class="pointer-events-none absolute inset-0 bg-dots opacity-70 [mask-image:radial-gradient(120%_120%_at_15%_0%,black,transparent_75%)]" />
          <div class="pointer-events-none absolute -left-16 -top-20 h-72 w-72 animate-float rounded-full bg-brand-300/30 blur-3xl" />
          <div class="pointer-events-none absolute -bottom-24 right-0 h-80 w-80 animate-float rounded-full bg-accent-300/25 blur-3xl" style="animation-delay: -3s" />
          <div class="pointer-events-none absolute right-8 top-10 h-24 w-24 rotate-12 rounded-3xl border border-brand-200/50 bg-white/20 backdrop-blur-sm" />
          <div class="relative z-10 flex flex-col">
          <span class="inline-flex w-fit animate-fade-up items-center gap-2 rounded-full border border-brand-200 bg-white/70 px-4 py-1.5 text-sm font-medium text-brand-700 backdrop-blur">
            <span class="h-1.5 w-1.5 rounded-full bg-brand-500" />
            SaaS products & technology consulting
          </span>
          <h1 class="mt-6 animate-fade-up text-[2.7rem] font-medium leading-[1.05] text-brand-900 sm:text-6xl">
            The technology behind
            <span class="gradient-text">ambitious businesses</span>
          </h1>
          <p class="mt-6 max-w-md animate-fade-up text-lg leading-relaxed text-slate-600">
            Klimb builds high-end software the best businesses run on — and guides their biggest
            technology decisions through expert consulting. One team behind both.
          </p>
          <div class="mt-8 flex animate-fade-up flex-col gap-3 sm:flex-row">
            <NuxtLink to="/contact" class="btn-accent">
              Get started
              <AppIcon name="arrow" class="h-4 w-4" />
            </NuxtLink>
            <NuxtLink to="/work" class="btn-soft">Learn more</NuxtLink>
          </div>
          <div class="mt-10 flex animate-fade-up items-center gap-4">
            <div class="flex gap-0.5 text-brand-600">
              <AppIcon v-for="n in 5" :key="n" name="spark" class="h-4 w-4" />
            </div>
            <p class="text-sm text-slate-600">Trusted by <span class="font-semibold text-brand-800">40+ high-growth teams</span></p>
          </div>
          </div>
        </div>
        <!-- Right image -->
        <div class="relative min-h-[22rem] lg:min-h-full">
          <img :src="img.hero" alt="A customer managing her finances on her phone" class="absolute inset-0 h-full w-full object-cover" loading="eager" />
        </div>
      </div>
    </section>

    <!-- FEATURES -->
    <section class="container-page py-16 lg:py-24">
      <div class="mx-auto max-w-2xl text-center">
        <p class="eyebrow eyebrow-center">Why Klimb</p>
        <h2 class="mt-4 text-4xl font-medium sm:text-5xl">Infrastructure teams <span class="gradient-text">actually trust</span></h2>
        <p class="mt-5 text-lg leading-relaxed text-slate-600">
          Everything you need to engage customers and deliver communications at serious scale.
        </p>
      </div>

      <div class="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="(f, i) in features"
          :key="f.title"
          v-reveal="i * 80"
          class="rounded-3xl border border-slate-100 bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-cardhover"
        >
          <span class="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 text-brand-700">
            <AppIcon :name="f.icon" class="h-6 w-6" />
          </span>
          <h3 class="mt-5 text-xl">{{ f.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-slate-600">{{ f.description }}</p>
        </div>
      </div>
    </section>

    <!-- SPLIT FEATURE -->
    <section class="container-page py-16 lg:py-24">
      <div class="grid items-center gap-12 lg:grid-cols-2">
        <div v-reveal class="relative order-2 overflow-hidden rounded-[2rem] border border-slate-100 shadow-card lg:order-1">
          <img :src="img.team" alt="The Klimb team collaborating" class="h-full min-h-[24rem] w-full object-cover" loading="lazy" />
        </div>
        <div v-reveal="80" class="order-1 lg:order-2">
          <p class="eyebrow">Products & consulting</p>
          <h2 class="mt-3 text-4xl font-medium sm:text-5xl">One team behind <span class="gradient-text">every decision</span></h2>
          <p class="mt-5 text-lg leading-relaxed text-slate-600">
            We build and operate the products we sell, so every recommendation is grounded in what
            actually works in production — not theory.
          </p>
          <ul class="mt-8 space-y-4">
            <li v-for="c in consultingPillars" :key="c.slug" class="flex items-start gap-4">
              <span class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                <AppIcon name="check" class="h-4 w-4" />
              </span>
              <span class="text-slate-700"><strong class="font-semibold text-brand-900">{{ c.title }}</strong> — {{ c.summary }}</span>
            </li>
          </ul>
          <NuxtLink to="/consulting" class="btn-accent mt-9">
            Explore consulting
            <AppIcon name="arrow" class="h-4 w-4" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- STATS -->
    <section class="container-page">
      <div class="rounded-[2rem] bg-brand-50 px-8 py-14 lg:px-16">
        <div class="grid grid-cols-3 gap-8">
          <div v-for="(s, i) in stats" :key="s.label" v-reveal="i * 80" class="text-center">
            <CountUp
              :value="s.value"
              :suffix="s.suffix"
              :decimals="s.decimals ?? 0"
              class="font-display text-5xl font-medium text-brand-800 lg:text-6xl"
            />
            <p class="mt-3 text-sm leading-tight text-slate-600">{{ s.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- PRODUCTS -->
    <section v-if="publicProducts.length" class="container-page py-16 lg:py-24">
      <div class="mx-auto max-w-2xl text-center">
        <p class="eyebrow eyebrow-center">Our products</p>
        <h2 class="mt-4 text-4xl font-medium sm:text-5xl">A focused suite, <span class="gradient-text">built to work together</span></h2>
      </div>

      <div class="mt-14 space-y-8">
        <div
          v-for="(p, i) in publicProducts"
          :key="p.slug"
          v-reveal
          class="grid items-center gap-8 overflow-hidden rounded-[2rem] border border-slate-100 bg-white p-6 shadow-card lg:grid-cols-2 lg:p-8"
        >
          <div :class="i % 2 === 1 ? 'lg:order-2' : ''">
            <div class="flex items-center gap-3">
              <span class="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-800 text-white">
                <AppIcon :name="productIcon[p.slug]" class="h-6 w-6" />
              </span>
              <span class="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">{{ p.category }}</span>
            </div>
            <h3 class="mt-5 text-4xl font-medium text-brand-900">{{ p.name }}</h3>
            <p class="mt-4 text-lg leading-relaxed text-slate-600">{{ p.oneLiner }}</p>
            <NuxtLink :to="`/products/${p.slug}`" class="btn-accent mt-7">
              Learn more
              <AppIcon name="arrow" class="h-4 w-4" />
            </NuxtLink>
          </div>
          <div class="relative overflow-hidden rounded-[1.5rem] border border-slate-100">
            <img :src="productImage[p.slug]" :alt="`${p.name} in use`" class="h-72 w-full object-cover lg:h-80" loading="lazy" />
          </div>
        </div>
      </div>
    </section>

    <!-- CONSULTING TEASER -->
    <section class="container-page py-16 lg:py-24">
      <div class="section-dark relative overflow-hidden rounded-[2.5rem] bg-brand-900 px-7 py-14 sm:px-12 lg:px-16 lg:py-20">
        <div class="pointer-events-none absolute inset-0 bg-dots opacity-[0.12] [mask-image:radial-gradient(120%_120%_at_85%_0%,black,transparent_70%)]" />
        <div class="pointer-events-none absolute -right-24 -top-24 h-80 w-80 animate-float rounded-full bg-brand-600/25 blur-3xl" />
        <div class="relative">
          <div class="max-w-2xl" v-reveal>
            <p class="eyebrow text-brand-300">Technology consulting</p>
            <h2 class="mt-4 text-4xl font-medium sm:text-5xl">Expert guidance for your biggest <span class="italic text-brand-300">technology decisions</span></h2>
            <p class="mt-5 text-lg leading-relaxed text-brand-200">
              Beyond our products, we help leaders evaluate their technology, assess their team,
              and put the right structure in place — grounded in what we run in production every day.
            </p>
          </div>

          <div class="mt-12 grid gap-5 md:grid-cols-3">
            <div
              v-for="(c, i) in consultingPillars"
              :key="c.slug"
              v-reveal="i * 80"
              class="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-white/20 hover:bg-white/[0.08]"
            >
              <span class="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/20 text-brand-200">
                <AppIcon :name="c.icon" class="h-5 w-5" />
              </span>
              <h3 class="mt-5 text-xl font-medium text-white">{{ c.title }}</h3>
              <p class="mt-3 text-sm leading-relaxed text-brand-200">{{ c.summary }}</p>
            </div>
          </div>

          <div class="mt-11 flex flex-col gap-3 sm:flex-row" v-reveal>
            <NuxtLink to="/contact?type=consulting" class="btn bg-white text-brand-900 hover:-translate-y-0.5 hover:bg-brand-50">
              Talk to us
              <AppIcon name="arrow" class="h-4 w-4" />
            </NuxtLink>
            <NuxtLink to="/consulting" class="btn border border-white/25 text-white hover:-translate-y-0.5 hover:bg-white/10">
              Explore consulting
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- CASE STUDIES -->
    <section v-if="featuredCases.length" class="bg-brand-50 py-16 lg:py-24">
      <div class="container-page">
        <div class="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div class="max-w-2xl">
            <p class="eyebrow">Proven results</p>
            <h2 class="mt-4 text-4xl font-medium sm:text-5xl">Real outcomes for <span class="gradient-text">real teams</span></h2>
          </div>
          <NuxtLink to="/work" class="btn-soft">
            View all work
            <AppIcon name="arrow" class="h-4 w-4" />
          </NuxtLink>
        </div>
        <div class="mt-12 grid gap-6 lg:grid-cols-3">
          <NuxtLink
            v-for="(cs, i) in featuredCases"
            :key="cs.id"
            :to="`/work/${cs.slug}`"
            v-reveal="i * 80"
            class="group flex flex-col rounded-3xl border border-slate-100 bg-white p-8 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-cardhover"
          >
            <span class="inline-flex w-fit items-center gap-2 rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-700">
              {{ cs.service }}
            </span>
            <h3 class="mt-5 text-2xl leading-snug">{{ cs.title }}</h3>
            <p class="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{{ cs.summary }}</p>
            <div class="mt-6 grid grid-cols-3 gap-3 border-t border-slate-100 pt-6">
              <div v-for="m in cs.metrics" :key="m.label">
                <p class="font-display text-2xl font-medium text-brand-700">{{ m.value }}</p>
                <p class="mt-1 text-[11px] leading-tight text-slate-500">{{ m.label }}</p>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- TESTIMONIALS -->
    <section class="container-page py-16 lg:py-24">
      <div class="mx-auto max-w-2xl text-center">
        <p class="eyebrow eyebrow-center">Trusted by builders</p>
        <h2 class="mt-4 text-4xl font-medium sm:text-5xl">Teams building on <span class="gradient-text">Klimb</span></h2>
      </div>
      <div class="mt-14 grid gap-6 lg:grid-cols-3">
        <figure
          v-for="(t, i) in testimonials"
          :key="t.quote"
          v-reveal="i * 80"
          class="flex flex-col rounded-3xl border border-slate-100 bg-white p-8 shadow-card"
        >
          <div class="flex gap-0.5 text-brand-600">
            <AppIcon v-for="n in 5" :key="n" name="spark" class="h-4 w-4" />
          </div>
          <blockquote class="mt-5 flex-1 font-display text-xl italic leading-relaxed text-brand-900">"{{ t.quote }}"</blockquote>
          <figcaption class="mt-6 border-t border-slate-100 pt-5 text-sm">
            <span class="font-semibold text-brand-900">{{ t.name }}</span>
            <span class="block text-slate-500">{{ t.company }}</span>
          </figcaption>
        </figure>
      </div>
    </section>

    <CtaSection
      title="Whatever you're building, we can help"
      subtitle="See our products in action or book a technology consultation with our team."
    />
  </div>
</template>
