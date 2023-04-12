
import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import {  } from 'src/lib/formatters'

import type { DeleteLevelMutationVariables, FindLevelById } from 'types/graphql'

const DELETE_LEVEL_MUTATION = gql`
  mutation DeleteLevelMutation($id: Int!) {
    deleteLevel(id: $id) {
      id
    }
  }
`

interface Props {
  level: NonNullable<FindLevelById['level']>
}

const Level = ({ level }: Props) => {
  const [deleteLevel] = useMutation(DELETE_LEVEL_MUTATION, {
    onCompleted: () => {
      toast.success('Level deleted')
      navigate(routes.adminLevels())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteLevelMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete level ' + id + '?')) {
      deleteLevel({ variables: { id } })
    }
  }

  return (
    <>
      <div className="">
        <header className="mb-4">
          <h2 className="text-lg">
            Level {level.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{level.id}</td>
            </tr><tr>
              <th>Name</th>
              <td>{level.name}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.adminEditLevel({ id: level.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(level.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Level
