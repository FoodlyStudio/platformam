// Simple user store — no Supabase Auth, just localStorage
// Demo users: Bartosz and Karolina, password: Demo123

export interface AppUser {
  id: string
  name: string
  fullName: string
  company: string
  initials: string
  color: string
}

export const USERS: AppUser[] = [
  { id: 'bartosz', name: 'Bartosz', fullName: 'Bartosz', company: '', initials: 'B', color: '#6366f1' },
  { id: 'karolina', name: 'Karolina', fullName: 'Karolina', company: '', initials: 'K', color: '#8b5cf6' },
]

export const DEMO_PASSWORD = 'Demo123'

const KEY = 'am_current_user'

export function getCurrentUser(): AppUser | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    return USERS.find((u) => u.id === raw) ?? null
  } catch {
    return null
  }
}

export function setCurrentUser(id: string): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(KEY, id)
}

export function clearCurrentUser(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(KEY)
}
