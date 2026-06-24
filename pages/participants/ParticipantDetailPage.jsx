import { useParams, Link } from 'react-router-dom'
import { useParticipant } from '../../hooks/useParticipants'
import { formatDate, ageFromDate } from '../../utils/formatters'
import { TASK_STATUSES, EXP_STATUSES } from '../../utils/constants'

export default function ParticipantDetailPage() {
  const { id } = useParams()
  const { data: p, isLoading } = useParticipant(id)

  if (isLoading) return <p className="text-sm text-gray-400 p-6">Cargando…</p>
  if (!p) return <p className="text-sm text-red-500 p-6">Participante no encontrado</p>

  return (
    <div className="space-y-6 max-w-3xl">
      <Link to="/participants" className="text-sm text-blue-600 hover:underline">← Volver</Link>

      <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
        <h1 className="text-xl font-bold text-gray-900">{p.full_name}</h1>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <Info label="Edad"          value={ageFromDate(p.dob) ? `${ageFromDate(p.dob)} años` : '—'} />
          <Info label="Fecha de nac." value={formatDate(p.dob)} />
          <Info label="Tez"           value={p.skin_tone ?? '—'} />
          <Info label="Tipo semilla"  value={p.seed_type  ?? '—'} />
          <Info label="Causa cáncer"  value={p.cancer_cause ?? '—'} />
          <Info label="Registrado"    value={formatDate(p.created_at)} />
        </div>
        {p.notes && (
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Notas</p>
            <p className="text-sm text-gray-700 whitespace-pre-line">{p.notes}</p>
          </div>
        )}
      </div>

      {/* Tareas */}
      <Section title="Tareas">
        {p.tasks?.map(t => {
          const st = TASK_STATUSES.find(s => s.value === t.status)
          return (
            <Row key={t.id} label={t.title} sub={formatDate(t.due_date)}>
              <Badge color={st?.color}>{st?.label}</Badge>
            </Row>
          )
        })}
      </Section>

      {/* Experimentos */}
      <Section title="Experimentos">
        {p.experiments?.map(e => {
          const st = EXP_STATUSES.find(s => s.value === e.status)
          return (
            <Row key={e.id} label={e.title} sub={formatDate(e.created_at)}>
              <Badge color={st?.color}>{st?.label}</Badge>
            </Row>
          )
        })}
      </Section>
    </div>
  )
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-400">{label}</p>
      <p className="font-medium text-gray-800">{value}</p>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="px-5 py-3 border-b border-gray-100">
        <h2 className="text-sm font-semibold text-gray-800">{title}</h2>
      </div>
      <ul className="divide-y divide-gray-50">
        {children ?? <li className="px-5 py-6 text-center text-sm text-gray-400">Sin registros</li>}
      </ul>
    </div>
  )
}

function Row({ label, sub, children }) {
  return (
    <li className="px-5 py-3 flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-800">{label}</p>
        {sub && <p className="text-xs text-gray-400">{sub}</p>}
      </div>
      {children}
    </li>
  )
}

function Badge({ color = 'gray', children }) {
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium bg-${color}-100 text-${color}-700`}>
      {children}
    </span>
  )
}
