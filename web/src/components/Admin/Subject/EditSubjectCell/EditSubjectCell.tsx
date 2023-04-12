import type { EditSubjectById, UpdateSubjectInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import SubjectForm from 'src/components/Admin/Subject/SubjectForm'

export const QUERY = gql`
  query EditSubjectById($id: Int!) {
    subject: subject(id: $id) {
      id
      name
    }
  }
`
const UPDATE_SUBJECT_MUTATION = gql`
  mutation UpdateSubjectMutation($id: Int!, $input: UpdateSubjectInput!) {
    updateSubject(id: $id, input: $input) {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ subject }: CellSuccessProps<EditSubjectById>) => {
  const [updateSubject, { loading, error }] = useMutation(
    UPDATE_SUBJECT_MUTATION,
    {
      onCompleted: () => {
        toast.success('Subject updated')
        navigate(routes.adminSubjects())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateSubjectInput,
    id: EditSubjectById['subject']['id']
  ) => {
    updateSubject({ variables: { id, input } })
  }

  return (
    <div className="">
      <header className="mb-4">
        <h2 className="text-lg">Edit Subject {subject?.id}</h2>
      </header>
      <div className="">
        <SubjectForm subject={subject} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
