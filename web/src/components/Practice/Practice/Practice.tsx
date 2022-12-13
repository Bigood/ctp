
import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag,  } from 'src/lib/formatters'

import type { DeletePracticeMutationVariables, FindPracticeById } from 'types/graphql'

const DELETE_PRACTICE_MUTATION = gql`
  mutation DeletePracticeMutation($id: Int!) {
    deletePractice(id: $id) {
      id
    }
  }
`

interface Props {
  practice: NonNullable<FindPracticeById['practice']>
}

const Practice = ({ practice }: Props) => {
  const [deletePractice] = useMutation(DELETE_PRACTICE_MUTATION, {
    onCompleted: () => {
      toast.success('Practice deleted')
      navigate(routes.practices())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeletePracticeMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete practice ' + id + '?')) {
      deletePractice({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Practice {practice.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{practice.id}</td>
            </tr><tr>
              <th>Created at</th>
              <td>{timeTag(practice.createdAt)}</td>
            </tr><tr>
              <th>Updated at</th>
              <td>{timeTag(practice.updatedAt)}</td>
            </tr><tr>
              <th>Name</th>
              <td>{practice.name}</td>
            </tr><tr>
              <th>Synonym</th>
              <td>{practice.synonym}</td>
            </tr><tr>
              <th>Description</th>
              <td>{practice.description}</td>
            </tr><tr>
              <th>Short description</th>
              <td>{practice.shortDescription}</td>
            </tr><tr>
              <th>Sources</th>
              <td>{practice.sources}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editPractice({ id: practice.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(practice.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Practice
