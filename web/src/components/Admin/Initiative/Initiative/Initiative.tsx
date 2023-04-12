
import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag,  } from 'src/lib/formatters'

import type { DeleteInitiativeMutationVariables, FindInitiativeById } from 'types/graphql'

const DELETE_INITIATIVE_MUTATION = gql`
  mutation DeleteInitiativeMutation($id: Int!) {
    deleteInitiative(id: $id) {
      id
    }
  }
`

interface Props {
  initiative: NonNullable<FindInitiativeById['initiative']>
}

const Initiative = ({ initiative }: Props) => {
  const [deleteInitiative] = useMutation(DELETE_INITIATIVE_MUTATION, {
    onCompleted: () => {
      toast.success('Initiative deleted')
      navigate(routes.adminInitiatives())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteInitiativeMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete initiative ' + id + '?')) {
      deleteInitiative({ variables: { id } })
    }
  }

  return (
    <>
      <div className="">
        <header className="mb-4">
          <h2 className="text-lg">
            Initiative {initiative.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{initiative.id}</td>
            </tr><tr>
              <th>Cuid</th>
              <td>{initiative.cuid}</td>
            </tr><tr>
              <th>Idv1</th>
              <td>{initiative.idv1}</td>
            </tr><tr>
              <th>Created at</th>
              <td>{timeTag(initiative.createdAt)}</td>
            </tr><tr>
              <th>Updated at</th>
              <td>{timeTag(initiative.updatedAt)}</td>
            </tr><tr>
              <th>Image</th>
              <td>{initiative.image}</td>
            </tr><tr>
              <th>Title</th>
              <td>{initiative.title}</td>
            </tr><tr>
              <th>Outside users</th>
              <td>{initiative.outsideUsers}</td>
            </tr><tr>
              <th>Contact</th>
              <td>{initiative.contact}</td>
            </tr><tr>
              <th>Description md</th>
              <td>{initiative.descriptionMD}</td>
            </tr><tr>
              <th>Conditions md</th>
              <td>{initiative.conditionsMD}</td>
            </tr><tr>
              <th>Evaluation md</th>
              <td>{initiative.evaluationMD}</td>
            </tr><tr>
              <th>Strengths md</th>
              <td>{initiative.strengthsMD}</td>
            </tr><tr>
              <th>Transferability md</th>
              <td>{initiative.transferabilityMD}</td>
            </tr><tr>
              <th>Author id</th>
              <td>{initiative.authorId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.adminEditInitiative({ id: initiative.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(initiative.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Initiative
