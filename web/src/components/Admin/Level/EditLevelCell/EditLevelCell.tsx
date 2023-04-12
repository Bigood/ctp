import type { EditLevelById, UpdateLevelInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import LevelForm from 'src/components/Admin/Level/LevelForm'

export const QUERY = gql`
  query EditLevelById($id: Int!) {
    level: level(id: $id) {
      id
      name
    }
  }
`
const UPDATE_LEVEL_MUTATION = gql`
  mutation UpdateLevelMutation($id: Int!, $input: UpdateLevelInput!) {
    updateLevel(id: $id, input: $input) {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ level }: CellSuccessProps<EditLevelById>) => {
  const [updateLevel, { loading, error }] = useMutation(
    UPDATE_LEVEL_MUTATION,
    {
      onCompleted: () => {
        toast.success('Level updated')
        navigate(routes.adminLevels())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateLevelInput,
    id: EditLevelById['level']['id']
  ) => {
    updateLevel({ variables: { id, input } })
  }

  return (
    <div className="">
      <header className="mb-4">
        <h2 className="text-lg">Edit Level {level?.id}</h2>
      </header>
      <div className="">
        <LevelForm level={level} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
