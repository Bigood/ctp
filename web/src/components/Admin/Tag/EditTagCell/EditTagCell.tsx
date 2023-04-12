import type { EditTagById, UpdateTagInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import TagForm from 'src/components/Admin/Tag/TagForm'

export const QUERY = gql`
  query EditTagById($id: Int!) {
    tag: tag(id: $id) {
      id
      name
    }
  }
`
const UPDATE_TAG_MUTATION = gql`
  mutation UpdateTagMutation($id: Int!, $input: UpdateTagInput!) {
    updateTag(id: $id, input: $input) {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ tag }: CellSuccessProps<EditTagById>) => {
  const [updateTag, { loading, error }] = useMutation(
    UPDATE_TAG_MUTATION,
    {
      onCompleted: () => {
        toast.success('Tag updated')
        navigate(routes.adminTags())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateTagInput,
    id: EditTagById['tag']['id']
  ) => {
    updateTag({ variables: { id, input } })
  }

  return (
    <div className="">
      <header className="mb-4">
        <h2 className="text-lg">Edit Tag {tag?.id}</h2>
      </header>
      <div className="">
        <TagForm tag={tag} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
