// Language shortlist for the landing page "Indian Languages" section. Only
// Hindi is active today (the whole content/ tree targets Hindi/STAMP); the
// others are aspirational tiles to set expectations. Keep this list small
// and marketing-honest — don't imply support that doesn't exist.

export interface LanguageTile {
  id: string
  name: string
  nativeName: string
  script: string
  available: boolean
}

export const landingLanguages: LanguageTile[] = [
  { id: 'hindi', name: 'Hindi', nativeName: 'हिन्दी', script: 'Devanagari', available: true },
  { id: 'tamil', name: 'Tamil', nativeName: 'தமிழ்', script: 'Tamil', available: false },
  { id: 'telugu', name: 'Telugu', nativeName: 'తెలుగు', script: 'Telugu', available: false },
  { id: 'kannada', name: 'Kannada', nativeName: 'ಕನ್ನಡ', script: 'Kannada', available: false },
  { id: 'marathi', name: 'Marathi', nativeName: 'मराठी', script: 'Devanagari', available: false },
  { id: 'bengali', name: 'Bengali', nativeName: 'বাংলা', script: 'Bengali', available: false },
]
