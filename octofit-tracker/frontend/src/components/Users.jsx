import { CollectionPage } from './Activities.jsx'

function Users() {
  return <CollectionPage title="Users" endpoint="users" apiEndpoint={`https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`} columns={['Name', 'Email', 'Team', 'Status']} />
}

export default Users