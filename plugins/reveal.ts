import type { DirectiveBinding } from 'vue'

export default defineNuxtPlugin((nuxtApp) => {
  const observed = new WeakMap<Element, boolean>()
  let observer: IntersectionObserver | null = null

  if (import.meta.client) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer?.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
  }

  nuxtApp.vueApp.directive('reveal', {
    mounted(el: HTMLElement, binding: DirectiveBinding<number | undefined>) {
      el.classList.add('reveal')
      if (typeof binding.value === 'number' && binding.value > 0) {
        el.style.transitionDelay = `${binding.value}ms`
      }
      if (!observer) {
        el.classList.add('is-visible')
        return
      }
      if (!observed.has(el)) {
        observed.set(el, true)
        observer.observe(el)
      }
    },
    unmounted(el: HTMLElement) {
      observer?.unobserve(el)
    },
  })
})
