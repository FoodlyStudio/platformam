import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { prompt, aspectRatio = '1:1', count = 1 } = await req.json()

    if (!prompt?.trim()) {
      return NextResponse.json({ error: 'Brak promptu' }, { status: 400 })
    }

    const key = process.env.GEMINI_API_KEY
    if (!key) {
      return NextResponse.json({ error: 'Brak klucza GEMINI_API_KEY' }, { status: 500 })
    }

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:predict?key=${key}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          instances: [{ prompt }],
          parameters: {
            sampleCount: Math.min(count, 4),
            aspectRatio,
          },
        }),
      },
    )

    const data = await res.json()

    if (!res.ok) {
      console.error('[generate-image] Gemini error:', data)
      return NextResponse.json(
        { error: data?.error?.message ?? 'Błąd Gemini API' },
        { status: res.status },
      )
    }

    const images: string[] = (data.predictions ?? [])
      .map((p: { bytesBase64Encoded?: string }) => p.bytesBase64Encoded)
      .filter(Boolean)
      .map((b64: string) => `data:image/png;base64,${b64}`)

    if (!images.length) {
      return NextResponse.json({ error: 'Gemini nie zwróciło obrazu' }, { status: 500 })
    }

    return NextResponse.json({ images })
  } catch (err) {
    console.error('[generate-image]', err)
    return NextResponse.json({ error: 'Wewnętrzny błąd serwera' }, { status: 500 })
  }
}
