<script setup lang="ts">
const { choice, hasDecided, load, set } = useConsent()
const visible = ref(false)

onMounted(() => {
  load()
  visible.value = !hasDecided.value
})

// Reopened from the footer "Cookie settings" link, which clears the choice.
watch(choice, (value) => {
  if (value === null) visible.value = true
})

function decide(next: 'accepted' | 'declined') {
  set(next)
  visible.value = false
}
</script>

<template>
  <Transition
    enter-active-class="transition duration-500 ease-out"
    enter-from-class="translate-y-6 opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition duration-300 ease-in"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="translate-y-6 opacity-0"
  >
    <div
      v-if="visible"
      class="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:px-6 sm:pb-6"
      role="dialog"
      aria-label="Cookie notice"
    >
      <div
        class="mx-auto flex max-w-4xl flex-col gap-4 rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-cardhover backdrop-blur sm:flex-row sm:items-center sm:gap-6 sm:p-6"
      >
        <div class="flex items-start gap-3">
          <span class="mt-0.5 hidden h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700 sm:flex">
            <AppIcon name="shield" class="h-4 w-4" />
          </span>
          <p class="text-sm leading-relaxed text-slate-600">
            We use essential cookies to run this site and optional analytics to understand how it is used.
            You can accept or decline analytics. Read our
            <NuxtLink to="/privacy" class="font-medium text-brand-700 underline underline-offset-2 hover:text-brand-800">privacy policy</NuxtLink>
            for details.
          </p>
        </div>
        <div class="flex shrink-0 gap-3 sm:ml-auto">
          <button type="button" class="btn border border-slate-200 text-slate-700 hover:bg-slate-50" @click="decide('declined')">
            Decline
          </button>
          <button type="button" class="btn-accent" @click="decide('accepted')">
            Accept
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>
