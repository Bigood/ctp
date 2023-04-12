import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import CompetenceForm from 'src/components/Admin/Competence/CompetenceForm'

import type { CreateCompetenceInput } from 'types/graphql'

const CREATE_COMPETENCE_MUTATION = gql`
  mutation CreateCompetenceMutation($input: CreateCompetenceInput!) {
    createCompetence(input: $input) {
      id
    }
  }
`

const NewCompetence = () => {
  const [createCompetence, { loading, error }] = useMutation(
    CREATE_COMPETENCE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Competence created')
        navigate(routes.adminCompetences())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateCompetenceInput) => {
    createCompetence({ variables: { input } })
  }

  return (
    <div className="">
      <header className="mb-4">
        <h2 className="text-lg">New Competence</h2>
      </header>
      <div className="">
        <CompetenceForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewCompetence
