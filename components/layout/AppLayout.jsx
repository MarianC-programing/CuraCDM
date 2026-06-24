// ============================================================
// AppLayout.jsx + Sidebar — Plataforma de Investigación del Cáncer
// Stack: React + React Router v6 + TailwindCSS + Lucide React
//
// INSTRUCCIONES DE USO:
// 1. Copia este archivo a: src/components/layout/AppLayout.jsx
// 2. Asegúrate de tener instalado: lucide-react, react-router-dom
// 3. Agrega la fuente en index.html (ver al final del archivo)
// ============================================================

import { useState, useEffect } from "react";
import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FlaskConical,
  CheckSquare,
  BookOpen,
  UsersRound,
  ChevronLeft,
  ChevronRight,
  Bell,
  LogOut,
  Microscope,
  Menu,
  X,
  Circle,
} from "lucide-react";

// ─── Constantes de navegación ────────────────────────────────
const NAV_ITEMS = [
  {
    to: "/dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
    description: "Resumen general",
  },
  {
    to: "/participants",
    icon: Users,
    label: "Participantes",
    description: "Base de datos clínica",
  },
  {
    to: "/experiments",
    icon: FlaskConical,
    label: "Experimentos",
    description: "Semillas y pruebas",
  },
  {
    to: "/tasks",
    icon: CheckSquare,
    label: "Tareas",
    description: "Gestión del equipo",
  },
  {
    to: "/library",
    icon: BookOpen,
    label: "Biblioteca",
    description: "Recursos y enlaces",
  },
  {
    to: "/team",
    icon: UsersRound,
    label: "Equipo",
    description: "Miembros y roles",
  },
];

// ─── Mock del usuario (reemplazar con useProfile() de Supabase) ──
const MOCK_USER = {
  full_name: "Dr. Ramírez",
  role: "admin",
  avatar_initials: "DR",
};

