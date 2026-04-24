import { getOpenAI } from '@/lib/openai'
import type { BrandVoiceDocument, PhotoMetadata, PostVariants, Platform, PostGoal } from './types'

interface PostGenerationInput {
  brandVoice: BrandVoiceDocument
  photoMetadata?: PhotoMetadata
  platform: Platform
  postGoal: PostGoal
  topic?: string
  specialInstructions?: string
}

const PLATFORM_GUIDE: Record<Platform, string> = {
  instagram: 'Instagram: max 2200 znaków, 3-5 akapitów, emoji dozwolone, zakończ pytaniem angażującym, hashtagi na końcu (10-15)',
  facebook: 'Facebook: 150-300 znaków hook, potem rozwinięcie, hashtagi (3-5), CTA do kontaktu lub linku',
  linkedin: 'LinkedIn: profesjonalny ton, historia + insight biznesowy, minimalne emoji, zakończ wartościowym pytaniem, hashtagi (3-5)',
  google_business: 'Google Business: max 1500 znaków, skupiony na ofercie lub wydarzeniu, konkretne CTA',
}

const GOAL_GUIDE: Record<PostGoal, string> = {
  engagement: 'Cel: zaangażowanie. Zakończ pytaniem, wywołaj reakcję, stwórz dyskusję.',
  education: 'Cel: edukacja. Daj konkretną wartość, tip lub wiedzę możliwą do zastosowania od razu.',
  promotion: 'Cel: promocja. Pokaż wartość, nie cenę. CTA do kontaktu lub strony.',
  storytelling: 'Cel: storytelling. Real, autentyczne, emocjonalne. Behind the scenes lub historia klienta.',
  social_proof: 'Cel: social proof. Wynik, testimonial, case study. Konkrety i liczby.',
}

export async function generatePost(input: PostGenerationInput): Promise<PostVariants> {
  const openai = getOpenAI()

  const photoContext = input.photoMetadata
    ? `ZDJĘCIE DO POSTA:
- Opis: ${input.photoMetadata.description}
- Nastrój: ${input.photoMetadata.mood}
- Kategoria: ${input.photoMetadata.category}
- Potencjał: ${input.photoMetadata.content_potential}`
    : 'BRAK ZDJĘCIA — post tekstowy lub z AI-generated image'

  const systemPrompt = `Jesteś ekspertem od content marketingu dla polskich firm B2B i B2C.
Piszesz posty w stylu i głosie marki, naturalnie po polsku.
Nigdy nie brzmisz jak AI. Nie używasz korporacyjnego bełkotu.
Piszesz jak człowiek który zna firmę od środka.`

  const userPrompt = `BRAND VOICE MARKI:
${JSON.stringify(input.brandVoice, null, 2)}

${photoContext}

PLATFORMA: ${input.platform}
${PLATFORM_GUIDE[input.platform]}

CEL: ${input.postGoal}
${GOAL_GUIDE[input.postGoal]}
${input.topic ? `\nTEMAT: ${input.topic}` : ''}
${input.specialInstructions ? `\nDODATKOWE WSKAZÓWKI: ${input.specialInstructions}` : ''}

ZADANIE: Wygeneruj TRZY różne warianty posta. Każdy z innym kątem, hookiem i strukturą, ale wszystkie brzmią jak ta marka.

Zwróć JSON:
{
  "variants": [
    {
      "caption": "pełny tekst posta",
      "hook": "pierwsze zdanie zatrzymujące scroll",
      "hashtags": ["#hashtag1"],
      "cta": "call to action",
      "angle": "nazwa kąta (np. 'edukacyjny')",
      "why": "1 zdanie dlaczego ten wariant może zadziałać"
    }
  ],
  "image_prompt_suggestion": "prompt do generacji obrazu AI (po angielsku, no text, no words)",
  "best_posting_time": "kiedy opublikować dla tej branży i platformy"
}

ZAKAZANE SŁOWA: ${input.brandVoice.forbidden_words.join(', ')}
STYL: ${input.brandVoice.tone.keywords.join(', ')}`

  const res = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    response_format: { type: 'json_object' },
    temperature: 0.85,
    max_tokens: 2000,
  })

  return JSON.parse(res.choices[0].message.content!)
}
