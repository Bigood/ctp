import EditNetworkCell from 'src/components/Admin/Network/EditNetworkCell'

type NetworkPageProps = {
  id: number
}

const EditNetworkPage = ({ id }: NetworkPageProps) => {
  return <EditNetworkCell id={id} />
}

export default EditNetworkPage
