import { CollectionPage } from './Activities.jsx'

function Leaderboard() {
  return <CollectionPage title="Leaderboard" endpoint="leaderboard" columns={['Rank', 'Name', 'Team', 'Points']} />
}

export default Leaderboard