import PracticeCell from 'src/components/Practice/PracticeCell'

type PracticePageProps = {
  id: number
}

const PracticePage = ({ id }: PracticePageProps) => {
  return <PracticeCell id={id} />
}

export default PracticePage
