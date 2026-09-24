<script setup lang="ts">
import type { LegalSection } from '~/utils/legal'
import { LEGAL_CONTACT_EMAIL, LEGAL_ENTITY } from '~/utils/legal'

useHead({
  title: 'Privacy Policy — Klimb Technology',
  meta: [
    {
      name: 'description',
      content: 'How Klimb Technology collects, uses, and protects the personal information you share with us.',
    },
  ],
})

const sections: LegalSection[] = [
  {
    heading: 'Information we collect',
    paragraphs: [
      'We collect only the information we need to respond to you and improve our services. This falls into a few categories:',
    ],
    bullets: [
      'Details you give us directly — such as your name, work email, company, and message when you request a demo, book a consultation, or subscribe to our newsletter.',
      'Basic usage information — such as which pages you visit and how you arrived, collected only where you have accepted optional analytics.',
      'Technical information your browser sends automatically, such as your device type and approximate region, used to keep the site secure and reliable.',
    ],
  },
  {
    heading: 'How we use your information',
    bullets: [
      'To reply to your enquiries and provide the products or consulting you ask about.',
      'To send you the updates you subscribed to, which you can stop at any time.',
      'To understand how the site is used so we can improve it — only with your consent.',
      'To protect the site and our customers against fraud and abuse.',
    ],
  },
  {
    heading: 'Cookies and analytics',
    paragraphs: [
      'We use a small number of essential cookies that are required for the site to function. We also offer optional analytics cookies that help us understand how visitors use the site.',
      'Analytics only run after you accept them in the cookie banner. If you decline, no analytics are loaded, and you can change your choice at any time using the "Cookie settings" link in the footer.',
    ],
  },
  {
    heading: 'How we share information',
    paragraphs: [
      'We do not sell your personal information. We share it only with trusted service providers who help us operate the site and communicate with you — for example our hosting and email delivery partners — and only to the extent they need it to perform those services. We may also disclose information where required by law.',
    ],
  },
  {
    heading: 'How long we keep it',
    paragraphs: [
      'We keep enquiry and subscription details for as long as needed to serve you and to meet our legal and accounting obligations, after which we securely delete or anonymise them.',
    ],
  },
  {
    heading: 'Your rights',
    paragraphs: [
      'Depending on where you live, you may have the right to access, correct, or delete the personal information we hold about you, and to object to or restrict how we use it. To exercise any of these rights, just get in touch.',
    ],
  },
  {
    heading: 'Contact us',
    paragraphs: [
      `If you have any questions about this policy or your information, email us at ${LEGAL_CONTACT_EMAIL} and a member of the ${LEGAL_ENTITY} team will respond.`,
    ],
  },
]
</script>

<template>
  <LegalPage
    eyebrow="Legal"
    title="Privacy Policy"
    intro="Your trust matters to us. This policy explains what information we collect, why we collect it, and the choices you have."
    :sections="sections"
  />
</template>
