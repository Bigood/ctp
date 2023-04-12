import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ResourceForm from 'src/components/Admin/Resource/ResourceForm'

import type { CreateResourceInput } from 'types/graphql'

const CREATE_RESOURCE_MUTATION = gql`
  mutation CreateResourceMutation($input: CreateResourceInput!) {
    createResource(input: $input) {
      id
    }
  }
`

const NewResource = () => {
  const [createResource, { loading, error }] = useMutation(
    CREATE_RESOURCE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Resource created')
        navigate(routes.adminResources())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateResourceInput) => {
    createResource({ variables: { input } })
  }

  return (
    <div className="">
      <header className="mb-4">
        <h2 className="text-lg">New Resource</h2>
      </header>
      <div className="">
        <ResourceForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewResource
