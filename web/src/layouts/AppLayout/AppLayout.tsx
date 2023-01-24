import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { Toaster } from '@redwoodjs/web/toast'
import Header from "src/components/Header/Header"

type LayoutProps = {
  title: string
  children: React.ReactNode
}

const AppLayout = ({
  title,
  children,
}: LayoutProps) => {
  return <>
    <MetaTags title={title}/>
    <Header />
    <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
    <main className="rw-main">{children}</main>
  </>
}

export default AppLayout
