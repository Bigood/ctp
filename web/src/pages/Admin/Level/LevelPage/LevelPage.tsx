import LevelCell from 'src/components/Admin/Level/LevelCell'

type LevelPageProps = {
  id: number
}

const LevelPage = ({ id }: LevelPageProps) => {
  return <LevelCell id={id} />
}

export default LevelPage
