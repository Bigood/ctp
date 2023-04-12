import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import LevelForm from 'src/components/Admin/Level/LevelForm'

import type { CreateLevelInput } from 'types/graphql'

const CREATE_LEVEL_MUTATION = gql`
  mutation CreateLevelMutation($input: CreateLevelInput!) {
    createLevel(input: $input) {
      id
    }
  }
`

const NewLevel = () => {
  const [createLevel, { loading, error }] = useMutation(
    CREATE_LEVEL_MUTATION,
    {
      onCompleted: () => {
        toast.success('Level created')
        navigate(routes.adminLevels())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateLevelInput) => {
    createLevel({ variables: { input } })
  }

  return (
    <div className="">
      <header className="mb-4">
        <h2 className="text-lg">New Level</h2>
      </header>
      <div className="">
        <LevelForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewLevel
