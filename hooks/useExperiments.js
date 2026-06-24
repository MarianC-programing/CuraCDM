import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'

const TABLE = 'experiments'

export function useExperiments(filters = {}) {
  return useQuery({
    queryKey: [TABLE, filters],
    queryFn: async () => {
      let query = supabase
        .from(TABLE)
        .select('*, participant:participants(id, full_name), observations(count)')
        .order('created_at', { ascending: false })

      if (filters.status) query = query.eq('status', filters.status)
      if (filters.participant_id) query = query.eq('participant_id', filters.participant_id)

      const { data, error } = await query
      if (error) throw error
      return data ?? []
    },
  })
}

export function useExperiment(id) {
  return useQuery({
    queryKey: [TABLE, id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from(TABLE)
        .select('*, participant:participants(*), observations(*, recorded_by:profiles(full_name)), files(*)')
        .eq('id', id)
        .single()
      if (error) throw error
      return data
    },
    enabled: !!id,
  })
}

export function useCreateExperiment() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (payload) => {
      const { data, error } = await supabase.from(TABLE).insert(payload).select().single()
      if (error) throw error
      return data
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: [TABLE] }),
  })
}

export function useUpdateExperiment() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, ...payload }) => {
      const { data, error } = await supabase.from(TABLE).update(payload).eq('id', id).select().single()
      if (error) throw error
      return data
    },
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: [TABLE] })
      qc.invalidateQueries({ queryKey: [TABLE, id] })
    },
  })
}
