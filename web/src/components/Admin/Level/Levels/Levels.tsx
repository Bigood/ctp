import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Admin/Level/LevelsCell'
import { truncate } from 'src/lib/formatters'

import type { DeleteLevelMutationVariables, FindLevels } from 'types/graphql'

const DELETE_LEVEL_MUTATION = gql`
  mutation DeleteLevelMutation($id: Int!) {
    deleteLevel(id: $id) {
      id
    }
  }
`

const LevelsList = ({ levels }: FindLevels) => {
  const [deleteLevel] = useMutation(DELETE_LEVEL_MUTATION, {
    onCompleted: () => {
      toast.success('Level deleted')
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

  const onDeleteClick = (id: DeleteLevelMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete level ' + id + '?')) {
      deleteLevel({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {levels.map((level) => (
            <tr key={level.id}>
              <td>{truncate(level.id)}</td>
              <td>{truncate(level.name)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.adminLevel({ id: level.id })}
                    title={'Show level ' + level.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.adminEditLevel({ id: level.id })}
                    title={'Edit level ' + level.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete level ' + level.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(level.id)}
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

export default LevelsList
