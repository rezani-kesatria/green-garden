// GGIS — brand, voice and contact. Single source of truth for site-wide copy.
// All content adapted from the GGIS Company Profile 2026.

export const brand = {
  name: 'GreenGarden',
  suffix: 'Integrated Services',
  legalName: 'GGIS Sdn. Bhd.',
  tagline: 'Creating Sustainable Outdoor Environments for Future Developments.',
}

export const hero = {
  eyebrow: 'GreenGarden Integrated Services — Landscape Consultancy & IFM',
  // Split by line so the masked reveal can honour deliberate breaks
  headline: ['Sustainable outdoor', 'environments, designed', 'with intent.'],
  support:
    'An integrated landscape technical & IFM solutions provider — planning, designing and caring for gardens in offices, condominiums and public places across Malaysia & Singapore.',
  meta: [
    'Iskandar Puteri · Johor',
    'Projects across Singapore & Malaysia',
    'Consultancy + Command Centre',
  ],
  image:
    'https://images.unsplash.com/photo-1508964942454-1a56651d54ac?q=80&w=2400&auto=format&fit=crop',
  imageAlt:
    'Lush architectural gardens at dusk — sustainable landscape design for public places',
}

// Vision, typeset large in the Manifesto. `em: true` renders italic Fraunces.
export const vision = [
  { text: 'A trusted, ' },
  { text: 'forward-thinking', em: true },
  { text: ' landscape consultancy — delivering sustainable, practical, high-quality outdoor environments for modern developments.' },
]

export const mission = [
  'Professional, innovative landscape consultancy for every scale of development.',
  'Sustainable, environmentally responsible outcomes as the default — never the exception.',
  'Practical designs engineered for long-term functionality and ease of care.',
  'Strong coordination and clear communication through every project stage.',
  'Outdoor environments that elevate project identity and everyday experience.',
]

export const values = [
  'Professionalism',
  'Sustainability',
  'Innovation',
  'Commitment',
  'Practicality',
]

export const studio = {
  eyebrow: 'The Studio',
  heading: 'Practical by discipline, green by conviction.',
  intro:
    'GGIS combines creative thinking, technical understanding and real site experience — supporting developers, commercial clients, government agencies and private estates from first sketch to long-term care.',
  image: '/projects/studio-marina-walkway.jpg',
  imageAlt:
    'Marina One, Singapore — layered tropical planting along a water-feature walkway, designed by GGIS',
  glance: [
    { label: 'Headquarters', value: 'Medini, Iskandar Puteri' },
    { label: 'Working across', value: 'Singapore & Malaysia' },
    { label: 'Portfolio', value: '10 projects · 2025–2026' },
  ],
}

export const contact = {
  phone: '+60 10-903 1808',
  phoneHref: 'tel:+60109031808',
  email: 'admin@greengarden.my',
  emailHref:
    'mailto:admin@greengarden.my?subject=Project%20enquiry%20—%20GreenGarden%20Integrated%20Services',
  website: 'greengarden.my',
  addressLines: [
    'Level 6 (Infinity8), Tower A, Menara IIB',
    'Persiaran Medini Sentral 1, Bandar Medini Iskandar',
    '79250 Iskandar Puteri, Johor, Malaysia',
  ],
}

export const nav = [
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Process', href: '#process' },
  { label: 'Studio', href: '#studio' },
  { label: 'Contact', href: '#contact' },
]

export const cta = {
  // Rendered as display copy in the closing band; `em` = italic Fraunces
  tagline: [
    { text: 'Creating ' },
    { text: 'sustainable', em: true },
    { text: ' outdoor environments for future developments.' },
  ],
  primary: { label: 'Start a Project', href: 'mailto:admin@greengarden.my?subject=Project%20enquiry' },
  secondary: { label: 'Call +60 10-903 1808', href: 'tel:+60109031808' },
}
