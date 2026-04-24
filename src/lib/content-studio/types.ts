export interface BrandVoiceDocument {
  business_summary: string
  business_type: string
  target_audience: {
    description: string
    pain_points: string[]
    desires: string[]
  }
  tone: {
    keywords: string[]
    style: 'formal' | 'casual' | 'friendly' | 'expert' | 'inspirational'
    energy: 'high' | 'medium' | 'calm'
  }
  forbidden_words: string[]
  content_pillars: Array<{
    name: string
    description: string
    example_topics: string[]
  }>
  cta_style: string
  hashtags: {
    core: string[]
    rotating: string[]
  }
  unique_value: string
  posting_schedule: {
    frequency: string
    platforms: string[]
    best_times: string[]
  }
  example_caption_style: string
  language_examples: {
    good: string[]
    bad: string[]
  }
}

export interface PhotoMetadata {
  description: string
  mood: 'warm' | 'cool' | 'energetic' | 'calm' | 'luxurious' | 'playful' | 'professional'
  category: 'food' | 'product' | 'team' | 'interior' | 'event' | 'behind_scenes' | 'lifestyle' | 'promotional'
  quality_score: number
  suggested_uses: string[]
  color_palette: string[]
  composition_notes: string
  content_potential: string
}

export interface PostVariant {
  caption: string
  hook: string
  hashtags: string[]
  cta: string
  angle: string
  why: string
}

export interface PostVariants {
  variants: PostVariant[]
  image_prompt_suggestion: string
  best_posting_time: string
}

export type Platform = 'instagram' | 'facebook' | 'linkedin' | 'google_business'
export type PostGoal = 'engagement' | 'education' | 'promotion' | 'storytelling' | 'social_proof'
export type PostStatus = 'draft' | 'pending_approval' | 'approved' | 'scheduled' | 'published' | 'failed'
export type BusinessType = 'restaurant' | 'agency' | 'sports_club' | 'beauty_salon' | 'service_company' | 'other'

export interface CSClient {
  id: string
  user_id: string
  business_name: string
  business_type: BusinessType
  logo_url: string | null
  brand_colors: { primary: string; secondary: string; accent: string }
  social_accounts: Record<string, unknown>
  bannerbear_template_ids: Record<string, string>
  subscription_status: 'trial' | 'active' | 'paused' | 'cancelled'
  created_at: string
  updated_at: string
}

export interface CSPost {
  id: string
  client_id: string
  photo_id: string | null
  caption: string
  caption_variants: PostVariant[]
  hashtags: string[]
  cta: string | null
  post_type: 'single' | 'carousel' | 'story' | 'reel_script' | null
  platform: Platform | 'all' | null
  generated_image_url: string | null
  final_image_url: string | null
  status: PostStatus
  scheduled_at: string | null
  published_at: string | null
  publish_error: string | null
  metrics: Record<string, number>
  ai_model: string
  created_at: string
  updated_at: string
}

export interface CSPhoto {
  id: string
  client_id: string
  original_url: string
  url_square: string | null
  url_portrait: string | null
  url_story: string | null
  url_landscape: string | null
  ai_description: string | null
  ai_mood: PhotoMetadata['mood'] | null
  ai_category: PhotoMetadata['category'] | null
  ai_quality_score: number | null
  ai_suggested_uses: string[]
  ai_color_palette: string[]
  is_approved: boolean
  usage_count: number
  created_at: string
}
