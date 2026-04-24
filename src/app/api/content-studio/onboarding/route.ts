import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getChatResponse, generateBrandVoice, ONBOARDING_QUESTIONS } from '@/lib/content-studio/brand-voice'

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { action, clientId, conversationHistory, currentQuestionIndex, userMessage, answers, businessType } = body

  if (action === 'chat') {
    const { response, shouldAdvance } = await getChatResponse(
      conversationHistory ?? [],
      currentQuestionIndex ?? 0,
      userMessage,
    )
    return NextResponse.json({ response, shouldAdvance })
  }

  if (action === 'generate_brand_voice') {
    const voiceDoc = await generateBrandVoice(answers, businessType)

    // Upsert brand voice in DB
    const { error } = await supabase
      .from('cs_brand_voices')
      .upsert({
        client_id: clientId,
        voice_document: voiceDoc,
        tone_keywords: voiceDoc.tone?.keywords ?? [],
        forbidden_words: voiceDoc.forbidden_words ?? [],
        target_audience: voiceDoc.target_audience?.description ?? '',
        content_pillars: (voiceDoc.content_pillars ?? []).map((p: { name: string }) => p.name),
        generated_at: new Date().toISOString(),
      }, { onConflict: 'client_id' })

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    // Mark onboarding session as completed
    await supabase
      .from('cs_onboarding_sessions')
      .update({ completed: true, completed_at: new Date().toISOString() })
      .eq('client_id', clientId)

    return NextResponse.json({ voiceDoc })
  }

  if (action === 'first_question') {
    return NextResponse.json({ question: ONBOARDING_QUESTIONS[0], total: ONBOARDING_QUESTIONS.length })
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
}
