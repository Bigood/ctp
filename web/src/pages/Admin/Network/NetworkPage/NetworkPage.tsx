import NetworkCell from 'src/components/Admin/Network/NetworkCell'

type NetworkPageProps = {
  id: number
}

const NetworkPage = ({ id }: NetworkPageProps) => {
  return <NetworkCell id={id} />
}

export default NetworkPage
