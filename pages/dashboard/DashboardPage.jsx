import { useTasks } from '../../hooks/useTasks'
import { useParticipants } from '../../hooks/useParticipants'
import { useExperiments } from '../../hooks/useExperiments'
import { useProfile } from '../../hooks/useProfile'
import { formatDate } from '../../utils/formatters'
import { TASK_STATUSES } from '../../utils/constants'

function StatCard({ label, value, sub, color = 'blue' }) {
  const colors = {
    blue:   'bg-blue-50   text-blue-700',
    green:  'bg-green-50  text-green-700',
    yellow: 'bg-yellow-50 text-yellow-700',
    purple: 'bg-purple-50 text-purple-700',
  }
  return (
    <div className={`rounded-xl p-5 ${colors[color]}`}>
      <p className="text-sm font-medium opacity-75">{label}</p>
      <p className="text-3xl font-bold mt-1">{value ?? '—'}</p>
      {sub && <p className="text-xs mt-1 opacity-60">{sub}</p>}
    </div>
  )
}

export default function DashboardPage() {
  const { data: profile }      = useProfile()
  const { data: participants }  = useParticipants()
  const { data: tasks }         = useTasks()
  const { data: experiments }   = useExperiments()

  const pendingTasks     = tasks?.filter(t => t.status === 'pendiente').length ?? 0
  const activeExp        = experiments?.filter(e => e.status === 'activo').length ?? 0
  const recentTasks      = tasks?.slice(0, 5) ?? []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Bienvenida, {profile?.full_name?.split(' ')[0] ?? 'Investigadora'} 👋
        </h1>
        <p className="text-sm text-gray-500 mt-1">Resumen del día</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Participantes"         value={participants?.length}  color="blue"   />
        <StatCard label="Experimentos activos"  value={activeExp}             color="green"  />
        <StatCard label="Tareas pendientes"     value={pendingTasks}          color="yellow" />
        <StatCard label="Total experimentos"    value={experiments?.length}   color="purple" />
      </div>

      {/* Tareas recientes */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-800">Tareas recientes</h2>
        </div>
        <ul className="divide-y divide-gray-50">
          {recentTasks.length === 0 && (
            <li className="px-5 py-8 text-center text-sm text-gray-400">Sin tareas registradas</li>
          )}
          {recentTasks.map(task => {
            const st = TASK_STATUSES.find(s => s.value === task.status)
            return (
              <li key={task.id} className="px-5 py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-800">{task.title}</p>
                  <p className="text-xs text-gray-400">{task.participant?.full_name} · {formatDate(task.due_date)}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium bg-${st?.color ?? 'gray'}-100 text-${st?.color ?? 'gray'}-700`}>
                  {st?.label ?? task.status}
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
