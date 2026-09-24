export interface ConsultingPillar {
  slug: string
  title: string
  icon: string
  summary: string
  points: string[]
}

export interface ProcessStep {
  step: string
  title: string
  description: string
}

export const consultingPillars: ConsultingPillar[] = [
  {
    slug: 'evaluation',
    title: 'Technology & architecture evaluation',
    icon: 'layers',
    summary:
      'A rigorous, outside-in audit of your existing tech stack, systems, and engineering practices — surfacing risk and opportunity.',
    points: [
      'Stack, systems, and infrastructure review',
      'Scalability, reliability, and security assessment',
      'Prioritized findings and a clear remediation roadmap',
    ],
  },
  {
    slug: 'talent',
    title: 'Talent assessment',
    icon: 'user',
    summary:
      'An objective read on the capability of your technical team or candidates, so you can hire and grow with confidence.',
    points: [
      'Skills and seniority evaluation for teams or hires',
      'Org gaps and capability mapping',
      'Hiring bar calibration and interview support',
    ],
  },
  {
    slug: 'structure',
    title: 'Structure & process',
    icon: 'flow',
    summary:
      'We design and put in place the engineering structure, standards, and processes that let your team ship reliably at pace.',
    points: [
      'Team topology and engineering structure',
      'Delivery process, standards, and rituals',
      'Quality, security, and compliance practices',
    ],
  },
]

export const consultingProcess: ProcessStep[] = [
  {
    step: '01',
    title: 'Discovery',
    description: 'We align on your goals, constraints, and the questions you need answered.',
  },
  {
    step: '02',
    title: 'Assessment',
    description: 'We dig into your systems, team, and processes with structured, evidence-based review.',
  },
  {
    step: '03',
    title: 'Recommendations',
    description: 'You get a clear, prioritized set of findings and a practical roadmap forward.',
  },
  {
    step: '04',
    title: 'Implementation',
    description: 'Optionally, we roll up our sleeves and help put the recommendations into practice.',
  },
]

export const consultingAudience: { title: string; description: string }[] = [
  {
    title: 'Founders & CEOs',
    description: 'Non-technical founders who need a trusted expert view on the tech they are betting the business on.',
  },
  {
    title: 'CTOs & engineering leaders',
    description: 'Leaders who want an independent assessment of their architecture, team, or delivery.',
  },
  {
    title: 'Investors & boards',
    description: 'Stakeholders needing technical due diligence before an investment or a key decision.',
  },
]
