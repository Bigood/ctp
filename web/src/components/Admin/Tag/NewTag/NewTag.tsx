import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import TagForm from 'src/components/Admin/Tag/TagForm'

import type { CreateTagInput } from 'types/graphql'

const CREATE_TAG_MUTATION = gql`
  mutation CreateTagMutation($input: CreateTagInput!) {
    createTag(input: $input) {
      id
    }
  }
`

const NewTag = () => {
  const [createTag, { loading, error }] = useMutation(
    CREATE_TAG_MUTATION,
    {
      onCompleted: () => {
        toast.success('Tag created')
        navigate(routes.adminTags())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateTagInput) => {
    createTag({ variables: { input } })
  }

  return (
    <div className="">
      <header className="mb-4">
        <h2 className="text-lg">New Tag</h2>
      </header>
      <div className="">
        <TagForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewTag
