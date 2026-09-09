import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [
  { label: 'Overview', path: '/' },
  { label: 'Activities', path: '/activities' },
  { label: 'Leaderboard', path: '/leaderboard' },
  { label: 'Teams', path: '/teams' },
  { label: 'Users', path: '/users' },
  { label: 'Workouts', path: '/workouts' },
]

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <NavLink className="brand" to="/">
          <span className="brand-mark">O</span>
          <span>OctoFit <em>Tracker</em></span>
        </NavLink>
        <nav aria-label="Primary navigation" className="main-nav">
          {navigation.map(({ label, path }) => (
            <NavLink
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              end={path === '/'}
              key={path}
              to={path}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="app-content">
        <Routes>
          <Route element={<Overview />} path="/" />
          <Route element={<Activities />} path="/activities" />
          <Route element={<Leaderboard />} path="/leaderboard" />
          <Route element={<Teams />} path="/teams" />
          <Route element={<Users />} path="/users" />
          <Route element={<Workouts />} path="/workouts" />
          <Route element={<Navigate replace to="/" />} path="*" />
        </Routes>
      </main>
    </div>
  )
}

function Overview() {
  return (
    <section className="overview">
      <p className="eyebrow">TRAIN SMARTER</p>
      <h1>Your fitness, in motion.</h1>
      <p className="intro">Keep your team moving with a clear view of activity, progress, and the next workout.</p>
      <div className="overview-links">
        <NavLink className="primary-action" to="/activities">View activity</NavLink>
        <NavLink className="secondary-action" to="/workouts">Explore workouts</NavLink>
      </div>
    </section>
  )
}

export default App
