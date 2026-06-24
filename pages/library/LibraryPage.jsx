import { useState } from 'react'
import { useLibrary, useAddLink, useDeleteLink } from '../../hooks/useLibrary'
import { formatDate } from '../../utils/formatters'

export default function LibraryPage() {
  const [search, setSearch] = useState('')
  const { data, isLoading } = useLibrary({ search: search || undefined })
  const addLink             = useAddLink()
  const deleteLink          = useDeleteLink()
  const [form, setForm]     = useState({ title: '', url: '', description: '' })
  const [open, setOpen]     = useState(false)

  async function handleAdd(e) {
    e.preventDefault()
    await addLink.mutateAsync(form)
    setForm({ title: '', url: '', description: '' })
    setOpen(false)
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Biblioteca</h1>
        <button onClick={() => setOpen(true)} className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          + Agregar enlace
        </button>
      </div>

      <input
        type="search"
        placeholder="Buscar recursos…"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {isLoading && <p className="text-sm text-gray-400">Cargando…</p>}

      <div className="grid gap-3 sm:grid-cols-2">
        {data?.map(link => (
          <div key={link.id} className="bg-white border border-gray-200 rounded-xl p-4 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <a href={link.url} target="_blank" rel="noopener noreferrer"
                className="text-sm font-semibold text-blue-600 hover:underline truncate">
                {link.title}
              </a>
              <button onClick={() => deleteLink.mutate(link.id)} className="text-xs text-gray-300 hover:text-red-500 flex-shrink-0">✕</button>
            </div>
            {link.description && <p className="text-xs text-gray-500 line-clamp-2">{link.description}</p>}
            <p className="text-xs text-gray-300">{formatDate(link.created_at)}</p>
          </div>
        ))}
      </div>

      {/* Modal agregar */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md space-y-4 shadow-xl">
            <h2 className="text-base font-semibold">Nuevo recurso</h2>
            <form onSubmit={handleAdd} className="space-y-3">
              <input required placeholder="Título" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input required type="url" placeholder="https://…" value={form.url} onChange={e => setForm(f => ({ ...f, url: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <textarea placeholder="Descripción (opcional)" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                rows={2} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
              <div className="flex gap-2 justify-end">
                <button type="button" onClick={() => setOpen(false)} className="text-sm px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Cancelar</button>
                <button type="submit" disabled={addLink.isPending} className="text-sm px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
                  {addLink.isPending ? 'Guardando…' : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
