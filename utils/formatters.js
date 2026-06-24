/**
 * formatters.js
 * Utilidades de formato para CuraCDM.
 */

/** Fecha legible: "23 jun 2026" */
export function formatDate(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('es-PA', {
    day: 'numeric', month: 'short', year: 'numeric',
  })
}

/** Fecha + hora: "23 jun 2026, 14:30" */
export function formatDateTime(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleString('es-PA', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

/** Iniciales de un nombre completo */
export function initials(name = '') {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase() ?? '')
    .join('')
}

/** Capitaliza primera letra */
export function capitalize(str = '') {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/** Edad desde fecha de nacimiento */
export function ageFromDate(dob) {
  if (!dob) return null
  const diff = Date.now() - new Date(dob).getTime()
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25))
}
