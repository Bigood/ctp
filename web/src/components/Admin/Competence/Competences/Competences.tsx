import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Admin/Competence/CompetencesCell'
import { truncate } from 'src/lib/formatters'

import type { DeleteCompetenceMutationVariables, FindCompetences } from 'types/graphql'

const DELETE_COMPETENCE_MUTATION = gql`
  mutation DeleteCompetenceMutation($id: Int!) {
    deleteCompetence(id: $id) {
      id
    }
  }
`

const CompetencesList = ({ competences }: FindCompetences) => {
  const [deleteCompetence] = useMutation(DELETE_COMPETENCE_MUTATION, {
    onCompleted: () => {
      toast.success('Competence deleted')
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

  const onDeleteClick = (id: DeleteCompetenceMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete competence ' + id + '?')) {
      deleteCompetence({ variables: { id } })
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
            <th>Type</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {competences.map((competence) => (
            <tr key={competence.id}>
              <td>{truncate(competence.id)}</td>
              <td>{truncate(competence.name)}</td>
              <td>{truncate(competence.url)}</td>
              <td>{truncate(competence.type)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.adminCompetence({ id: competence.id })}
                    title={'Show competence ' + competence.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.adminEditCompetence({ id: competence.id })}
                    title={'Edit competence ' + competence.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete competence ' + competence.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(competence.id)}
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

export default CompetencesList
