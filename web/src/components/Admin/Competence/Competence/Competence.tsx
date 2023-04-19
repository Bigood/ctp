
import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import type { DeleteCompetenceMutationVariables, FindCompetenceById } from 'types/graphql'

const DELETE_COMPETENCE_MUTATION = gql`
  mutation DeleteCompetenceMutation($id: Int!) {
    deleteCompetence(id: $id) {
      id
    }
  }
`

interface Props {
  competence: NonNullable<FindCompetenceById['competence']>
}

const Competence = ({ competence }: Props) => {
  const [deleteCompetence] = useMutation(DELETE_COMPETENCE_MUTATION, {
    onCompleted: () => {
      toast.success('Competence deleted')
      navigate(routes.adminCompetences())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteCompetenceMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete competence ' + id + '?')) {
      deleteCompetence({ variables: { id } })
    }
  }

  return (
    <>
      <div className="">
        <header className="mb-4">
          <h2 className="text-lg">
            Competence {competence.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{competence.id}</td>
            </tr><tr>
              <th>Name</th>
              <td>{competence.name}</td>
            </tr><tr>
              <th>Url</th>
              <td>{competence.url}</td>
            </tr><tr>
              <th>Type</th>
              <td>{competence.type}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.adminEditCompetence({ id: competence.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(competence.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Competence
