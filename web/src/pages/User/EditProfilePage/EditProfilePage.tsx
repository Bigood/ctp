import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import EditUserCell from 'src/components/Admin/User/EditUserCell'
import NewUser from 'src/components/Admin/User/NewUser/NewUser'


const EditProfilePage = () => {
  const { currentUser } = useAuth()

  //Récupération de l'ID local de l'user s'il a déjà créé
  const id = typeof currentUser.id == "number" ? currentUser.id : undefined;
  const forcedValues = { email: currentUser.email, cuid: currentUser.sub}

  return (
    <>
      <MetaTags title="UserProfile" description="UserProfile page" />
      {id
        ? <EditUserCell id={id} />
        : <NewUser values={forcedValues} />}
    </>
  )
}

export default EditProfilePage
