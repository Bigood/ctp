import type { EditSponsorById, UpdateSponsorInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import SponsorForm from 'src/components/Admin/Sponsor/SponsorForm'

export const QUERY = gql`
  query EditSponsorById($id: Int!) {
    sponsor: sponsor(id: $id) {
      id
      name
      url
      logo
    }
  }
`
const UPDATE_SPONSOR_MUTATION = gql`
  mutation UpdateSponsorMutation($id: Int!, $input: UpdateSponsorInput!) {
    updateSponsor(id: $id, input: $input) {
      id
      name
      url
      logo
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ sponsor }: CellSuccessProps<EditSponsorById>) => {
  const [updateSponsor, { loading, error }] = useMutation(
    UPDATE_SPONSOR_MUTATION,
    {
      onCompleted: () => {
        toast.success('Sponsor updated')
        navigate(routes.adminSponsors())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateSponsorInput,
    id: EditSponsorById['sponsor']['id']
  ) => {
    updateSponsor({ variables: { id, input } })
  }

  return (
    <div className="">
      <header className="mb-4">
        <h2 className="text-lg">Edit Sponsor {sponsor?.id}</h2>
      </header>
      <div className="">
        <SponsorForm sponsor={sponsor} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
