import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useQuery } from '@tanstack/react-query'
import { initials, formatDate } from '../../utils/formatters'

function useTeam() {
  return useQuery({
    queryKey: ['team'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('full_name')
      if (error) throw error
      return data ?? []
    },
  })
}

export default function TeamPage() {
  const { data: members, isLoading } = useTeam()

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold text-gray-900">Equipo</h1>

      {isLoading && <p className="text-sm text-gray-400">Cargando equipo…</p>}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {members?.map(m => (
          <div key={m.id} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 text-sm font-bold flex items-center justify-center flex-shrink-0">
              {initials(m.full_name)}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{m.full_name}</p>
              <p className="text-xs text-gray-400 truncate">{m.role ?? 'Investigador'}</p>
              <p className="text-xs text-gray-300">Desde {formatDate(m.created_at)}</p>
            </div>
          </div>
        ))}
        {!isLoading && members?.length === 0 && (
          <p className="col-span-full text-center text-sm text-gray-400 py-10">Sin miembros de equipo</p>
        )}
      </div>
    </div>
  )
}
