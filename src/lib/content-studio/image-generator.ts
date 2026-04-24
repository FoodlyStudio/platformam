async function withRetry<T>(fn: () => Promise<T>, attempts = 2): Promise<T> {
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn()
    } catch (err) {
      if (i === attempts - 1) throw err
      await new Promise(r => setTimeout(r, 1000 * (i + 1)))
    }
  }
  throw new Error('unreachable')
}

export async function generateFluxImage(
  prompt: string,
  quality: 'pro' | 'ultra' = 'pro',
): Promise<string> {
  const apiKey = process.env.FAL_API_KEY
  if (!apiKey) throw new Error('FAL_API_KEY not configured')

  const model = quality === 'ultra' ? 'fal-ai/flux/ultra' : 'fal-ai/flux-pro'

  return withRetry(async () => {
    const queueRes = await fetch(`https://queue.fal.run/${model}`, {
      method: 'POST',
      headers: {
        Authorization: `Key ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: `${prompt}, no text, no words, no letters`,
        image_size: 'square_hd',
        num_inference_steps: 28,
        guidance_scale: 3.5,
        num_images: 1,
        enable_safety_checker: true,
      }),
    })

    if (!queueRes.ok) {
      if (quality === 'pro') return generateFluxImage(prompt, 'ultra')
      throw new Error(`Flux API error: ${queueRes.status}`)
    }

    const queue = await queueRes.json()
    const requestId = queue.request_id

    // Poll for result
    for (let poll = 0; poll < 30; poll++) {
      await new Promise(r => setTimeout(r, 2000))
      const statusRes = await fetch(`https://queue.fal.run/${model}/requests/${requestId}/status`, {
        headers: { Authorization: `Key ${apiKey}` },
      })
      const status = await statusRes.json()
      if (status.status === 'COMPLETED') {
        const resultRes = await fetch(`https://queue.fal.run/${model}/requests/${requestId}`, {
          headers: { Authorization: `Key ${apiKey}` },
        })
        const result = await resultRes.json()
        return result.images?.[0]?.url ?? result.image?.url ?? ''
      }
      if (status.status === 'FAILED') throw new Error('Flux generation failed')
    }
    throw new Error('Flux generation timeout')
  })
}

export async function generateIdeogramImage(
  prompt: string,
  style: 'REALISTIC' | 'DESIGN' | 'RENDER_3D' | 'ANIME' = 'DESIGN',
): Promise<string> {
  const apiKey = process.env.IDEOGRAM_API_KEY
  if (!apiKey) throw new Error('IDEOGRAM_API_KEY not configured')

  return withRetry(async () => {
    const res = await fetch('https://api.ideogram.ai/generate', {
      method: 'POST',
      headers: {
        'Api-Key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image_request: {
          prompt,
          model: 'V_2',
          magic_prompt_option: 'AUTO',
          style_type: style,
          aspect_ratio: 'ASPECT_1_1',
        },
      }),
    })
    const data = await res.json()
    return data.data?.[0]?.url ?? ''
  })
}

const BUSINESS_STYLE_MAP: Record<string, string> = {
  restaurant: 'professional food photography, natural light, overhead shot, rustic wooden surface, shallow depth of field',
  agency: 'modern office environment, professional team, clean minimalist aesthetic, bright workspace',
  sports_club: 'dynamic sports photography, motion blur, energetic atmosphere, stadium lighting',
  beauty_salon: 'elegant beauty photography, soft studio lighting, pastel tones, clean white background',
  service_company: 'professional business photography, clean background, corporate aesthetic, confident team',
  other: 'professional lifestyle photography, natural light, clean composition',
}

export function buildFluxPrompt(businessType: string, topic: string): string {
  const style = BUSINESS_STYLE_MAP[businessType] ?? BUSINESS_STYLE_MAP.other
  return `${style}, related to "${topic}", high quality, 8k, photorealistic, no text, no words, no letters`
}
