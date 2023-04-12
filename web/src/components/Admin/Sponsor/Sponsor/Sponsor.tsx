
import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import {  } from 'src/lib/formatters'

import type { DeleteSponsorMutationVariables, FindSponsorById } from 'types/graphql'

const DELETE_SPONSOR_MUTATION = gql`
  mutation DeleteSponsorMutation($id: Int!) {
    deleteSponsor(id: $id) {
      id
    }
  }
`

interface Props {
  sponsor: NonNullable<FindSponsorById['sponsor']>
}

const Sponsor = ({ sponsor }: Props) => {
  const [deleteSponsor] = useMutation(DELETE_SPONSOR_MUTATION, {
    onCompleted: () => {
      toast.success('Sponsor deleted')
      navigate(routes.adminSponsors())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteSponsorMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete sponsor ' + id + '?')) {
      deleteSponsor({ variables: { id } })
    }
  }

  return (
    <>
      <div className="">
        <header className="mb-4">
          <h2 className="text-lg">
            Sponsor {sponsor.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{sponsor.id}</td>
            </tr><tr>
              <th>Name</th>
              <td>{sponsor.name}</td>
            </tr><tr>
              <th>Url</th>
              <td>{sponsor.url}</td>
            </tr><tr>
              <th>Logo</th>
              <td>{sponsor.logo}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.adminEditSponsor({ id: sponsor.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(sponsor.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Sponsor
