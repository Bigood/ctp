import ResourceCell from 'src/components/Admin/Resource/ResourceCell'

type ResourcePageProps = {
  id: number
}

const ResourcePage = ({ id }: ResourcePageProps) => {
  return <ResourceCell id={id} />
}

export default ResourcePage
