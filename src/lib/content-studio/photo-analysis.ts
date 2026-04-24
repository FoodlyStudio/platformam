import { getOpenAI } from '@/lib/openai'
import type { PhotoMetadata } from './types'

export async function analyzePhoto(imageUrl: string): Promise<PhotoMetadata> {
  const openai = getOpenAI()

  const res = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'image_url',
            image_url: { url: imageUrl, detail: 'low' },
          },
          {
            type: 'text',
            text: `Przeanalizuj to zdjęcie i zwróć TYLKO czysty JSON:
{
  "description": "opis zdjęcia po polsku (2-3 zdania)",
  "mood": "warm|cool|energetic|calm|luxurious|playful|professional",
  "category": "food|product|team|interior|event|behind_scenes|lifestyle|promotional",
  "quality_score": 1-10,
  "suggested_uses": ["post produktowy", "historia marki"],
  "color_palette": ["#hex1", "#hex2", "#hex3"],
  "composition_notes": "krótka ocena kompozycji",
  "content_potential": "opis jaki typ treści najlepiej pasuje"
}`,
          },
        ],
      },
    ],
    max_tokens: 500,
  })

  try {
    return JSON.parse(res.choices[0].message.content!)
  } catch {
    return {
      description: 'Zdjęcie zostało przesłane.',
      mood: 'professional',
      category: 'lifestyle',
      quality_score: 7,
      suggested_uses: ['post ogólny'],
      color_palette: [],
      composition_notes: '',
      content_potential: 'Może być użyte do różnych typów postów.',
    }
  }
}
