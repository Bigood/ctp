import EditPracticeCell from 'src/components/Admin/Practice/EditPracticeCell'

type PracticePageProps = {
  id: number
}

const EditPracticePage = ({ id }: PracticePageProps) => {
  return <EditPracticeCell id={id} />
}

export default EditPracticePage
