import { NextResponse } from 'next/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'
import { publishToInstagram, publishToFacebook, publishToLinkedIn } from '@/lib/content-studio/publisher'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )

  const { data: posts } = await supabase
    .from('cs_posts')
    .select('*, cs_clients(*)')
    .eq('status', 'scheduled')
    .lte('scheduled_at', new Date(Date.now() + 5 * 60 * 1000).toISOString())

  let processed = 0
  for (const post of posts ?? []) {
    const socialAccounts = post.cs_clients?.social_accounts ?? {}
    let publishedId: string | undefined

    try {
      if (post.platform === 'instagram' && socialAccounts.instagram) {
        publishedId = await publishToInstagram({
          imageUrl: post.final_image_url ?? post.generated_image_url ?? '',
          caption: `${post.caption}\n\n${(post.hashtags ?? []).join(' ')}`,
          accessToken: socialAccounts.instagram.token,
          instagramAccountId: socialAccounts.instagram.account_id,
        })
      } else if (post.platform === 'facebook' && socialAccounts.facebook) {
        publishedId = await publishToFacebook({
          imageUrl: post.final_image_url ?? post.generated_image_url ?? '',
          caption: `${post.caption}\n\n${(post.hashtags ?? []).join(' ')}`,
          accessToken: socialAccounts.facebook.token,
          pageId: socialAccounts.facebook.page_id,
        })
      } else if (post.platform === 'linkedin' && socialAccounts.linkedin) {
        publishedId = await publishToLinkedIn({
          imageUrl: post.final_image_url ?? post.generated_image_url ?? '',
          caption: post.caption,
          accessToken: socialAccounts.linkedin.token,
          organizationId: socialAccounts.linkedin.organization_id,
        })
      }

      await supabase
        .from('cs_posts')
        .update({
          status: 'published',
          published_at: new Date().toISOString(),
          publish_external_id: publishedId,
        })
        .eq('id', post.id)

      processed++
    } catch (error) {
      await supabase
        .from('cs_posts')
        .update({ status: 'failed', publish_error: String(error) })
        .eq('id', post.id)
    }
  }

  return NextResponse.json({ processed })
}
