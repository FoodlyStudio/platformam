async function withRetry<T>(fn: () => Promise<T>, attempts = 2): Promise<T> {
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn()
    } catch (err) {
      if (i === attempts - 1) throw err
      await new Promise(r => setTimeout(r, 1500 * (i + 1)))
    }
  }
  throw new Error('unreachable')
}

export async function publishToInstagram(options: {
  imageUrl: string
  caption: string
  accessToken: string
  instagramAccountId: string
}): Promise<string> {
  return withRetry(async () => {
    const mediaRes = await fetch(
      `https://graph.facebook.com/v18.0/${options.instagramAccountId}/media`,
      {
        method: 'POST',
        body: new URLSearchParams({
          image_url: options.imageUrl,
          caption: options.caption,
          access_token: options.accessToken,
        }),
      },
    )
    const media = await mediaRes.json()
    if (media.error) throw new Error(media.error.message)

    const publishRes = await fetch(
      `https://graph.facebook.com/v18.0/${options.instagramAccountId}/media_publish`,
      {
        method: 'POST',
        body: new URLSearchParams({
          creation_id: media.id,
          access_token: options.accessToken,
        }),
      },
    )
    const published = await publishRes.json()
    if (published.error) throw new Error(published.error.message)
    return published.id
  })
}

export async function publishToFacebook(options: {
  imageUrl: string
  caption: string
  accessToken: string
  pageId: string
}): Promise<string> {
  return withRetry(async () => {
    const res = await fetch(
      `https://graph.facebook.com/v18.0/${options.pageId}/photos`,
      {
        method: 'POST',
        body: new URLSearchParams({
          url: options.imageUrl,
          caption: options.caption,
          access_token: options.accessToken,
        }),
      },
    )
    const data = await res.json()
    if (data.error) throw new Error(data.error.message)
    return data.id
  })
}

export async function publishToLinkedIn(options: {
  imageUrl: string
  caption: string
  accessToken: string
  organizationId: string
}): Promise<string> {
  return withRetry(async () => {
    const uploadInit = await fetch(
      'https://api.linkedin.com/v2/assets?action=registerUpload',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${options.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          registerUploadRequest: {
            recipes: ['urn:li:digitalmediaRecipe:feedshare-image'],
            owner: `urn:li:organization:${options.organizationId}`,
            serviceRelationships: [
              { relationshipType: 'OWNER', identifier: 'urn:li:userGeneratedContent' },
            ],
          },
        }),
      },
    )
    const uploadData = await uploadInit.json()
    const uploadUrl =
      uploadData.value.uploadMechanism[
        'com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest'
      ].uploadUrl
    const asset = uploadData.value.asset

    const imageBuffer = await fetch(options.imageUrl).then(r => r.arrayBuffer())
    await fetch(uploadUrl, {
      method: 'POST',
      headers: { Authorization: `Bearer ${options.accessToken}` },
      body: imageBuffer,
    })

    const postRes = await fetch('https://api.linkedin.com/v2/ugcPosts', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${options.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        author: `urn:li:organization:${options.organizationId}`,
        lifecycleState: 'PUBLISHED',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: { text: options.caption },
            shareMediaCategory: 'IMAGE',
            media: [
              {
                status: 'READY',
                description: { text: '' },
                media: asset,
                title: { text: '' },
              },
            ],
          },
        },
        visibility: { 'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC' },
      }),
    })
    const post = await postRes.json()
    if (post.status >= 400) throw new Error(JSON.stringify(post))
    return post.id
  })
}
