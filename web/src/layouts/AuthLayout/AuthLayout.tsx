import { MetaTags } from '@redwoodjs/web'
import { Toaster } from '@redwoodjs/web/toast'

type AuthLayoutProps = {
  title: string
  children?: React.ReactNode
}

const AuthLayout = ({ title, children }: AuthLayoutProps) => {
  return <>
    <MetaTags title={title}/>
    <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
    <main>{children}</main>
  </>
}

export default AuthLayout
