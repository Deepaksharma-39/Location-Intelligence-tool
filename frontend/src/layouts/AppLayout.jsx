import { NavLink } from 'react-router-dom'
import { navItems } from '../data/navItems'

function AppLayout ({ children }) {
  return (
    <div className="app-shell">
      <aside className="sidebar glass-panel">
        <div className="brand">
          <h1>GeoPulse IQ</h1>
          <p>India Location Intelligence</p>
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
      </aside>

      <main className="main-content">{children}</main>
    </div>
  )
}

export default AppLayout
