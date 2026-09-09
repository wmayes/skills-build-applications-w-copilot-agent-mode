import { CollectionPage } from './Activities.jsx'

function Users() {
  return <CollectionPage title="Users" endpoint="users" columns={['Name', 'Email', 'Team', 'Status']} />
}

export default Users