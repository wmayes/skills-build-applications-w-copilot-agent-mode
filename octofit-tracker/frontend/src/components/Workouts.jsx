import { CollectionPage } from './Activities.jsx'

function Workouts() {
  return <CollectionPage title="Workouts" endpoint="workouts" apiEndpoint="/api/workouts/" columns={['Workout', 'Type', 'Difficulty', 'Duration']} />
}

export default Workouts