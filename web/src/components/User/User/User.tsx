
import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag, checkboxInputTag } from 'src/lib/formatters'

import type { DeleteUserMutationVariables, FindUserById } from 'types/graphql'

const DELETE_USER_MUTATION = gql`
  mutation DeleteUserMutation($id: Int!) {
    deleteUser(id: $id) {
      id
    }
  }
`

interface Props {
  user: NonNullable<FindUserById['user']>
}

const User = ({ user }: Props) => {
  const [deleteUser] = useMutation(DELETE_USER_MUTATION, {
    onCompleted: () => {
      toast.success('User deleted')
      navigate(routes.users())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteUserMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete user ' + id + '?')) {
      deleteUser({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            User {user.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{user.id}</td>
            </tr><tr>
              <th>Created at</th>
              <td>{timeTag(user.createdAt)}</td>
            </tr><tr>
              <th>Updated at</th>
              <td>{timeTag(user.updatedAt)}</td>
            </tr><tr>
              <th>Email</th>
              <td>{user.email}</td>
            </tr><tr>
              <th>Name</th>
              <td>{user.name}</td>
            </tr><tr>
              <th>Surname</th>
              <td>{user.surname}</td>
            </tr><tr>
              <th>Organization</th>
              <td>{user.organization?.name} (#{user.organization?.id})</td>
            </tr><tr>
              <th>Distant instance</th>
              <td>{user.instance?.host}</td>
            </tr><tr>
              <th>Phone</th>
              <td>{user.phone}</td>
            </tr><tr>
              <th>ShowEmail</th>
              <td>{checkboxInputTag(user.showEmail)}</td>
            </tr><tr>
              <th>ShowPhone</th>
              <td>{checkboxInputTag(user.showPhone)}</td>
            </tr><tr>
              <th>Job</th>
              <td>{user.job}</td>
            </tr><tr>
              <th>Department</th>
              <td>{user.department}</td>
            </tr><tr>
              <th>ShortPresentation</th>
              <td>{user.shortPresentation}</td>
            </tr><tr>
              <th>Presentation</th>
              <td>{user.presentation}</td>
            </tr><tr>
              <th>Subjects</th>
              <td>{user.subjects}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editUser({ id: user.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(user.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default User
