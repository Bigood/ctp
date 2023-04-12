
import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import {  } from 'src/lib/formatters'

import type { DeleteResourceMutationVariables, FindResourceById } from 'types/graphql'

const DELETE_RESOURCE_MUTATION = gql`
  mutation DeleteResourceMutation($id: Int!) {
    deleteResource(id: $id) {
      id
    }
  }
`

interface Props {
  resource: NonNullable<FindResourceById['resource']>
}

const Resource = ({ resource }: Props) => {
  const [deleteResource] = useMutation(DELETE_RESOURCE_MUTATION, {
    onCompleted: () => {
      toast.success('Resource deleted')
      navigate(routes.adminResources())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteResourceMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete resource ' + id + '?')) {
      deleteResource({ variables: { id } })
    }
  }

  return (
    <>
      <div className="">
        <header className="mb-4">
          <h2 className="text-lg">
            Resource {resource.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{resource.id}</td>
            </tr><tr>
              <th>Name</th>
              <td>{resource.name}</td>
            </tr><tr>
              <th>Url</th>
              <td>{resource.url}</td>
            </tr><tr>
              <th>Filename</th>
              <td>{resource.filename}</td>
            </tr><tr>
              <th>Description</th>
              <td>{resource.description}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.adminEditResource({ id: resource.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(resource.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Resource
