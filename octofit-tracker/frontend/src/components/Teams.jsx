import { CollectionPage } from './Activities.jsx'

function Teams() {
  return <CollectionPage title="Teams" endpoint="teams" apiEndpoint={`https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`} columns={['Team', 'Members', 'Points', 'Status']} />
}

export default Teams