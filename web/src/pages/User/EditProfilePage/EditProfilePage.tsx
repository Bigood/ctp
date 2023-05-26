import { useAuth } from "src/auth"
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import EditProfileCell from 'src/components/User/EditProfileCell'
import NewUser from 'src/components/Admin/User/NewUser/NewUser'


const EditProfilePage = () => {
  const { currentUser } = useAuth()

  //Récupération de l'ID local de l'user s'il a déjà créé
  const id = typeof currentUser.id == "number" ? currentUser.id : undefined;

  return (
    <>
      <MetaTags title="Edit user profile" description="UserProfile page" />
      <EditProfileCell id={id} />
    </>
  )
}

export default EditProfilePage
