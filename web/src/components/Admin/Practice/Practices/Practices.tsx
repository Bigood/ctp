import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Admin/Practice/PracticesCell'
import { timeTag, truncate } from 'src/lib/formatters'

import type { DeletePracticeMutationVariables, FindPractices } from 'types/graphql'

const DELETE_PRACTICE_MUTATION = gql`
  mutation DeletePracticeMutation($id: Int!) {
    deletePractice(id: $id) {
      id
    }
  }
`

const PracticesList = ({ practices }: FindPractices) => {
  const [deletePractice] = useMutation(DELETE_PRACTICE_MUTATION, {
    onCompleted: () => {
      toast.success('Practice deleted')
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

  const onDeleteClick = (id: DeletePracticeMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete practice ' + id + '?')) {
      deletePractice({ variables: { id } })
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
            <th>Name</th>
            <th>Synonym</th>
            <th>Description</th>
            <th>Short description</th>
            <th>Sources</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {practices.map((practice) => (
            <tr key={practice.id}>
              <td>{truncate(practice.id)}</td>
              <td>{timeTag(practice.createdAt)}</td>
              <td>{timeTag(practice.updatedAt)}</td>
              <td>{truncate(practice.name)}</td>
              <td>{truncate(practice.synonym)}</td>
              <td>{truncate(practice.description)}</td>
              <td>{truncate(practice.shortDescription)}</td>
              <td>{truncate(practice.sources)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.practice({ id: practice.id })}
                    title={'Show practice ' + practice.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editPractice({ id: practice.id })}
                    title={'Edit practice ' + practice.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete practice ' + practice.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(practice.id)}
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

export default PracticesList
