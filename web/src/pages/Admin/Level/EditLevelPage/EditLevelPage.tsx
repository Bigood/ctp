import EditLevelCell from 'src/components/Admin/Level/EditLevelCell'

type LevelPageProps = {
  id: number
}

const EditLevelPage = ({ id }: LevelPageProps) => {
  return <EditLevelCell id={id} />
}

export default EditLevelPage
