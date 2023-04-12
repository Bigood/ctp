import EditInitiativeCell from 'src/components/Admin/Initiative/EditInitiativeCell'

type InitiativePageProps = {
  id: number
}

const EditInitiativePage = ({ id }: InitiativePageProps) => {
  return <EditInitiativeCell id={id} />
}

export default EditInitiativePage
