import type { EditNetworkById, UpdateNetworkInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import NetworkForm from 'src/components/Admin/Network/NetworkForm'

export const QUERY = gql`
  query EditNetworkById($id: Int!) {
    network: network(id: $id) {
      id
      name
      url
      logo
      authorId
    }
  }
`
const UPDATE_NETWORK_MUTATION = gql`
  mutation UpdateNetworkMutation($id: Int!, $input: UpdateNetworkInput!) {
    updateNetwork(id: $id, input: $input) {
      id
      name
      url
      logo
      authorId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ network }: CellSuccessProps<EditNetworkById>) => {
  const [updateNetwork, { loading, error }] = useMutation(
    UPDATE_NETWORK_MUTATION,
    {
      onCompleted: () => {
        toast.success('Network updated')
        navigate(routes.adminNetworks())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateNetworkInput,
    id: EditNetworkById['network']['id']
  ) => {
    updateNetwork({ variables: { id, input } })
  }

  return (
    <div className="">
      <header className="mb-4">
        <h2 className="text-lg">Edit Network {network?.id}</h2>
      </header>
      <div className="">
        <NetworkForm network={network} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
