import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Admin/Organization/OrganizationsCell'
import { timeTag, truncate } from 'src/lib/formatters'

import type { DeleteOrganizationMutationVariables, FindOrganizations } from 'types/graphql'

const DELETE_ORGANIZATION_MUTATION = gql`
  mutation DeleteOrganizationMutation($id: Int!) {
    deleteOrganization(id: $id) {
      id
    }
  }
`

const OrganizationsList = ({ organizations }: FindOrganizations) => {
  const [deleteOrganization] = useMutation(DELETE_ORGANIZATION_MUTATION, {
    onCompleted: () => {
      toast.success('Organization deleted')
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

  const onDeleteClick = (id: DeleteOrganizationMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete organization ' + id + '?')) {
      deleteOrganization({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Author id</th>
            <th>Name</th>
            <th>Address</th>
            <th>Logo</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {organizations.map((organization) => (
            <tr key={organization.id}>
              <td>{truncate(organization.id)}</td>
              <td>{timeTag(organization.createdAt)}</td>
              <td>{timeTag(organization.updatedAt)}</td>
              <td>{truncate(organization.authorId)}</td>
              <td>{truncate(organization.name)}</td>
              <td>{truncate(organization.address)}</td>
              <td>{truncate(organization.logo)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.organization({ id: organization.id })}
                    title={'Show organization ' + organization.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editOrganization({ id: organization.id })}
                    title={'Edit organization ' + organization.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete organization ' + organization.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(organization.id)}
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

export default OrganizationsList
