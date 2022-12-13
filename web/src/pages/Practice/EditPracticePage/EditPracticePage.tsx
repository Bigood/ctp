import EditPracticeCell from 'src/components/Practice/EditPracticeCell'

type PracticePageProps = {
  id: number
}

const EditPracticePage = ({ id }: PracticePageProps) => {
  return <EditPracticeCell id={id} />
}

export default EditPracticePage
