<script setup lang="ts">
const config = useRuntimeConfig()
const siteUrl = (config.public.siteUrl as string).replace(/\/$/, '')
const ogImage = `${siteUrl}/feature-image.png`

useSeoMeta({
  ogSiteName: 'Klimb Technology',
  ogUrl: siteUrl,
  ogImage,
  ogImageWidth: 1554,
  ogImageHeight: 636,
  ogImageAlt: 'Klimb Technology',
  twitterCard: 'summary_large_image',
  twitterImage: ogImage,
  twitterImageAlt: 'Klimb Technology',
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
