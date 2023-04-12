import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Admin/Resource/ResourcesCell'
import { truncate } from 'src/lib/formatters'

import type { DeleteResourceMutationVariables, FindResources } from 'types/graphql'

const DELETE_RESOURCE_MUTATION = gql`
  mutation DeleteResourceMutation($id: Int!) {
    deleteResource(id: $id) {
      id
    }
  }
`

const ResourcesList = ({ resources }: FindResources) => {
  const [deleteResource] = useMutation(DELETE_RESOURCE_MUTATION, {
    onCompleted: () => {
      toast.success('Resource deleted')
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

  const onDeleteClick = (id: DeleteResourceMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete resource ' + id + '?')) {
      deleteResource({ variables: { id } })
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
            <th>Filename</th>
            <th>Description</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {resources.map((resource) => (
            <tr key={resource.id}>
              <td>{truncate(resource.id)}</td>
              <td>{truncate(resource.name)}</td>
              <td>{truncate(resource.url)}</td>
              <td>{truncate(resource.filename)}</td>
              <td>{truncate(resource.description)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.adminResource({ id: resource.id })}
                    title={'Show resource ' + resource.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.adminEditResource({ id: resource.id })}
                    title={'Edit resource ' + resource.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete resource ' + resource.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(resource.id)}
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

export default ResourcesList
