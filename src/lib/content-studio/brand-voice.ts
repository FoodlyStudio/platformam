import { getOpenAI } from '@/lib/openai'
import type { BrandVoiceDocument } from './types'

export const ONBOARDING_QUESTIONS = [
  'Jak nazywa się Twoja firma i czym się zajmujecie? Opisz w 2-3 zdaniach, jak byś tłumaczył znajomemu.',
  'Kim jest Wasz idealny klient? Opisz go konkretnie — wiek, co robi, co go boli.',
  'Jakie 3 słowa najlepiej opisują Wasz styl komunikacji? (np. "profesjonalny, ciepły, bezpośredni")',
  'Jakich słów lub zwrotów NIGDY nie używacie w komunikacji?',
  'Jakie emocje chcecie wywoływać u odbiorców Waszych postów?',
  'Podaj przykład posta z social mediów, który Ci się podoba — skopiuj tekst lub opisz.',
  'O czym chcecie edukować swoich klientów? Jaką wiedzą możecie się dzielić?',
  'Jakie są Wasze 3 największe sukcesy lub osiągnięcia, które warto pokazywać?',
  'Co Was wyróżnia od konkurencji? Jedno konkretne zdanie.',
  'Jakie hashtagi branżowe używacie lub chcielibyście używać?',
  'Jak często chcecie publikować i na jakich platformach? (np. IG codziennie, LI 3×/tydzień)',
  'Czy jest coś ważnego o Waszej firmie, o co nie zapytałem?',
]

export async function getChatResponse(
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }>,
  currentQuestionIndex: number,
  userMessage: string,
): Promise<{ response: string; shouldAdvance: boolean }> {
  const openai = getOpenAI()

  const systemPrompt = `Jesteś pomocnym asystentem prowadzącym wywiad o brand voice firmy.
Zadajesz pytania jeden po drugim. Pytanie ${currentQuestionIndex + 1} z ${ONBOARDING_QUESTIONS.length}: "${ONBOARDING_QUESTIONS[currentQuestionIndex]}".

Zasady:
- Jeśli odpowiedź jest zbyt krótka lub niejasna — dopytaj po polsku (max 1 zdanie).
- Jeśli odpowiedź jest wystarczająca — potwierdź krótko i napisz "ADVANCE" na początku nowej linii.
- Bądź ciepły, naturalny, po polsku.
- Nie zadawaj następnego pytania — system zrobi to automatycznie.`

  const messages = [
    { role: 'system' as const, content: systemPrompt },
    ...conversationHistory,
    { role: 'user' as const, content: userMessage },
  ]

  const res = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages,
    temperature: 0.7,
    max_tokens: 300,
  })

  const text = res.choices[0].message.content ?? ''
  const shouldAdvance = text.includes('ADVANCE')
  const response = text.replace('ADVANCE', '').trim()

  return { response, shouldAdvance }
}

export async function generateBrandVoice(
  answers: Record<number, string>,
  businessType: string,
): Promise<BrandVoiceDocument> {
  const openai = getOpenAI()

  const answersText = ONBOARDING_QUESTIONS.map((q, i) =>
    `P${i + 1}: ${q}\nO: ${answers[i] || '(brak odpowiedzi)'}`
  ).join('\n\n')

  const prompt = `Jesteś ekspertem od brand voice i content marketingu dla polskich firm.
Na podstawie poniższych odpowiedzi właściciela firmy, wygeneruj szczegółowy Brand Voice Document w JSON.

TYP BIZNESU: ${businessType}

ODPOWIEDZI:
${answersText}

Wygeneruj JSON zgodny z tym interfejsem TypeScript:
{
  business_summary: string,
  business_type: string, // użyj przekazanego typu
  target_audience: { description: string, pain_points: string[], desires: string[] },
  tone: { keywords: string[], style: "formal"|"casual"|"friendly"|"expert"|"inspirational", energy: "high"|"medium"|"calm" },
  forbidden_words: string[],
  content_pillars: [{ name: string, description: string, example_topics: string[] }], // max 5
  cta_style: string,
  hashtags: { core: string[], rotating: string[] },
  unique_value: string,
  posting_schedule: { frequency: string, platforms: string[], best_times: string[] },
  example_caption_style: string,
  language_examples: { good: string[], bad: string[] }
}

Bądź konkretny. Pisz po polsku. Odpowiedz TYLKO czystym JSON.`

  const res = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
    response_format: { type: 'json_object' },
    temperature: 0.7,
  })

  return JSON.parse(res.choices[0].message.content!)
}
