import { CollectionPage } from './Activities.jsx'

function Workouts() {
  return <CollectionPage title="Workouts" endpoint="workouts" columns={['Workout', 'Type', 'Difficulty', 'Duration']} />
}

export default Workouts