import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Admin/Initiative/InitiativesCell'
import { timeTag, truncate } from 'src/lib/formatters'

import type { DeleteInitiativeMutationVariables, FindInitiatives } from 'types/graphql'

const DELETE_INITIATIVE_MUTATION = gql`
  mutation DeleteInitiativeMutation($id: Int!) {
    deleteInitiative(id: $id) {
      id
    }
  }
`

const InitiativesList = ({ initiatives }: FindInitiatives) => {
  const [deleteInitiative] = useMutation(DELETE_INITIATIVE_MUTATION, {
    onCompleted: () => {
      toast.success('Initiative deleted')
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

  const onDeleteClick = (id: DeleteInitiativeMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete initiative ' + id + '?')) {
      deleteInitiative({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Cuid</th>
            <th>Idv1</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Image</th>
            <th>Title</th>
            <th>Outside users</th>
            <th>Contact</th>
            <th>Description md</th>
            <th>Conditions md</th>
            <th>Evaluation md</th>
            <th>Strengths md</th>
            <th>Transferability md</th>
            <th>Author id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {initiatives.map((initiative) => (
            <tr key={initiative.id}>
              <td>{truncate(initiative.id)}</td>
              <td>{truncate(initiative.cuid)}</td>
              <td>{truncate(initiative.idv1)}</td>
              <td>{timeTag(initiative.createdAt)}</td>
              <td>{timeTag(initiative.updatedAt)}</td>
              <td>{truncate(initiative.image)}</td>
              <td>{truncate(initiative.title)}</td>
              <td>{truncate(initiative.outsideUsers)}</td>
              <td>{truncate(initiative.contact)}</td>
              <td>{truncate(initiative.descriptionMD)}</td>
              <td>{truncate(initiative.conditionsMD)}</td>
              <td>{truncate(initiative.evaluationMD)}</td>
              <td>{truncate(initiative.strengthsMD)}</td>
              <td>{truncate(initiative.transferabilityMD)}</td>
              <td>{truncate(initiative.authorId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.adminInitiative({ id: initiative.id })}
                    title={'Show initiative ' + initiative.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.adminEditInitiative({ id: initiative.id })}
                    title={'Edit initiative ' + initiative.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete initiative ' + initiative.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(initiative.id)}
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

export default InitiativesList
