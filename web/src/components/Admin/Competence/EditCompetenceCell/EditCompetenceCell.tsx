import type { EditCompetenceById, UpdateCompetenceInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import CompetenceForm from 'src/components/Admin/Competence/CompetenceForm'

export const QUERY = gql`
  query EditCompetenceById($id: Int!) {
    competence: competence(id: $id) {
      id
      name
      url
      type
    }
  }
`
const UPDATE_COMPETENCE_MUTATION = gql`
  mutation UpdateCompetenceMutation($id: Int!, $input: UpdateCompetenceInput!) {
    updateCompetence(id: $id, input: $input) {
      id
      name
      url
      type
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ competence }: CellSuccessProps<EditCompetenceById>) => {
  const [updateCompetence, { loading, error }] = useMutation(
    UPDATE_COMPETENCE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Competence updated')
        navigate(routes.adminCompetences())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateCompetenceInput,
    id: EditCompetenceById['competence']['id']
  ) => {
    updateCompetence({ variables: { id, input } })
  }

  return (
    <div className="">
      <header className="mb-4">
        <h2 className="text-lg">Edit Competence {competence?.id}</h2>
      </header>
      <div className="">
        <CompetenceForm competence={competence} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
