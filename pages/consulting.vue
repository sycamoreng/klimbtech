<script setup lang="ts">
import { consultingPillars, consultingProcess, consultingAudience } from '~/utils/consulting'

useHead({
  title: 'Technology Consulting — Klimb Technology',
  meta: [
    {
      name: 'description',
      content:
        'Klimb technology consulting: independent evaluation of your tech stack, engineering talent, and processes — plus hands-on help to fix what matters.',
    },
  ],
})

const whyKlimb = [
  {
    icon: 'shield',
    title: 'Independent & objective',
    description: 'No vendor agenda. Just an honest, expert read on where you stand and what to do next.',
  },
  {
    icon: 'bolt',
    title: 'Builders, not slideware',
    description: 'We build real products at scale, so our advice is grounded in what actually works in production.',
  },
  {
    icon: 'globe',
    title: 'High-stakes depth',
    description: 'Deep experience with the reliability, security, and compliance bar that demanding industries \u2014 finance among them \u2014 require.',
  },
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="panel-sky relative overflow-hidden">
      <div class="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-200/40 blur-3xl" />
      <div class="pointer-events-none absolute -left-24 top-24 h-80 w-80 rounded-full bg-brand-100/60 blur-3xl" />
      <div class="container-page relative py-16 lg:py-24">
        <div class="mx-auto max-w-3xl text-center">
          <span class="badge">
            <span class="h-2 w-2 rounded-full bg-brand-500" />
            Technology Consulting
          </span>
          <h1 class="mt-6 text-5xl font-medium tracking-tight sm:text-6xl">
            <span class="text-brand-900">Expert eyes on your technology,</span>
            <span class="gradient-text"> team, and delivery</span>
          </h1>
          <p class="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-neutralgrey">
            Beyond our products, Klimb helps businesses make confident technology decisions — evaluating your stack,
            assessing your talent, and putting the right structure in place to scale.
          </p>
          <div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <NuxtLink to="/contact?type=consulting" class="btn-primary">
              Book a consultation
              <AppIcon name="arrow" class="h-4 w-4" />
            </NuxtLink>
            <a href="#services" class="btn-secondary">See what we offer</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Who it's for -->
    <section class="container-page py-16 lg:py-24">
      <div class="mx-auto max-w-2xl text-center">
        <p class="eyebrow">Who it's for</p>
        <h2 class="mt-3 text-4xl font-medium lg:text-5xl">Built for the people making the call</h2>
      </div>
      <div class="mt-12 grid gap-6 md:grid-cols-3">
        <div
          v-for="(a, i) in consultingAudience"
          :key="a.title"
          v-reveal="i * 80"
          class="rounded-2xl border border-brand-100 bg-white p-6 shadow-card"
        >
          <span class="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
            <AppIcon name="user" class="h-6 w-6" />
          </span>
          <h3 class="mt-4 text-lg font-semibold text-brand-800">{{ a.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-neutralgrey">{{ a.description }}</p>
        </div>
      </div>
    </section>

    <!-- Services / pillars -->
    <section id="services" class="bg-brand-50 py-16 lg:py-24">
      <div class="container-page">
        <div class="mx-auto max-w-2xl text-center">
          <p class="eyebrow">What we offer</p>
          <h2 class="mt-3 text-4xl font-medium lg:text-5xl">Three ways we help you move forward</h2>
        </div>
        <div class="mt-12 grid gap-6 lg:grid-cols-3">
          <div
            v-for="(p, i) in consultingPillars"
            :key="p.slug"
            v-reveal="i * 80"
            class="flex flex-col rounded-2xl border border-brand-100 bg-white p-8 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-cardhover"
          >
            <span class="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-800 text-white">
              <AppIcon :name="p.icon" class="h-6 w-6" />
            </span>
            <h3 class="mt-5 text-xl font-semibold text-brand-800">{{ p.title }}</h3>
            <p class="mt-3 text-sm leading-relaxed text-neutralgrey">{{ p.summary }}</p>
            <ul class="mt-5 space-y-2.5 border-t border-brand-100 pt-5">
              <li v-for="pt in p.points" :key="pt" class="flex items-start gap-2.5 text-sm text-brand-900">
                <span class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                  <AppIcon name="check" class="h-3.5 w-3.5" />
                </span>
                {{ pt }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- How we work -->
    <section class="container-page py-16 lg:py-24">
      <div class="mx-auto max-w-2xl text-center">
        <p class="eyebrow">How we work</p>
        <h2 class="mt-3 text-4xl font-medium lg:text-5xl">A clear path from question to outcome</h2>
      </div>
      <div class="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div v-for="(step, i) in consultingProcess" :key="step.step" v-reveal="i * 80" class="relative">
          <span class="text-5xl font-extrabold text-brand-100">{{ step.step }}</span>
          <h3 class="mt-2 text-lg font-semibold text-brand-800">{{ step.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-neutralgrey">{{ step.description }}</p>
        </div>
      </div>
    </section>

    <!-- Why Klimb -->
    <section class="bg-brand-50 py-16 lg:py-24">
      <div class="container-page grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p class="eyebrow">Why Klimb</p>
          <h2 class="mt-3 text-4xl font-medium lg:text-5xl">Advice from a team that ships</h2>
          <p class="mt-4 text-lg leading-relaxed text-neutralgrey">
            We don't just advise on technology — we build and run it. That means every recommendation is practical,
            tested, and focused on outcomes you can measure.
          </p>
        </div>
        <div class="space-y-4">
          <div
            v-for="w in whyKlimb"
            :key="w.title"
            class="flex gap-4 rounded-2xl border border-brand-100 bg-white p-6 shadow-card"
          >
            <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
              <AppIcon :name="w.icon" class="h-6 w-6" />
            </span>
            <div>
              <h3 class="font-semibold text-brand-800">{{ w.title }}</h3>
              <p class="mt-1 text-sm leading-relaxed text-neutralgrey">{{ w.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Engagement -->
    <section class="container-page py-16 lg:py-24">
      <div class="rounded-3xl border border-brand-100 bg-white p-8 shadow-card lg:p-12">
        <div class="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <p class="eyebrow">Engagements</p>
            <h2 class="mt-3 text-3xl font-medium lg:text-4xl">Flexible ways to work with us</h2>
            <p class="mt-4 text-base leading-relaxed text-neutralgrey">
              From a focused one-off assessment to an ongoing advisory relationship, we shape the engagement around
              your needs. Every consultation starts with a conversation — no obligation.
            </p>
            <div class="mt-6 flex flex-wrap gap-3">
              <span class="rounded-full bg-brand-50 px-4 py-2 text-sm font-medium text-brand-700">One-off assessment</span>
              <span class="rounded-full bg-brand-50 px-4 py-2 text-sm font-medium text-brand-700">Fractional advisory</span>
              <span class="rounded-full bg-brand-50 px-4 py-2 text-sm font-medium text-brand-700">Hands-on implementation</span>
            </div>
          </div>
          <div class="rounded-2xl bg-brand-800 p-8 text-center text-white">
            <p class="text-lg font-semibold">Ready to talk?</p>
            <p class="mt-2 text-sm text-brand-200">Tell us what you're weighing up and we'll take it from there.</p>
            <NuxtLink to="/contact?type=consulting" class="btn mt-6 w-full bg-white text-brand-800 hover:bg-brand-50">
              Book a consultation
              <AppIcon name="arrow" class="h-4 w-4" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
