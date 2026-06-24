import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useParticipants, useDeleteParticipant } from '../../hooks/useParticipants'
import { formatDate, ageFromDate, initials } from '../../utils/formatters'
import { SKIN_TONES } from '../../utils/constants'

export default function ParticipantsPage() {
  const [search, setSearch]     = useState('')
  const [skinTone, setSkinTone] = useState('')
  const { data, isLoading }     = useParticipants({ search, skin_tone: skinTone || undefined })
  const deleteMutation          = useDeleteParticipant()

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Participantes</h1>
        <Link
          to="/participants/new"
          className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Nuevo
        </Link>
      </div>

      {/* Filtros */}
      <div className="flex gap-3 flex-wrap">
        <input
          type="search"
          placeholder="Buscar por nombre…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm w-56 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={skinTone}
          onChange={e => setSkinTone(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Todas las teces</option>
          {SKIN_TONES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
      </div>

      {isLoading && <p className="text-sm text-gray-400">Cargando participantes…</p>}

      <div className="grid gap-3">
        {data?.map(p => (
          <div key={p.id} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm flex items-center justify-center flex-shrink-0">
              {initials(p.full_name)}
            </div>
            <div className="flex-1 min-w-0">
              <Link to={`/participants/${p.id}`} className="text-sm font-semibold text-gray-900 hover:text-blue-600">
                {p.full_name}
              </Link>
              <p className="text-xs text-gray-400 mt-0.5">
                {ageFromDate(p.dob) ? `${ageFromDate(p.dob)} años · ` : ''}{p.cancer_cause ?? 'Causa no especificada'} · Reg. {formatDate(p.created_at)}
              </p>
            </div>
            <button
              onClick={() => { if (confirm('¿Eliminar participante?')) deleteMutation.mutate(p.id) }}
              className="text-xs text-red-400 hover:text-red-600"
            >
              Eliminar
            </button>
          </div>
        ))}
        {!isLoading && data?.length === 0 && (
          <p className="text-center text-sm text-gray-400 py-10">No se encontraron participantes</p>
        )}
      </div>
    </div>
  )
}
