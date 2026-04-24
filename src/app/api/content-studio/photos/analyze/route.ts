import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { analyzePhoto } from '@/lib/content-studio/photo-analysis'
import { generateVariants } from '@/lib/content-studio/cloudinary'

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { imageUrl, clientId, cloudinaryPublicId } = body

  if (!imageUrl || !clientId) {
    return NextResponse.json({ error: 'imageUrl and clientId are required' }, { status: 400 })
  }

  // Analyze with GPT-4o Vision
  const metadata = await analyzePhoto(imageUrl)

  // Generate Cloudinary variants if public_id provided
  const variants = cloudinaryPublicId ? generateVariants(cloudinaryPublicId) : null

  // Save to DB
  const { data: photo, error } = await supabase
    .from('cs_photos')
    .insert({
      client_id: clientId,
      original_url: imageUrl,
      cloudinary_public_id: cloudinaryPublicId ?? null,
      url_square: variants?.square ?? null,
      url_portrait: variants?.portrait ?? null,
      url_story: variants?.story ?? null,
      url_landscape: variants?.landscape ?? null,
      ai_description: metadata.description,
      ai_mood: metadata.mood,
      ai_category: metadata.category,
      ai_quality_score: metadata.quality_score,
      ai_suggested_uses: metadata.suggested_uses,
      ai_color_palette: metadata.color_palette,
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ photo, metadata })
}
