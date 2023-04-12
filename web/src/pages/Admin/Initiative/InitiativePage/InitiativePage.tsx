import InitiativeCell from 'src/components/Admin/Initiative/InitiativeCell'

type InitiativePageProps = {
  id: number
}

const InitiativePage = ({ id }: InitiativePageProps) => {
  return <InitiativeCell id={id} />
}

export default InitiativePage
