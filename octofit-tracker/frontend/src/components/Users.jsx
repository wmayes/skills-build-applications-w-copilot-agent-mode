import { CollectionPage } from './Activities.jsx'

function Users() {
  return <CollectionPage title="Users" endpoint="users" apiEndpoint="/api/users/" columns={['Name', 'Email', 'Team', 'Status']} />
}

export default Users