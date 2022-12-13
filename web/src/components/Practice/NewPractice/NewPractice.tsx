import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import PracticeForm from 'src/components/Practice/PracticeForm'

import type { CreatePracticeInput } from 'types/graphql'

const CREATE_PRACTICE_MUTATION = gql`
  mutation CreatePracticeMutation($input: CreatePracticeInput!) {
    createPractice(input: $input) {
      id
    }
  }
`

const NewPractice = () => {
  const [createPractice, { loading, error }] = useMutation(
    CREATE_PRACTICE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Practice created')
        navigate(routes.practices())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreatePracticeInput) => {
    createPractice({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Practice</h2>
      </header>
      <div className="rw-segment-main">
        <PracticeForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewPractice
