import EditTagCell from 'src/components/Admin/Tag/EditTagCell'

type TagPageProps = {
  id: number
}

const EditTagPage = ({ id }: TagPageProps) => {
  return <EditTagCell id={id} />
}

export default EditTagPage
