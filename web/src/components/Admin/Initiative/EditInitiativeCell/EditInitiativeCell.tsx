import type { EditInitiativeById, UpdateInitiativeInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import InitiativeForm from 'src/components/Admin/Initiative/InitiativeForm'

export const QUERY = gql`
  query EditInitiativeById($id: Int!) {
    initiative: initiative(id: $id) {
      id
      cuid
      idv1
      createdAt
      updatedAt
      image
      title
      outsideUsers
      contact
      descriptionMD
      conditionsMD
      evaluationMD
      strengthsMD
      transferabilityMD
      authorId
    }
  }
`
const UPDATE_INITIATIVE_MUTATION = gql`
  mutation UpdateInitiativeMutation($id: Int!, $input: UpdateInitiativeInput!) {
    updateInitiative(id: $id, input: $input) {
      id
      cuid
      idv1
      createdAt
      updatedAt
      image
      title
      outsideUsers
      contact
      descriptionMD
      conditionsMD
      evaluationMD
      strengthsMD
      transferabilityMD
      authorId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ initiative }: CellSuccessProps<EditInitiativeById>) => {
  const [updateInitiative, { loading, error }] = useMutation(
    UPDATE_INITIATIVE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Initiative updated')
        navigate(routes.adminInitiatives())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateInitiativeInput,
    id: EditInitiativeById['initiative']['id']
  ) => {
    updateInitiative({ variables: { id, input } })
  }

  return (
    <div className="">
      <header className="mb-4">
        <h2 className="text-lg">Edit Initiative {initiative?.id}</h2>
      </header>
      <div className="">
        <InitiativeForm initiative={initiative} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
