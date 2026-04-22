'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import toast from 'react-hot-toast'

export interface Service {
  id: string
  name: string
  description: string
  price_min: number
  price_max: number
  unit: string
  deliverables: string
  duration: string
  is_active: boolean
  sort_order: number
  created_at: string
}

export const UNIT_LABELS: Record<string, string> = {
  projekt:      'za projekt',
  miesięcznie:  'miesięcznie',
  godzina:      'za godzinę',
  jednorazowo:  'jednorazowo',
  abonament:    'abonament',
}

export function useServices() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading]   = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    const supabase = createClient()
    const { data } = await supabase
      .from('services')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true })
    setServices(data ?? [])
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const create = useCallback(async (payload: Omit<Service, 'id' | 'created_at'>): Promise<Service | null> => {
    const supabase = createClient()
    const { data, error } = await supabase.from('services').insert(payload).select().single()
    if (error) { toast.error('Błąd dodawania usługi'); return null }
    const svc = data as Service
    setServices(prev => [...prev, svc].sort((a, b) => a.sort_order - b.sort_order))
    toast.success('Usługa dodana')
    return svc
  }, [])

  const update = useCallback(async (id: string, payload: Partial<Service>): Promise<void> => {
    const supabase = createClient()
    const { error } = await supabase.from('services').update({ ...payload, updated_at: new Date().toISOString() }).eq('id', id)
    if (error) { toast.error('Błąd aktualizacji usługi'); return }
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...payload } : s))
    toast.success('Usługa zaktualizowana')
  }, [])

  const remove = useCallback(async (id: string): Promise<void> => {
    const supabase = createClient()
    const { error } = await supabase.from('services').delete().eq('id', id)
    if (error) { toast.error('Błąd usuwania usługi'); return }
    setServices(prev => prev.filter(s => s.id !== id))
    toast.success('Usługa usunięta')
  }, [])

  return { services, loading, load, create, update, remove }
}
