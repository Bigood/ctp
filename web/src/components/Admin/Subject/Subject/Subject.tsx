
import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import {  } from 'src/lib/formatters'

import type { DeleteSubjectMutationVariables, FindSubjectById } from 'types/graphql'

const DELETE_SUBJECT_MUTATION = gql`
  mutation DeleteSubjectMutation($id: Int!) {
    deleteSubject(id: $id) {
      id
    }
  }
`

interface Props {
  subject: NonNullable<FindSubjectById['subject']>
}

const Subject = ({ subject }: Props) => {
  const [deleteSubject] = useMutation(DELETE_SUBJECT_MUTATION, {
    onCompleted: () => {
      toast.success('Subject deleted')
      navigate(routes.adminSubjects())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteSubjectMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete subject ' + id + '?')) {
      deleteSubject({ variables: { id } })
    }
  }

  return (
    <>
      <div className="">
        <header className="mb-4">
          <h2 className="text-lg">
            Subject {subject.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{subject.id}</td>
            </tr><tr>
              <th>Name</th>
              <td>{subject.name}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.adminEditSubject({ id: subject.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(subject.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Subject
