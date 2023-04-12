import CompetenceCell from 'src/components/Admin/Competence/CompetenceCell'

type CompetencePageProps = {
  id: number
}

const CompetencePage = ({ id }: CompetencePageProps) => {
  return <CompetenceCell id={id} />
}

export default CompetencePage
