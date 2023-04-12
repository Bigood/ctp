import type { EditPracticeById, UpdatePracticeInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import PracticeForm from 'src/components/Admin/Practice/PracticeForm'

export const QUERY = gql`
  query EditPracticeById($id: Int!) {
    practice: practice(id: $id) {
      id
      createdAt
      updatedAt
      name
      synonym
      description
      shortDescription
      sources
    }
  }
`
const UPDATE_PRACTICE_MUTATION = gql`
  mutation UpdatePracticeMutation($id: Int!, $input: UpdatePracticeInput!) {
    updatePractice(id: $id, input: $input) {
      id
      createdAt
      updatedAt
      name
      synonym
      description
      shortDescription
      sources
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ practice }: CellSuccessProps<EditPracticeById>) => {
  const [updatePractice, { loading, error }] = useMutation(
    UPDATE_PRACTICE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Practice updated')
        navigate(routes.practices())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdatePracticeInput,
    id: EditPracticeById['practice']['id']
  ) => {
    updatePractice({ variables: { id, input } })
  }

  return (
    <div className="">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit Practice {practice?.id}</h2>
      </header>
      <div className="rw-segment-main">
        <PracticeForm practice={practice} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
