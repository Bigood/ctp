import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import InitiativeForm from 'src/components/Admin/Initiative/InitiativeForm'

import type { CreateInitiativeInput } from 'types/graphql'

const CREATE_INITIATIVE_MUTATION = gql`
  mutation CreateInitiativeMutation($input: CreateInitiativeInput!) {
    createInitiative(input: $input) {
      id
    }
  }
`

const NewInitiative = () => {
  const [createInitiative, { loading, error }] = useMutation(
    CREATE_INITIATIVE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Initiative created')
        navigate(routes.adminInitiatives())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateInitiativeInput) => {
    createInitiative({ variables: { input } })
  }

  return (
    <div className="">
      <header className="mb-4">
        <h2 className="text-lg">New Initiative</h2>
      </header>
      <div className="">
        <InitiativeForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewInitiative
