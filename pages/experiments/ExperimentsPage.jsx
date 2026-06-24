import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useExperiments } from '../../hooks/useExperiments'
import { formatDate } from '../../utils/formatters'
import { EXP_STATUSES } from '../../utils/constants'

export default function ExperimentsPage() {
  const [status, setStatus] = useState('')
  const { data, isLoading } = useExperiments({ status: status || undefined })

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Experimentos</h1>
        <Link to="/experiments/new" className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          + Nuevo
        </Link>
      </div>

      <div className="flex gap-2">
        <button onClick={() => setStatus('')} className={`text-sm px-3 py-1.5 rounded-lg border ${!status ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 text-gray-600 hover:bg-gray-50'}`}>
          Todos
        </button>
        {EXP_STATUSES.map(s => (
          <button
            key={s.value}
            onClick={() => setStatus(s.value)}
            className={`text-sm px-3 py-1.5 rounded-lg border ${status === s.value ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 text-gray-600 hover:bg-gray-50'}`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {isLoading && <p className="text-sm text-gray-400">Cargando experimentos…</p>}

      <div className="grid gap-3">
        {data?.map(exp => {
          const st = EXP_STATUSES.find(s => s.value === exp.status)
          return (
            <Link
              key={exp.id}
              to={`/experiments/${exp.id}`}
              className="bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors block"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{exp.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {exp.participant?.full_name ?? 'Sin participante'} · {formatDate(exp.created_at)}
                  </p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap bg-${st?.color ?? 'gray'}-100 text-${st?.color ?? 'gray'}-700`}>
                  {st?.label ?? exp.status}
                </span>
              </div>
            </Link>
          )
        })}
        {!isLoading && data?.length === 0 && (
          <p className="text-center text-sm text-gray-400 py-10">Sin experimentos</p>
        )}
      </div>
    </div>
  )
}
