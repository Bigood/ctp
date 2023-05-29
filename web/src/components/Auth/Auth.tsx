import { useRef } from 'react'
import { useEffect } from 'react'

import { useAuth } from "src/auth"
import {
  Form,
  Label,
  TextField,
  Submit,
  FieldError,
} from '@redwoodjs/forms'
import { Link, navigate, Redirect, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'
import { useTranslation } from 'react-i18next'

const Auth = () => {
  const { isAuthenticated, logIn } = useAuth()
  const { t } = useTranslation();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  const emailRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    emailRef.current?.focus()
  }, [])

  const onSubmit = async (data: Record<string, string>) => {
    const response = await logIn({ authMethod: "otp", email: data.email }).catch(err => {throw err})
    console.log(response);
    if (response?.message) {
      toast(response?.message)
    } else if (response?.error) {
      toast.error(response?.error.message)
    } else {
      toast.success('Un lien de vérification a été envoyé sur cette adresse e-mail. Cliquez dessus pour vous connecter')
    }
  }

  return (
    <>
      <MetaTags title="Authentification" />

      <main className="">
        <div className="text-center">
          <div className="mx-auto max-w-md py-8">
            <header className="header">
              <h1 className="text-2xl">{t('auth.welcome')}</h1>
              <h2 className="text-lg">{t('auth.welcome-sub')}</h2>
            </header>

            <Form onSubmit={onSubmit} className="wrapper">
              <div className="form-control mb-2">
                <Label name="email" className="label" errorClassName="error">
                  <span className="label-text">{t('form.email')}</span>
                </Label>
                <TextField
                  name="email"
                  className="input-bordered input"
                  errorClassName="input-bordered input input-error"
                  ref={emailRef}
                  validation={{
                    required: {
                      value: true,
                      message: t('form.email-required'),
                    },
                  }}
                />
                <FieldError name="email" className="error" />
              </div>
              <Submit className="btn-primary btn">{t('login')}</Submit> {t('or')} <Link className="btn btn-outline btn-secondary" to="#">{t('form.connect-with-shibboleth')}</Link>
            </Form>
          </div>
        </div>
      </main>
    </>
  )
}

export default Auth
