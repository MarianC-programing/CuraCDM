import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'

export function useLibrary(filters = {}) {
  return useQuery({
    queryKey: ['library', filters],
    queryFn: async () => {
      let query = supabase
        .from('library_links')
        .select('*, added_by:profiles(full_name)')
        .order('created_at', { ascending: false })

      if (filters.search) query = query.ilike('title', `%${filters.search}%`)
      if (filters.tag)    query = query.contains('tags', [filters.tag])

      const { data, error } = await query
      if (error) throw error
      return data ?? []
    },
  })
}

export function useAddLink() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (payload) => {
      const { data, error } = await supabase.from('library_links').insert(payload).select().single()
      if (error) throw error
      return data
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['library'] }),
  })
}

export function useDeleteLink() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from('library_links').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['library'] }),
  })
}
