// Loads privacy-friendly analytics ONLY after the visitor accepts cookies.
// Nothing is loaded until both conditions are met:
//   1. an analytics domain is configured (public.analyticsId), and
//   2. the visitor has accepted analytics in the cookie banner.
// This keeps the consent choice authoritative — declining means no analytics
// script is ever added to the page.
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const analyticsId = config.public.analyticsId as string
  if (!analyticsId) return

  const { analyticsAllowed, load } = useConsent()
  load()

  let injected = false
  function inject() {
    if (injected || !analyticsAllowed.value) return
    injected = true
    const script = document.createElement('script')
    script.defer = true
    script.setAttribute('data-domain', analyticsId)
    script.src = 'https://plausible.io/js/script.js'
    document.head.appendChild(script)
  }

  watch(analyticsAllowed, inject, { immediate: true })
})
