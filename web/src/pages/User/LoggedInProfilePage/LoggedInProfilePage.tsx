import { useAuth } from "src/auth"
import { MetaTags } from '@redwoodjs/web'
import ProfileCell from 'src/components/User/ProfileCell'


const LoggedInProfilePage = () => {
  const { currentUser } = useAuth();

  //Récupération de l'ID local de l'user s'il a déjà créé
  const id = typeof currentUser.id == 'number' ? currentUser.id : undefined

  return (
    <>
      <MetaTags title="UserProfile" description="UserProfile page" />
      <ProfileCell id={id} />
      {/* <pre>{currentUser}</pre> */}
    </>
  )
}

export default LoggedInProfilePage
