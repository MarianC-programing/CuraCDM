# CuraCDM 🧬

Plataforma web de **gestión de datos clínicos (CDM)** orientada a equipos de investigación oncológica. Permite registrar participantes, gestionar experimentos, asignar tareas y mantener una biblioteca de recursos científicos.

## Stack

| Capa | Tecnología |
|---|---|
| Frontend | React 18 + Vite |
| Estilos | Tailwind CSS |
| Routing | React Router v7 |
| Server state | TanStack Query v5 |
| Backend / DB | Supabase (PostgreSQL + Auth + Storage) |
| Charts | Recharts |
| Forms | React Hook Form |

## Módulos

- **Auth** — Login seguro con Supabase Auth, sesión persistente, reset de contraseña
- **Dashboard** — Resumen estadístico: participantes, experimentos activos, tareas pendientes
- **Participants** — CRUD completo con filtros por nombre, tez y causa de cáncer
- **Experiments** — Seguimiento de experimentos con observaciones y archivos adjuntos
- **Tasks** — Tablero de tareas asignadas con cambio de estado inline
- **Library** — Repositorio de enlaces y recursos bibliográficos del equipo
- **Team** — Directorio de miembros del equipo investigador

## Estructura

```
CuraCDM/
├── components/
│   ├── layout/        # AppLayout, Sidebar, TopBar, PageHeader
│   ├── experiments/   # Tarjetas, formularios, gráficas de observación
│   ├── participants/  # Cards, filtros, formularios
│   ├── tasks/         # TaskBoard, TaskCard, ReportUpload
│   └── ui/            # Button, Badge, Modal, Table, EmptyState
├── contexts/          # AuthContext (Supabase session)
├── hooks/             # useParticipants, useTasks, useExperiments, useLibrary, useProfile
├── lib/               # supabase.js
├── pages/             # Dashboard, Participants, Experiments, Tasks, Library, Team
└── utils/             # formatters.js, constants.js
```

## Configuración

```bash
# 1. Instalar dependencias
npm install

# 2. Variables de entorno
cp .env.example .env
# Completar VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY

# 3. Desarrollo
npm run dev
```

## Variables de entorno

```env
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...
```

## Autora

**Marian Barba** — 2026
