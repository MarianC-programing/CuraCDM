import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'

const TABLE = 'participants'

/** Lista todos los participantes con filtros opcionales */
export function useParticipants(filters = {}) {
  return useQuery({
    queryKey: [TABLE, filters],
    queryFn: async () => {
      let query = supabase
        .from(TABLE)
        .select('*')
        .order('created_at', { ascending: false })

      if (filters.search) {
        query = query.ilike('full_name', `%${filters.search}%`)
      }
      if (filters.status) {
        query = query.eq('status', filters.status)
      }
      if (filters.skin_tone) {
        query = query.eq('skin_tone', filters.skin_tone)
      }

      const { data, error } = await query
      if (error) throw error
      return data ?? []
    },
  })
}

/** Un participante por ID */
export function useParticipant(id) {
  return useQuery({
    queryKey: [TABLE, id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from(TABLE)
        .select('*, tasks(*), experiments(*)')
        .eq('id', id)
        .single()
      if (error) throw error
      return data
    },
    enabled: !!id,
  })
}

/** Crear participante */
export function useCreateParticipant() {
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

/** Actualizar participante */
export function useUpdateParticipant() {
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

/** Eliminar participante */
export function useDeleteParticipant() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from(TABLE).delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: [TABLE] }),
  })
}
