<template>
  <div class="flex min-h-screen flex-col">
    <TheHeader />
    <main class="flex-1 pt-16 lg:pt-20">
      <slot />
    </main>
    <TheFooter />
    <CookieConsent />
  </div>
</template>
