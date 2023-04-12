import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import SponsorForm from 'src/components/Admin/Sponsor/SponsorForm'

import type { CreateSponsorInput } from 'types/graphql'

const CREATE_SPONSOR_MUTATION = gql`
  mutation CreateSponsorMutation($input: CreateSponsorInput!) {
    createSponsor(input: $input) {
      id
    }
  }
`

const NewSponsor = () => {
  const [createSponsor, { loading, error }] = useMutation(
    CREATE_SPONSOR_MUTATION,
    {
      onCompleted: () => {
        toast.success('Sponsor created')
        navigate(routes.adminSponsors())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateSponsorInput) => {
    createSponsor({ variables: { input } })
  }

  return (
    <div className="">
      <header className="mb-4">
        <h2 className="text-lg">New Sponsor</h2>
      </header>
      <div className="">
        <SponsorForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewSponsor
