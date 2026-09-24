<script setup lang="ts">
import type { LegalSection } from '~/utils/legal'
import { LEGAL_CONTACT_EMAIL, LEGAL_ENTITY } from '~/utils/legal'

useHead({
  title: 'Terms of Service — Klimb Technology',
  meta: [
    {
      name: 'description',
      content: 'The terms that govern your use of the Klimb Technology website and services.',
    },
  ],
})

const sections: LegalSection[] = [
  {
    heading: 'Acceptance of these terms',
    paragraphs: [
      `By using the ${LEGAL_ENTITY} website, you agree to these terms. If you do not agree, please do not use the site. We may update these terms from time to time, and continued use of the site means you accept the current version.`,
    ],
  },
  {
    heading: 'Use of the site',
    paragraphs: ['You agree to use this site lawfully and respectfully. In particular, you agree not to:'],
    bullets: [
      'Attempt to disrupt, damage, or gain unauthorised access to the site or its systems.',
      'Submit false information or impersonate another person or organisation.',
      'Use the site to send spam or collect information about other users.',
    ],
  },
  {
    heading: 'Products and consulting',
    paragraphs: [
      'Information on this site about our products and consulting services is provided for general guidance. Specific terms, pricing, and commitments for any product or engagement are set out in a separate agreement, which takes precedence over anything described here.',
    ],
  },
  {
    heading: 'Intellectual property',
    paragraphs: [
      `The content, branding, and design of this site belong to ${LEGAL_ENTITY} or our licensors and are protected by law. You may view and share our content for personal, non-commercial purposes, but you may not copy, republish, or reuse it commercially without our permission.`,
    ],
  },
  {
    heading: 'Third-party links',
    paragraphs: [
      'Our site may link to services we do not control. We are not responsible for the content or practices of those sites, and visiting them is at your own risk.',
    ],
  },
  {
    heading: 'Disclaimer and liability',
    paragraphs: [
      'The site is provided on an "as is" basis without warranties of any kind. To the fullest extent permitted by law, we are not liable for any loss arising from your use of, or inability to use, the site.',
    ],
  },
  {
    heading: 'Contact us',
    paragraphs: [
      `Questions about these terms? Email us at ${LEGAL_CONTACT_EMAIL} and we'll be happy to help.`,
    ],
  },
]
</script>

<template>
  <LegalPage
    eyebrow="Legal"
    title="Terms of Service"
    intro="These terms set out the rules for using our website. Please read them carefully."
    :sections="sections"
  />
</template>
