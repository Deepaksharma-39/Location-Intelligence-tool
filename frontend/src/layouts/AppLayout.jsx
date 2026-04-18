import { NavLink } from 'react-router-dom'
import { navItems } from '../data/navItems'
import { useAuth } from '../context/AuthContext'

function AppLayout ({ children }) {
  const { user, logout } = useAuth()

  return (
    <div className="app-shell">
      <aside className="sidebar glass-panel">
        <div className="brand">
          <h1>GeoPulse IQ</h1>
          <p>India Location Intelligence</p>
          {user && <p className="muted">Signed in: {user.name}</p>}
        </div>

        <nav>
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active' : ''}`
                }
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            )
          })}
        </nav>

        <button type="button" className="btn-primary" onClick={logout}>Logout</button>
      </aside>

      <main className="main-content">{children}</main>
    </div>
  )
}

export default AppLayout
