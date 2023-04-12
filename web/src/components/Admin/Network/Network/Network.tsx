
import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import {  } from 'src/lib/formatters'

import type { DeleteNetworkMutationVariables, FindNetworkById } from 'types/graphql'

const DELETE_NETWORK_MUTATION = gql`
  mutation DeleteNetworkMutation($id: Int!) {
    deleteNetwork(id: $id) {
      id
    }
  }
`

interface Props {
  network: NonNullable<FindNetworkById['network']>
}

const Network = ({ network }: Props) => {
  const [deleteNetwork] = useMutation(DELETE_NETWORK_MUTATION, {
    onCompleted: () => {
      toast.success('Network deleted')
      navigate(routes.adminNetworks())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteNetworkMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete network ' + id + '?')) {
      deleteNetwork({ variables: { id } })
    }
  }

  return (
    <>
      <div className="">
        <header className="mb-4">
          <h2 className="text-lg">
            Network {network.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{network.id}</td>
            </tr><tr>
              <th>Name</th>
              <td>{network.name}</td>
            </tr><tr>
              <th>Url</th>
              <td>{network.url}</td>
            </tr><tr>
              <th>Logo</th>
              <td>{network.logo}</td>
            </tr><tr>
              <th>Author id</th>
              <td>{network.authorId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.adminEditNetwork({ id: network.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(network.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Network
