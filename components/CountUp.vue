<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    value: number
    prefix?: string
    suffix?: string
    decimals?: number
    duration?: number
  }>(),
  { prefix: '', suffix: '', decimals: 0, duration: 1600 },
)

function format(n: number): string {
  return props.prefix + n.toLocaleString('en-US', {
    minimumFractionDigits: props.decimals,
    maximumFractionDigits: props.decimals,
  }) + props.suffix
}

const display = ref(format(props.value))
const el = ref<HTMLElement | null>(null)

onMounted(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced || !el.value) {
    display.value = format(props.value)
    return
  }
  display.value = format(0)
  let started = false
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && !started) {
          started = true
          animate()
          observer.disconnect()
        }
      }
    },
    { threshold: 0.4 },
  )
  observer.observe(el.value)

  function animate() {
    const start = performance.now()
    const from = 0
    const to = props.value
    function tick(now: number) {
      const t = Math.min(1, (now - start) / props.duration)
      const eased = 1 - Math.pow(1 - t, 3)
      display.value = format(from + (to - from) * eased)
      if (t < 1) requestAnimationFrame(tick)
      else display.value = format(to)
    }
    requestAnimationFrame(tick)
  }
})
</script>

<template>
  <span ref="el">{{ display }}</span>
</template>
