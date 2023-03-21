
import { useAuth } from '@redwoodjs/auth'
import { Redirect, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const AuthCallback = () => {

  const { currentUser } = useAuth()

  //Récupération de l'ID local de l'user s'il a déjà créé
  const id = typeof currentUser.id == 'number' ? currentUser.id : undefined

  return (
    <>
      <MetaTags title="UserProfile" description="UserProfile page" />
      {id ? <Redirect to={routes.profile()}/> : <Redirect to={routes.signup()}/>}
    </>
  )
}

export default AuthCallback
