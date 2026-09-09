import { CollectionPage } from './Activities.jsx'

function Teams() {
  return <CollectionPage title="Teams" endpoint="teams" apiEndpoint="/api/teams/" columns={['Team', 'Members', 'Points', 'Status']} />
}

export default Teams