import EditSponsorCell from 'src/components/Admin/Sponsor/EditSponsorCell'

type SponsorPageProps = {
  id: number
}

const EditSponsorPage = ({ id }: SponsorPageProps) => {
  return <EditSponsorCell id={id} />
}

export default EditSponsorPage
