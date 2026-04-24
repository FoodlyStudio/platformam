import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { generatePost } from '@/lib/content-studio/post-generator'
import type { Platform, PostGoal } from '@/lib/content-studio/types'

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { clientId, photoId, platform, postGoal, topic, specialInstructions } = body

  if (!clientId || !platform || !postGoal) {
    return NextResponse.json({ error: 'clientId, platform, postGoal required' }, { status: 400 })
  }

  // Load brand voice
  const { data: brandVoiceRow, error: bvError } = await supabase
    .from('cs_brand_voices')
    .select('voice_document')
    .eq('client_id', clientId)
    .single()

  if (bvError || !brandVoiceRow) {
    return NextResponse.json(
      { error: 'Brand voice not found. Complete onboarding first.' },
      { status: 404 },
    )
  }

  // Load photo metadata if selected
  let photoMetadata = undefined
  if (photoId) {
    const { data: photo } = await supabase
      .from('cs_photos')
      .select('ai_description, ai_mood, ai_category, ai_quality_score, ai_color_palette, ai_suggested_uses, original_url, url_square')
      .eq('id', photoId)
      .single()
    if (photo) {
      photoMetadata = {
        description: photo.ai_description ?? '',
        mood: photo.ai_mood ?? 'professional',
        category: photo.ai_category ?? 'lifestyle',
        quality_score: photo.ai_quality_score ?? 7,
        suggested_uses: photo.ai_suggested_uses ?? [],
        color_palette: photo.ai_color_palette ?? [],
        composition_notes: '',
        content_potential: photo.ai_suggested_uses?.join(', ') ?? '',
      }
    }
  }

  const result = await generatePost({
    brandVoice: brandVoiceRow.voice_document,
    photoMetadata,
    platform: platform as Platform,
    postGoal: postGoal as PostGoal,
    topic,
    specialInstructions,
  })

  // Auto-save first variant as draft
  const firstVariant = result.variants[0]
  const { data: savedPost } = await supabase
    .from('cs_posts')
    .insert({
      client_id: clientId,
      photo_id: photoId ?? null,
      caption: firstVariant.caption,
      caption_variants: result.variants,
      hashtags: firstVariant.hashtags,
      cta: firstVariant.cta,
      post_type: 'single',
      platform,
      status: 'draft',
      generation_prompt: `platform:${platform}, goal:${postGoal}, topic:${topic ?? ''}`,
      ai_model: 'gpt-4o-mini',
    })
    .select()
    .single()

  return NextResponse.json({ result, postId: savedPost?.id })
}
