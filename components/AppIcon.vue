<script setup lang="ts">
defineProps<{ name: string; class?: string }>()

const paths: Record<string, string> = {
  user: 'M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM12 14c-4 0-7 2-7 5v1h14v-1c0-3-3-5-7-5Z',
  flow: 'M4 7h6M4 7a2 2 0 1 0 0-.01M14 7h6M20 7a2 2 0 1 1 0-.01M4 17h6M4 17a2 2 0 1 0 0-.01M14 17h6M20 17a2 2 0 1 1 0-.01M12 9v6',
  megaphone: 'M3 11v2a1 1 0 0 0 1 1h2l4 4V6L6 10H4a1 1 0 0 0-1 1ZM14 8a4 4 0 0 1 0 8M16 5a7 7 0 0 1 0 14',
  spark: 'M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18',
  chart: 'M4 20V4M4 20h16M8 20v-6M13 20V9M18 20v-9',
  shield: 'M12 3 5 6v5c0 4 3 7 7 8 4-1 7-4 7-8V6l-7-3ZM9.5 12l1.8 1.8L15 10',
  code: 'M9 8l-4 4 4 4M15 8l4 4-4 4',
  inbox: 'M4 13h4l1 3h6l1-3h4M4 13V6a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v7M4 13v5a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-5',
  template: 'M4 5h16v14H4zM4 9h16M9 9v10',
  bolt: 'M13 3 5 13h6l-1 8 8-10h-6l1-8Z',
  check: 'M5 13l4 4L19 7',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  external: 'M14 5h5v5M19 5l-8 8M12 5H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-6',
  chevron: 'M6 9l6 6 6-6',
  lock: 'M7 11V8a5 5 0 0 1 10 0v3M6 11h12v9H6z',
  globe: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18',
  layers: 'M12 3 3 8l9 5 9-5-9-5ZM3 13l9 5 9-5M3 17l9 5 9-5',
}
</script>

<template>
  <svg
    :class="$props.class"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.6"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path :d="paths[name] || paths.check" />
  </svg>
</template>
