import { MetaTags } from '@redwoodjs/web'
import ProfileCell from 'src/components/User/ProfileCell'


const ProfilePage = ({ id }) => {
  return (
    <>
      <MetaTags title="UserProfile" description="UserProfile page" />
      <ProfileCell id={id} />
    </>
  )
}

export default ProfilePage
