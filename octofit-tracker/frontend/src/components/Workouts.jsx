import { CollectionPage } from './Activities.jsx'

function Workouts() {
  return <CollectionPage title="Workouts" endpoint="workouts" apiEndpoint={`https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`} columns={['Workout', 'Type', 'Difficulty', 'Duration']} />
}

export default Workouts