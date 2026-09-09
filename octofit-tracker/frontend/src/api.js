const configuredApiUrl = import.meta.env.VITE_API_URL?.trim()
const browserHost = typeof window !== 'undefined' ? window.location.hostname : ''
const codespaceHost = browserHost.replace(/-5173\.app\.github\.dev$/, '-8000.app.github.dev')
const apiOrigin = configuredApiUrl || (codespaceHost !== browserHost ? `https://${codespaceHost}` : 'http://localhost:8000')

export const API_BASE_URL = apiOrigin
export const API_ENDPOINTS = {
  users: '/api/users/',
  teams: '/api/teams/',
  activities: '/api/activities/',
  leaderboard: '/api/leaderboard/',
  workouts: '/api/workouts/',
}

function extractItems(payload) {
  if (Array.isArray(payload)) return payload
  if (!payload || typeof payload !== 'object') return []
  if (Array.isArray(payload.results)) return payload.results
  if (Array.isArray(payload.items)) return payload.items
  if (Array.isArray(payload.data)) return payload.data
  return []
}

export async function fetchCollection(component, endpoint = API_ENDPOINTS[component]) {
  if (!endpoint) throw new Error(`Unknown API collection: ${component}`)
  const path = endpoint.match(/\/api\/.*$/)?.[0] || endpoint
  const response = await fetch(endpoint.startsWith('http') ? `${API_BASE_URL}${path}` : `${API_BASE_URL}${endpoint}`)
  if (!response.ok) throw new Error(`Unable to load ${component}.`)
  return extractItems(await response.json())
}