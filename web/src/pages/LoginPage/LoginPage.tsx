import { MetaTags } from "@redwoodjs/web"
import Auth from "src/components/Auth/Auth"

const LoginPage = () => {
  return (
    <>
      <MetaTags title="Login" />

      <Auth />
    </>
  )
}

export default LoginPage
