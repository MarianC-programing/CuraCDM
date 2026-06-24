import { useState } from 'react'
import { useTasks, useUpdateTaskStatus } from '../../hooks/useTasks'
import { formatDate } from '../../utils/formatters'
import { TASK_STATUSES } from '../../utils/constants'

export default function TasksPage() {
  const [filter, setFilter]  = useState('')
  const { data, isLoading }  = useTasks({ status: filter || undefined })
  const updateStatus         = useUpdateTaskStatus()

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Tareas</h1>
      </div>

      {/* Filtro por estado */}
      <div className="flex gap-2 flex-wrap">
        <button onClick={() => setFilter('')} className={`text-sm px-3 py-1.5 rounded-lg border ${!filter ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 text-gray-600'}`}>
          Todas
        </button>
        {TASK_STATUSES.map(s => (
          <button
            key={s.value}
            onClick={() => setFilter(s.value)}
            className={`text-sm px-3 py-1.5 rounded-lg border ${filter === s.value ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 text-gray-600'}`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {isLoading && <p className="text-sm text-gray-400">Cargando tareas…</p>}

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
            <tr>
              <th className="text-left px-4 py-3">Tarea</th>
              <th className="text-left px-4 py-3">Participante</th>
              <th className="text-left px-4 py-3">Vence</th>
              <th className="text-left px-4 py-3">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data?.map(task => {
              const st = TASK_STATUSES.find(s => s.value === task.status)
              return (
                <tr key={task.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">{task.title}</td>
                  <td className="px-4 py-3 text-gray-500">{task.participant?.full_name ?? '—'}</td>
                  <td className="px-4 py-3 text-gray-500">{formatDate(task.due_date)}</td>
                  <td className="px-4 py-3">
                    <select
                      value={task.status}
                      onChange={e => updateStatus.mutate({ id: task.id, status: e.target.value })}
                      className={`text-xs rounded-full px-2 py-1 font-medium border-0 bg-${st?.color ?? 'gray'}-100 text-${st?.color ?? 'gray'}-700 cursor-pointer`}
                    >
                      {TASK_STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>
                  </td>
                </tr>
              )
            })}
            {!isLoading && data?.length === 0 && (
              <tr><td colSpan={4} className="px-4 py-10 text-center text-gray-400">Sin tareas</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
