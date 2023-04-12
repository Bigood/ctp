import EditCompetenceCell from 'src/components/Admin/Competence/EditCompetenceCell'

type CompetencePageProps = {
  id: number
}

const EditCompetencePage = ({ id }: CompetencePageProps) => {
  return <EditCompetenceCell id={id} />
}

export default EditCompetencePage
