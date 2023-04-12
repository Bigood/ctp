import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import SubjectForm from 'src/components/Admin/Subject/SubjectForm'

import type { CreateSubjectInput } from 'types/graphql'

const CREATE_SUBJECT_MUTATION = gql`
  mutation CreateSubjectMutation($input: CreateSubjectInput!) {
    createSubject(input: $input) {
      id
    }
  }
`

const NewSubject = () => {
  const [createSubject, { loading, error }] = useMutation(
    CREATE_SUBJECT_MUTATION,
    {
      onCompleted: () => {
        toast.success('Subject created')
        navigate(routes.adminSubjects())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateSubjectInput) => {
    createSubject({ variables: { input } })
  }

  return (
    <div className="">
      <header className="mb-4">
        <h2 className="text-lg">New Subject</h2>
      </header>
      <div className="">
        <SubjectForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewSubject
