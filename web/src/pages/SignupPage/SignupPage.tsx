import { useAuth } from "src/auth"
import { MetaTags } from '@redwoodjs/web'
import { useTranslation } from 'react-i18next'
import NewUser from 'src/components/Admin/User/NewUser/NewUser'

const SignupPage = () => {
  const { currentUser } = useAuth()
  const { t } = useTranslation();

  //Récupération de l'ID local de l'user s'il a déjà créé
  const id = typeof currentUser.id == 'number' ? currentUser.id : undefined
  const forcedValues = { email: currentUser.email, cuid: currentUser.sub }

  return (
    <>
      <MetaTags title={t('complete-your-profile')} description="" />
      <NewUser values={forcedValues} />
    </>
  )
}

export default SignupPage
