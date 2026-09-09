import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Activities() {
  return <CollectionPage title="Activities" endpoint="activities" columns={['Activity', 'User', 'Duration', 'Date']} />
}

export function CollectionPage({ title, endpoint, columns }) {
  const [items, setItems] = useState([])
  const [state, setState] = useState('loading')

  useEffect(() => {
    let isCurrent = true
    fetchCollection(endpoint)
      .then((data) => {
        if (isCurrent) {
          setItems(data)
          setState('ready')
        }
      })
      .catch(() => isCurrent && setState('error'))
    return () => { isCurrent = false }
  }, [endpoint])

  return (
    <section className="data-page">
      <div className="page-heading"><p className="eyebrow">OCTOFIT / {endpoint.toUpperCase()}</p><h1>{title}</h1></div>
      {state === 'loading' && <p className="status">Loading {title.toLowerCase()}...</p>}
      {state === 'error' && <p className="status error">Could not connect to the OctoFit API.</p>}
      {state === 'ready' && (
        <div className="table-wrap">
          <table className="data-table"><thead><tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr></thead>
            <tbody>{items.length ? items.map((item, index) => <tr key={item.id ?? item._id ?? index}>{columns.map((column) => <td key={column}>{formatValue(item, endpoint, column)}</td>)}</tr>) : <tr><td className="empty" colSpan={columns.length}>No {title.toLowerCase()} recorded yet.</td></tr>}</tbody>
          </table>
        </div>
      )}
    </section>
  )
}

function formatValue(item, endpoint, column) {
  const field = {
    activities: { Activity: 'type', User: 'username', Duration: 'durationMinutes', Date: 'date' },
    users: { Name: 'name', Email: 'email' },
    teams: { Team: 'name', Members: 'members' },
    leaderboard: { Name: 'username', Points: 'points', Rank: 'rank' },
    workouts: { Workout: 'title', Type: 'focus', Difficulty: 'level', Duration: 'durationMinutes' },
  }[endpoint]?.[column]
  if (field) {
    const value = item[field]
    if (value !== undefined) return Array.isArray(value) ? value.join(', ') : String(value)
  }
  if ((column === 'Status')) return 'Active'
  const key = column.toLowerCase().replaceAll(' ', '')
  const value = item[column] ?? item[key] ?? item[column.toLowerCase()] ?? item.id ?? '—'
  return typeof value === 'object' ? JSON.stringify(value) : String(value)
}

export default Activities