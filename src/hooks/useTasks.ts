'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import toast from 'react-hot-toast'

export interface Task {
  id: string
  title: string
  description?: string
  due_date?: string
  priority: 'low' | 'medium' | 'high'
  assigned_to?: string
  completed: boolean
  completed_at?: string | null
  created_at: string
}

export function useTasks(filterToday = false) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    const supabase = createClient()
    let query = supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false })

    if (filterToday) {
      const today = new Date().toISOString().slice(0, 10)
      query = query.or(`due_date.eq.${today},due_date.is.null`)
    }

    const { data } = await query
    setTasks((data ?? []) as Task[])
    setLoading(false)
  }, [filterToday])

  useEffect(() => { load() }, [load])

  const create = useCallback(async (payload: {
    title: string
    description?: string
    priority?: Task['priority']
    assigned_to?: string
    due_date?: string
  }): Promise<Task | null> => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('tasks')
      .insert({ ...payload, completed: false, priority: payload.priority ?? 'medium' })
      .select()
      .single()
    if (error) { toast.error('Błąd dodawania zadania'); return null }
    const task = data as Task
    setTasks(prev => [task, ...prev])
    toast.success('Zadanie dodane')
    return task
  }, [])

  const toggle = useCallback(async (id: string): Promise<void> => {
    const task = tasks.find(t => t.id === id)
    if (!task) return
    const supabase = createClient()
    const update = task.completed
      ? { completed: false, completed_at: null }
      : { completed: true, completed_at: new Date().toISOString() }
    const { error } = await supabase.from('tasks').update(update).eq('id', id)
    if (error) { toast.error('Błąd aktualizacji zadania'); return }
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...update } : t))
  }, [tasks])

  const remove = useCallback(async (id: string): Promise<void> => {
    const supabase = createClient()
    const { error } = await supabase.from('tasks').delete().eq('id', id)
    if (error) { toast.error('Błąd usuwania zadania'); return }
    setTasks(prev => prev.filter(t => t.id !== id))
    toast.success('Zadanie usunięte')
  }, [])

  return { tasks, loading, load, create, toggle, remove }
}
