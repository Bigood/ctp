import SponsorCell from 'src/components/Admin/Sponsor/SponsorCell'

type SponsorPageProps = {
  id: number
}

const SponsorPage = ({ id }: SponsorPageProps) => {
  return <SponsorCell id={id} />
}

export default SponsorPage
