import { createClient } from '@/lib/supabase/server'

export interface CompanyProfile {
  company_name: string
  tagline: string
  description: string
  problems_solved: string
  usp: string
  target_client: string
  icp_industry: string
  icp_company_size: string
  icp_role: string
  services: { name: string; description: string; price_min: string; price_max: string }[]
  website_url: string
  linkedin_company_url: string
  linkedin_personal_url: string
  instagram_url: string
  facebook_url: string
  other_links: string
  tone_of_voice: string
  case_studies: string
  objections: string
}

export async function getCompanyProfile(): Promise<CompanyProfile | null> {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('company_profile')
      .select('*')
      .limit(1)
      .single()
    return data ?? null
  } catch {
    return null
  }
}

export function buildCompanyContext(profile: CompanyProfile | null): string {
  if (!profile) return 'Brak danych o firmie — odpowiedz ogólnie.'

  const services = Array.isArray(profile.services)
    ? profile.services
        .filter(s => s.name)
        .map(s => `- ${s.name}: ${s.description || '(brak opisu)'} | Cena: ${s.price_min || '?'}–${s.price_max || '?'} PLN`)
        .join('\n')
    : ''

  return `
FIRMA: ${profile.company_name || 'Brak nazwy'}
TAGLINE: ${profile.tagline || ''}
OPIS: ${profile.description || ''}
PROBLEMY KTÓRE ROZWIĄZUJE: ${profile.problems_solved || ''}
USP: ${profile.usp || ''}

IDEALNY KLIENT (ICP):
${profile.target_client || ''}
Branża: ${profile.icp_industry || ''}
Wielkość firmy: ${profile.icp_company_size || ''}
Stanowisko: ${profile.icp_role || ''}

USŁUGI:
${services || '(brak usług)'}

STRONA: ${profile.website_url || ''}
LINKEDIN FIRMA: ${profile.linkedin_company_url || ''}
LINKEDIN OSOBISTY: ${profile.linkedin_personal_url || ''}

TON OF VOICE: ${profile.tone_of_voice || ''}
CASE STUDIES: ${profile.case_studies || ''}
OBIEKCJE I ODPOWIEDZI: ${profile.objections || ''}
`.trim()
}
