import type { EditResourceById, UpdateResourceInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ResourceForm from 'src/components/Admin/Resource/ResourceForm'

export const QUERY = gql`
  query EditResourceById($id: Int!) {
    resource: resource(id: $id) {
      id
      name
      url
      filename
      description
    }
  }
`
const UPDATE_RESOURCE_MUTATION = gql`
  mutation UpdateResourceMutation($id: Int!, $input: UpdateResourceInput!) {
    updateResource(id: $id, input: $input) {
      id
      name
      url
      filename
      description
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ resource }: CellSuccessProps<EditResourceById>) => {
  const [updateResource, { loading, error }] = useMutation(
    UPDATE_RESOURCE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Resource updated')
        navigate(routes.adminResources())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateResourceInput,
    id: EditResourceById['resource']['id']
  ) => {
    updateResource({ variables: { id, input } })
  }

  return (
    <div className="">
      <header className="mb-4">
        <h2 className="text-lg">Edit Resource {resource?.id}</h2>
      </header>
      <div className="">
        <ResourceForm resource={resource} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
