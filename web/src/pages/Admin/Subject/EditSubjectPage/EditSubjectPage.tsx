import EditSubjectCell from 'src/components/Admin/Subject/EditSubjectCell'

type SubjectPageProps = {
  id: number
}

const EditSubjectPage = ({ id }: SubjectPageProps) => {
  return <EditSubjectCell id={id} />
}

export default EditSubjectPage
