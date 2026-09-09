import { CollectionPage } from './Activities.jsx'

function Leaderboard() {
  return <CollectionPage title="Leaderboard" endpoint="leaderboard" apiEndpoint={`https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`} columns={['Rank', 'Name', 'Team', 'Points']} />
}

export default Leaderboard