// ─── Componente principal ─────────────────────────────────────
export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Google Fonts inyectado vía JS para no depender del index.html */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        :root {
          --bg-base:       #080C10;
          --bg-surface:    #0D1117;
          --bg-elevated:   #131B24;
          --bg-hover:      #1A2433;
          --border:        #1E2D3D;
          --border-bright: #2A3F55;
          --accent:        #00D4A8;
          --accent-dim:    #00D4A820;
          --accent-glow:   #00D4A840;
          --text-primary:  #E8F4F0;
          --text-secondary:#7A9BAE;
          --text-muted:    #3D5A6E;
          --danger:        #FF5C5C;
          --warning:       #FFB347;
          --font-display:  'Syne', sans-serif;
          --font-mono:     'DM Mono', monospace;
          --sidebar-w:     240px;
          --sidebar-collapsed: 64px;
          --topbar-h:      56px;
          --transition:    200ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        body {
          margin: 0;
          background: var(--bg-base);
          color: var(--text-primary);
          font-family: var(--font-display);
          -webkit-font-smoothing: antialiased;
        }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: var(--bg-base); }
        ::-webkit-scrollbar-thumb { background: var(--border-bright); border-radius: 2px; }
        ::-webkit-scrollbar-thumb:hover { background: var(--accent); }

        /* Nav link activo */
        .nav-link-active .nav-icon-wrap {
          background: var(--accent-dim) !important;
          border-color: var(--accent) !important;
        }
        .nav-link-active .nav-icon-wrap svg {
          color: var(--accent) !important;
        }
        .nav-link-active .nav-label {
          color: var(--accent) !important;
        }
        .nav-link-active .nav-indicator {
          opacity: 1 !important;
        }

        /* Fade in página */
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .page-enter {
          animation: fadeSlideUp 300ms ease forwards;
        }

        /* Pulso del dot de estado */
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: .5; transform: scale(0.7); }
        }
        .status-dot { animation: pulse-dot 2.5s ease-in-out infinite; }

        /* Brillo en hover del logo */
        .logo-glow:hover { filter: drop-shadow(0 0 8px var(--accent-glow)); }

        /* Mobile overlay */
        @keyframes overlayIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .mobile-overlay {
          animation: overlayIn 200ms ease forwards;
        }

        @media (max-width: 768px) {
          :root { --sidebar-w: 260px; }
        }
      `}</style>

      <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "var(--bg-base)" }}>

        {/* ── Overlay móvil ─────────────────────────────────── */}
        {mobileOpen && (
          <div
            className="mobile-overlay"
            onClick={() => setMobileOpen(false)}
            style={{
              position: "fixed", inset: 0,
              background: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(2px)",
              zIndex: 40,
              display: "none",
            }}
            // Se muestra solo en móvil vía media query inline
          />
        )}

        {/* ── SIDEBAR ───────────────────────────────────────── */}
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

        {/* ── CONTENIDO PRINCIPAL ───────────────────────────── */}
        <div style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          marginLeft: collapsed ? "var(--sidebar-collapsed)" : "var(--sidebar-w)",
          transition: `margin-left var(--transition)`,
        }}>

          {/* TopBar */}
          <TopBar
            onMenuClick={() => setMobileOpen(true)}
            user={MOCK_USER}
          />

          {/* Área de contenido */}
          <main style={{
            flex: 1,
            overflowY: "auto",
            padding: "24px",
            background: "var(--bg-base)",
          }}>
            {/* Patrón de fondo sutil */}
            <div style={{
              position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
              backgroundImage: `
                radial-gradient(circle at 20% 20%, #00D4A808 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, #0D6A5008 0%, transparent 50%)
              `,
            }} />

            <div className="page-enter" key={location.pathname} style={{ position: "relative", zIndex: 1 }}>
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

// ─── SIDEBAR ─────────────────────────────────────────────────
function Sidebar({ collapsed, setCollapsed }) {
  const location = useLocation();

  return (
    <aside style={{
      position: "fixed", top: 0, left: 0, bottom: 0,
      width: collapsed ? "var(--sidebar-collapsed)" : "var(--sidebar-w)",
      background: "var(--bg-surface)",
      borderRight: "1px solid var(--border)",
      display: "flex",
      flexDirection: "column",
      transition: `width var(--transition)`,
      zIndex: 30,
      overflow: "hidden",
    }}>

      {/* Logo */}
      <div style={{
        height: "var(--topbar-h)",
        display: "flex",
        alignItems: "center",
        padding: collapsed ? "0 18px" : "0 20px",
        borderBottom: "1px solid var(--border)",
        gap: 10,
        flexShrink: 0,
      }}>
        <div className="logo-glow" style={{
          width: 28, height: 28, flexShrink: 0,
          background: "linear-gradient(135deg, var(--accent), #00A884)",
          borderRadius: 8,
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all var(--transition)",
        }}>
          <Microscope size={14} color="#080C10" strokeWidth={2.5} />
        </div>

        {!collapsed && (
          <div style={{ overflow: "hidden" }}>
            <div style={{
              fontSize: 13,
              fontWeight: 700,
              color: "var(--text-primary)",
              letterSpacing: "0.04em",
              whiteSpace: "nowrap",
              lineHeight: 1.2,
            }}>
              ONCOLAB
            </div>
            <div style={{
              fontSize: 9,
              color: "var(--accent)",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}>
              Investigación · v1.0
            </div>
          </div>
        )}
      </div>

      {/* Navegación */}
      <nav style={{ flex: 1, padding: "12px 8px", overflowY: "auto", overflowX: "hidden" }}>

        {!collapsed && (
          <div style={{
            fontSize: 9,
            fontFamily: "var(--font-mono)",
            color: "var(--text-muted)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            padding: "4px 12px 8px",
          }}>
            Módulos
          </div>
        )}

        {NAV_ITEMS.map((item, i) => {
          const Icon = item.icon;
          const isActive = location.pathname.startsWith(item.to);

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={isActive ? "nav-link-active" : ""}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: collapsed ? "0 18px" : "0 10px",
                height: 44,
                borderRadius: 8,
                marginBottom: 2,
                textDecoration: "none",
                position: "relative",
                cursor: "pointer",
                transition: "background var(--transition)",
                background: isActive ? "var(--bg-hover)" : "transparent",
                animationDelay: `${i * 40}ms`,
              }}
              onMouseEnter={e => {
                if (!isActive) e.currentTarget.style.background = "var(--bg-hover)";
              }}
              onMouseLeave={e => {
                if (!isActive) e.currentTarget.style.background = "transparent";
              }}
            >
              {/* Indicador lateral activo */}
              <div className="nav-indicator" style={{
                position: "absolute", left: 0, top: "50%",
                transform: "translateY(-50%)",
                width: 3, height: 20,
                background: "var(--accent)",
                borderRadius: "0 2px 2px 0",
                opacity: isActive ? 1 : 0,
                transition: "opacity var(--transition)",
              }} />

              {/* Ícono */}
              <div className="nav-icon-wrap" style={{
                width: 28, height: 28, flexShrink: 0,
                borderRadius: 7,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: isActive ? "var(--accent-dim)" : "transparent",
                border: `1px solid ${isActive ? "var(--accent)" : "transparent"}`,
                transition: "all var(--transition)",
              }}>
                <Icon
                  size={14}
                  strokeWidth={isActive ? 2.5 : 1.8}
                  style={{
                    color: isActive ? "var(--accent)" : "var(--text-secondary)",
                    transition: "color var(--transition)",
                    flexShrink: 0,
                  }}
                />
              </div>

              {/* Texto */}
              {!collapsed && (
                <div style={{ overflow: "hidden", flex: 1 }}>
                  <div className="nav-label" style={{
                    fontSize: 13,
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? "var(--accent)" : "var(--text-primary)",
                    whiteSpace: "nowrap",
                    letterSpacing: "0.01em",
                    transition: "color var(--transition)",
                  }}>
                    {item.label}
                  </div>
                  <div style={{
                    fontSize: 10,
                    fontFamily: "var(--font-mono)",
                    color: "var(--text-muted)",
                    whiteSpace: "nowrap",
                    lineHeight: 1,
                  }}>
                    {item.description}
                  </div>
                </div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer del sidebar */}
      <div style={{
        borderTop: "1px solid var(--border)",
        padding: "12px 8px",
        flexShrink: 0,
      }}>

        {/* Status del sistema */}
        {!collapsed && (
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "8px 12px",
            borderRadius: 8,
            background: "var(--bg-elevated)",
            border: "1px solid var(--border)",
            marginBottom: 8,
          }}>
            <div className="status-dot" style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "var(--accent)", flexShrink: 0,
            }} />
            <div>
              <div style={{ fontSize: 10, color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>
                Supabase
              </div>
              <div style={{ fontSize: 9, color: "var(--accent)", fontFamily: "var(--font-mono)", letterSpacing: ".05em" }}>
                Conectado
              </div>
            </div>
          </div>
        )}

        {/* Botón colapsar */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            width: "100%", height: 36,
            display: "flex", alignItems: "center", justifyContent: collapsed ? "center" : "flex-start",
            gap: 8,
            padding: collapsed ? "0" : "0 12px",
            borderRadius: 8,
            background: "transparent",
            border: "1px solid var(--border)",
            cursor: "pointer",
            color: "var(--text-secondary)",
            fontSize: 11,
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.05em",
            transition: "all var(--transition)",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "var(--bg-hover)";
            e.currentTarget.style.borderColor = "var(--border-bright)";
            e.currentTarget.style.color = "var(--text-primary)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.color = "var(--text-secondary)";
          }}
        >
          {collapsed
            ? <ChevronRight size={14} />
            : <><ChevronLeft size={14} /><span>Colapsar</span></>
          }
        </button>
      </div>
    </aside>
  );
}

// ─── TOPBAR ──────────────────────────────────────────────────
function TopBar({ onMenuClick, user }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Nombre de la página actual
  const currentPage = NAV_ITEMS.find(item => location.pathname.startsWith(item.to));

  return (
    <header style={{
      height: "var(--topbar-h)",
      background: "var(--bg-surface)",
      borderBottom: "1px solid var(--border)",
      display: "flex",
      alignItems: "center",
      padding: "0 20px",
      gap: 16,
      flexShrink: 0,
      position: "sticky", top: 0, zIndex: 20,
    }}>

      {/* Breadcrumb / título */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <span style={{
            fontSize: 11,
            fontFamily: "var(--font-mono)",
            color: "var(--text-muted)",
            letterSpacing: "0.08em",
          }}>
            /
          </span>
          <span style={{
            fontSize: 13,
            fontWeight: 600,
            color: "var(--text-primary)",
            letterSpacing: "0.02em",
          }}>
            {currentPage?.label ?? "Inicio"}
          </span>
        </div>

        {currentPage && (
          <>
            <div style={{ width: 1, height: 16, background: "var(--border)" }} />
            <span style={{
              fontSize: 10,
              fontFamily: "var(--font-mono)",
              color: "var(--text-muted)",
            }}>
              {currentPage.description}
            </span>
          </>
        )}
      </div>

      {/* Acciones derechas */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>

        {/* Notificaciones */}
        <TopBarButton title="Notificaciones">
          <div style={{ position: "relative" }}>
            <Bell size={15} />
            <div style={{
              position: "absolute", top: -3, right: -3,
              width: 7, height: 7, borderRadius: "50%",
              background: "var(--accent)",
              border: "1.5px solid var(--bg-surface)",
            }} />
          </div>
        </TopBarButton>

        {/* Divider */}
        <div style={{ width: 1, height: 20, background: "var(--border)" }} />

        {/* Perfil */}
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "4px 10px 4px 6px",
          borderRadius: 8,
          cursor: "pointer",
          border: "1px solid transparent",
          transition: "all var(--transition)",
        }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "var(--bg-hover)";
            e.currentTarget.style.borderColor = "var(--border)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.borderColor = "transparent";
          }}
        >
          {/* Avatar */}
          <div style={{
            width: 28, height: 28, borderRadius: 8,
            background: "linear-gradient(135deg, var(--accent), #00A884)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 11, fontWeight: 700,
            color: "#080C10",
            letterSpacing: "0.02em",
            flexShrink: 0,
          }}>
            {user.avatar_initials}
          </div>

          <div style={{ lineHeight: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: "var(--text-primary)", whiteSpace: "nowrap" }}>
              {user.full_name}
            </div>
            <div style={{
              fontSize: 9, fontFamily: "var(--font-mono)",
              color: "var(--accent)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}>
              {user.role}
            </div>
          </div>
        </div>

        {/* Cerrar sesión */}
        <TopBarButton
          title="Cerrar sesión"
          onClick={() => {
            // supabase.auth.signOut() aquí
            navigate("/login");
          }}
          danger
        >
          <LogOut size={14} />
        </TopBarButton>
      </div>
    </header>
  );
}

// ─── Botón de TopBar ─────────────────────────────────────────
function TopBarButton({ children, onClick, title, danger }) {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        width: 32, height: 32,
        borderRadius: 7,
        background: "transparent",
        border: "1px solid var(--border)",
        cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: danger ? "var(--text-muted)" : "var(--text-secondary)",
        transition: "all var(--transition)",
        flexShrink: 0,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = danger ? "#FF5C5C15" : "var(--bg-hover)";
        e.currentTarget.style.borderColor = danger ? "var(--danger)" : "var(--border-bright)";
        e.currentTarget.style.color = danger ? "var(--danger)" : "var(--text-primary)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.color = danger ? "var(--text-muted)" : "var(--text-secondary)";
      }}
    >
      {children}
    </button>
  );
}

// ============================================================
// NOTAS DE INTEGRACIÓN
// ============================================================
//
// 1. SUPABASE AUTH — reemplaza MOCK_USER con:
//
//    import { useProfile } from '../../hooks/useProfile'
//    const { profile } = useProfile()
//    // profile.full_name, profile.role, profile.avatar_initials
//
// 2. CERRAR SESIÓN — en el botón de logout:
//
//    import { supabase } from '../../lib/supabase'
//    await supabase.auth.signOut()
//
// 3. PROTECTED ROUTE — en App.jsx asegúrate de tener:
//
//    <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
//      ...rutas protegidas
//    </Route>
//
// ============================================================