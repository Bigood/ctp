import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import NetworkForm from 'src/components/Admin/Network/NetworkForm'

import type { CreateNetworkInput } from 'types/graphql'

const CREATE_NETWORK_MUTATION = gql`
  mutation CreateNetworkMutation($input: CreateNetworkInput!) {
    createNetwork(input: $input) {
      id
    }
  }
`

const NewNetwork = () => {
  const [createNetwork, { loading, error }] = useMutation(
    CREATE_NETWORK_MUTATION,
    {
      onCompleted: () => {
        toast.success('Network created')
        navigate(routes.adminNetworks())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateNetworkInput) => {
    createNetwork({ variables: { input } })
  }

  return (
    <div className="">
      <header className="mb-4">
        <h2 className="text-lg">New Network</h2>
      </header>
      <div className="">
        <NetworkForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewNetwork
