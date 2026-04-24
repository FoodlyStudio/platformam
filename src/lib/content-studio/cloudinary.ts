export interface CloudinaryVariants {
  square: string
  portrait: string
  story: string
  landscape: string
}

function buildUrl(publicId: string, params: string): string {
  const cloud = process.env.CLOUDINARY_CLOUD_NAME
  if (!cloud) return ''
  return `https://res.cloudinary.com/${cloud}/image/upload/${params}/${publicId}`
}

export function generateVariants(publicId: string): CloudinaryVariants {
  return {
    square: buildUrl(publicId, 'w_1080,h_1080,c_fill,g_auto,q_auto,f_jpg'),
    portrait: buildUrl(publicId, 'w_1080,h_1350,c_fill,g_auto,q_auto,f_jpg'),
    story: buildUrl(publicId, 'w_1080,h_1920,c_fill,g_auto,q_auto,f_jpg'),
    landscape: buildUrl(publicId, 'w_1200,h_628,c_fill,g_auto,q_auto,f_jpg'),
  }
}

const COLOR_GRADE: Record<string, string> = {
  warm: 'e_improve:50,e_vibrance:20,e_warmth:30',
  cool: 'e_improve:50,e_vibrance:15,e_brightness:5',
  vibrant: 'e_vibrance:60,e_saturation:20,e_improve:70',
  muted: 'e_saturation:-20,e_improve:40,e_brightness:5',
  cinematic: 'e_improve:60,e_contrast:10,e_viesus_cgamma:30',
}

export function applyColorGrading(
  publicId: string,
  style: 'warm' | 'cool' | 'vibrant' | 'muted' | 'cinematic',
): string {
  return buildUrl(publicId, `${COLOR_GRADE[style]},q_auto,f_jpg`)
}

export async function uploadToCloudinary(
  file: ArrayBuffer,
  folder: string,
): Promise<{ publicId: string; url: string }> {
  const cloud = process.env.CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET

  if (!cloud || !apiKey || !apiSecret) {
    throw new Error('Cloudinary credentials not configured')
  }

  const timestamp = Math.round(Date.now() / 1000)
  const paramsToSign = `folder=${folder}&timestamp=${timestamp}`

  // Compute HMAC-SHA1 signature using Web Crypto
  const enc = new TextEncoder()
  const keyData = enc.encode(apiSecret)
  const msgData = enc.encode(paramsToSign)
  const cryptoKey = await crypto.subtle.importKey('raw', keyData, { name: 'HMAC', hash: 'SHA-1' }, false, ['sign'])
  const sigBuffer = await crypto.subtle.sign('HMAC', cryptoKey, msgData)
  const signature = Array.from(new Uint8Array(sigBuffer)).map(b => b.toString(16).padStart(2, '0')).join('')

  const formData = new FormData()
  formData.append('file', new Blob([new Uint8Array(file)]))
  formData.append('api_key', apiKey)
  formData.append('timestamp', String(timestamp))
  formData.append('folder', folder)
  formData.append('signature', signature)

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/image/upload`, {
    method: 'POST',
    body: formData,
  })
  const data = await res.json()
  return { publicId: data.public_id, url: data.secure_url }
}
