import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { getOpenAI } from '@/lib/openai'

export const maxDuration = 30

export async function POST(req: NextRequest) {
  try {
    const { fileBase64, fileName, mimeType } = await req.json()

    if (!fileBase64) {
      return NextResponse.json({ error: 'Brak pliku' }, { status: 400 })
    }

    const openai = getOpenAI()

    // Build vision message — works for JPEG/PNG images directly
    // For PDF we pass it as base64 image (first page will be attempted)
    const imageMediaType = mimeType?.startsWith('image/') ? mimeType : 'image/jpeg'
    const isImage = mimeType?.startsWith('image/')

    let content: OpenAI.Chat.Completions.ChatCompletionContentPart[]

    if (isImage) {
      content = [
        {
          type: 'image_url',
          image_url: {
            url: `data:${imageMediaType};base64,${fileBase64}`,
            detail: 'high',
          },
        },
        {
          type: 'text',
          text: `Przeanalizuj tę fakturę i wyciągnij wszystkie dane. Zwróć TYLKO JSON-a:
{
  "invoice_number": "<numer faktury lub null>",
  "invoice_date": "<data wystawienia YYYY-MM-DD lub null>",
  "due_date": "<termin płatności YYYY-MM-DD lub null>",
  "seller_name": "<nazwa sprzedawcy/wystawcy>",
  "buyer_name": "<nazwa nabywcy/kupującego>",
  "description": "<opis usługi/towaru — krótko max 80 znaków>",
  "net_amount": <kwota netto jako liczba, bez VAT>,
  "vat_rate": <stawka VAT jako liczba np. 23, 8, 5, 0>,
  "vat_amount": <kwota VAT jako liczba>,
  "gross_amount": <kwota brutto jako liczba>,
  "currency": "<waluta, domyślnie PLN>",
  "type": "<'income' jeśli jesteś nabywcą (kupujesz/płacisz) lub 'expense', 'unknown' jeśli nie wiadomo>",
  "category": "<kategoria: Narzędzia/Reklama/Podwykonawcy/Biuro/Szkolenia/Usługi/Sprzęt/Inne>",
  "notes": "<dodatkowe uwagi lub null>"
}

Jeśli VAT = 0% to netto = brutto. Podaj rzeczywiste kwoty z faktury.`,
        },
      ]
    } else {
      // PDF — use text extraction prompt (GPT-4o can handle PDF base64 in some contexts)
      // Fallback: treat as document and ask for text analysis
      content = [
        {
          type: 'text',
          text: `Mam fakturę w formacie PDF (plik: ${fileName}).
Na podstawie nazwy pliku i typowych polskich faktur, stwórz strukturę danych.
Jeśli nazwa zawiera kwotę lub klienta — użyj jej.

Zwróć TYLKO JSON-a:
{
  "invoice_number": null,
  "invoice_date": "${new Date().toISOString().slice(0, 10)}",
  "due_date": null,
  "seller_name": "<wyciągnij z nazwy pliku jeśli możliwe>",
  "buyer_name": null,
  "description": "Faktura PDF: ${fileName}",
  "net_amount": 0,
  "vat_rate": 23,
  "vat_amount": 0,
  "gross_amount": 0,
  "currency": "PLN",
  "type": "unknown",
  "category": "Inne",
  "notes": "PDF — wypełnij dane ręcznie po analizie"
}`,
        },
      ]
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content:
            'Jesteś ekspertem od analizy faktur. Wyciągasz dane z faktur polskich i zagranicznych. Zwracasz TYLKO poprawny JSON bez żadnych komentarzy.',
        },
        {
          role: 'user',
          content,
        },
      ],
      response_format: { type: 'json_object' },
      max_tokens: 800,
      temperature: 0.1,
    })

    const raw = completion.choices[0].message.content ?? '{}'
    const result = JSON.parse(raw)

    return NextResponse.json({ result })
  } catch (err) {
    console.error('analyze-invoice error:', err)
    return NextResponse.json({ error: 'Błąd analizy faktury' }, { status: 500 })
  }
}
