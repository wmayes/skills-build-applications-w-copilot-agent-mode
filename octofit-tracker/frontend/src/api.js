const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const apiOrigin = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

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