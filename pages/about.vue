<script setup lang="ts">
useHead({ title: 'About — Klimb Technology' })

const values = [
  {
    icon: 'shield',
    title: 'Reliability first',
    description: 'The systems we build carry critical workloads. We treat uptime and correctness as non-negotiable.',
  },
  {
    icon: 'code',
    title: 'Developer empathy',
    description: 'Great infrastructure disappears into the background. We sweat the API, the docs, and the details.',
  },
  {
    icon: 'user',
    title: 'Customer obsession',
    description: 'We win when our customers win. Their growth is the metric that matters most to us.',
  },
  {
    icon: 'bolt',
    title: 'Move with focus',
    description: 'We build a small number of products and make each one exceptional rather than spreading thin.',
  },
]
</script>

<template>
  <div>
    <section class="panel-sky relative overflow-hidden">
      <div class="pointer-events-none absolute -left-24 top-0 h-96 w-96 rounded-full bg-brand-200/40 blur-3xl" />
      <div class="container-page relative py-16 text-center lg:py-24">
        <p class="eyebrow eyebrow-center">About Klimb</p>
        <h1 class="mx-auto mt-4 max-w-3xl text-5xl font-medium tracking-tight lg:text-6xl">
          Building the infrastructure behind <span class="gradient-text">modern finance</span>
        </h1>
        <p class="mx-auto mt-5 max-w-2xl text-lg text-neutralgrey">
          Klimb Technology is a product and consulting company focused on the hard, unglamorous systems that ambitious,
          high-growth businesses rely on every day. We're selective about who we build for — finance is one of the
          industries we know deeply, but never the limit of what we do.
        </p>
      </div>
    </section>

    <section class="container-page py-16 lg:py-24">
      <div class="grid gap-12 lg:grid-cols-2">
        <div>
          <h2 class="text-4xl font-medium">Our mission</h2>
          <p class="mt-4 text-lg leading-relaxed text-neutralgrey">
            We believe the next generation of financial products should be built on infrastructure that's reliable,
            secure, and a joy to work with. Our mission is to build that foundation — so teams can spend their energy on
            their customers instead of reinventing plumbing.
          </p>
          <p class="mt-4 text-lg leading-relaxed text-neutralgrey">
            From customer engagement to communications, every product we build is engineered to
            handle scale, meet the bar for the most demanding industries, and integrate in hours.
          </p>
          <p class="mt-4 text-lg leading-relaxed text-neutralgrey">
            And because good technology decisions matter as much as good software, our consulting practice gives
            businesses an independent, expert view on their stack, their team, and how they build.
          </p>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="rounded-2xl bg-brand-800 p-6 text-white shadow-card">
            <p class="text-4xl font-extrabold">2</p>
            <p class="mt-1 text-sm text-brand-200">Products & consulting arms</p>
          </div>
          <div class="mt-6 rounded-2xl border border-brand-100 bg-white p-6 shadow-card">
            <p class="text-4xl font-extrabold text-brand-700">99.99%</p>
            <p class="mt-1 text-sm text-neutralgrey">Platform uptime</p>
          </div>
          <div class="rounded-2xl border border-brand-100 bg-white p-6 shadow-card">
            <p class="text-4xl font-extrabold text-brand-700">24/7</p>
            <p class="mt-1 text-sm text-neutralgrey">Engineer-led support</p>
          </div>
          <div class="mt-6 rounded-2xl bg-brand-600 p-6 text-white shadow-card">
            <p class="text-4xl font-extrabold">High-end</p>
            <p class="mt-1 text-sm text-brand-100">Built for demanding scale</p>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-brand-50 py-16 lg:py-24">
      <div class="container-page">
        <div class="mx-auto max-w-2xl text-center">
          <p class="eyebrow">What we value</p>
          <h2 class="mt-3 text-4xl font-medium lg:text-5xl">The principles behind everything we ship</h2>
        </div>
        <div class="mt-12 grid gap-6 sm:grid-cols-2">
          <div
            v-for="(v, i) in values"
            :key="v.title"
            v-reveal="i * 80"
            class="flex gap-4 rounded-2xl border border-brand-100 bg-white p-6 shadow-card"
          >
            <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
              <AppIcon :name="v.icon" class="h-6 w-6" />
            </span>
            <div>
              <h3 class="text-lg font-semibold text-brand-800">{{ v.title }}</h3>
              <p class="mt-2 text-sm leading-relaxed text-neutralgrey">{{ v.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <CtaSection
      title="Let's build together"
      subtitle="Whether you're scaling fast or just getting started, we'd love to show you what Klimb can do."
    />
  </div>
</template>
