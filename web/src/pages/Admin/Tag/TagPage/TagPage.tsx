import TagCell from 'src/components/Admin/Tag/TagCell'

type TagPageProps = {
  id: number
}

const TagPage = ({ id }: TagPageProps) => {
  return <TagCell id={id} />
}

export default TagPage
