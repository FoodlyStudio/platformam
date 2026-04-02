import { NextRequest, NextResponse } from 'next/server'
import { getOpenAI } from '@/lib/openai'

export async function POST(req: NextRequest) {
  try {
    const { topic, slideCount = 7, segment = 'ogólny', tone = 'premium', styleImageBase64, styleImageMimeType } = (await req.json()) as {
      topic: string
      slideCount?: number
      segment?: string
      tone?: string
      styleImageBase64?: string
      styleImageMimeType?: string
    }

    if (!topic?.trim()) {
      return NextResponse.json({ error: 'topic required' }, { status: 400 })
    }

    const n = Math.min(Math.max(slideCount, 5), 10)

    const styleNote = styleImageBase64
      ? `\nMasz dołączone zdjęcie referencyjne stylu. Przeanalizuj je i w każdym polu "note" uwzględnij konkretne wskazówki nawiązujące do tego stylu (paleta kolorów, układ tekstu, rodzaj grafik, ogólny klimat wizualny). Designer ma odtworzyć ten styl w Canva.`
      : ''

    const SYSTEM_PROMPT = `Stwórz karuzelę na Instagram dla firmy AM Automations (firma technologiczna, budujemy strony, systemy, chatboty AI dla firm usługowych).
Temat: ${topic}. Liczba slajdów: ${n}. Segment: ${segment}. Ton: ${tone}.

Slajd 1 = hook (max 15 słów, zatrzymuje scrollowanie, intrygujące pytanie lub szokujące twierdzenie).
Slajdy 2–${n - 1} = treść (max 30 słów per slajd, konkretne fakty, bez lania wody, każdy slajd = 1 myśl).
Ostatni slajd (${n}) = CTA (konkretna akcja: "Wpisz X w komentarzu", "Zapisz ten post", "Wyślij do kogoś kto to potrzebuje" itp.).

Ton: ${tone}, technologiczny, bezpośredni. Nigdy nie używaj emotikonów.
Każdy slajd ma też note = krótka wskazówka dla designera (kolor tła, układ, element graficzny).${styleNote}

Odpowiedz WYŁĄCZNIE prawidłowym JSON:
{
  "slides": [
    {"number": 1, "text": "...", "note": "design hint dla grafika"},
    {"number": 2, "text": "...", "note": "..."}
  ]
}`

    type MessageContent =
      | string
      | Array<
          | { type: 'text'; text: string }
          | { type: 'image_url'; image_url: { url: string; detail: 'low' } }
        >

    const userContent: MessageContent = styleImageBase64
      ? [
          {
            type: 'image_url',
            image_url: {
              url: `data:${styleImageMimeType ?? 'image/jpeg'};base64,${styleImageBase64}`,
              detail: 'low',
            },
          },
          { type: 'text', text: `Temat karuzeli: ${topic}` },
        ]
      : `Temat karuzeli: ${topic}`

    const completion = await getOpenAI().chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userContent },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.75,
      max_tokens: 1200,
    })

    const result = JSON.parse(completion.choices[0]?.message?.content ?? '{}')
    return NextResponse.json({ slides: result.slides ?? [] })
  } catch (err) {
    console.error('[generate-carousel]', err)
    return NextResponse.json({ error: 'Failed to generate carousel' }, { status: 500 })
  }
}
