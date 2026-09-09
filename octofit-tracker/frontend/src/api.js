const configuredApiUrl = import.meta.env.VITE_API_URL?.trim()
const browserHost = typeof window !== 'undefined' ? window.location.hostname : ''
const codespaceHost = browserHost.replace(/-5173\.app\.github\.dev$/, '-8000.app.github.dev')
const apiOrigin = configuredApiUrl || (codespaceHost !== browserHost ? `https://${codespaceHost}` : 'http://localhost:8000')

export const API_BASE_URL = apiOrigin

function extractItems(payload) {
  if (Array.isArray(payload)) return payload
  if (!payload || typeof payload !== 'object') return []
  if (Array.isArray(payload.results)) return payload.results
  if (Array.isArray(payload.items)) return payload.items
  if (Array.isArray(payload.data)) return payload.data
  return []
}

export async function fetchCollection(component) {
  const response = await fetch(`${API_BASE_URL}/api/${component}/`)
  if (!response.ok) throw new Error(`Unable to load ${component}.`)
  return extractItems(await response.json())
}