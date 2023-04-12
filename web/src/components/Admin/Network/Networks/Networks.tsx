import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Admin/Network/NetworksCell'
import { truncate } from 'src/lib/formatters'

import type { DeleteNetworkMutationVariables, FindNetworks } from 'types/graphql'

const DELETE_NETWORK_MUTATION = gql`
  mutation DeleteNetworkMutation($id: Int!) {
    deleteNetwork(id: $id) {
      id
    }
  }
`

const NetworksList = ({ networks }: FindNetworks) => {
  const [deleteNetwork] = useMutation(DELETE_NETWORK_MUTATION, {
    onCompleted: () => {
      toast.success('Network deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteNetworkMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete network ' + id + '?')) {
      deleteNetwork({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Url</th>
            <th>Logo</th>
            <th>Author id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {networks.map((network) => (
            <tr key={network.id}>
              <td>{truncate(network.id)}</td>
              <td>{truncate(network.name)}</td>
              <td>{truncate(network.url)}</td>
              <td>{truncate(network.logo)}</td>
              <td>{truncate(network.authorId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.adminNetwork({ id: network.id })}
                    title={'Show network ' + network.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.adminEditNetwork({ id: network.id })}
                    title={'Edit network ' + network.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete network ' + network.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(network.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default NetworksList
