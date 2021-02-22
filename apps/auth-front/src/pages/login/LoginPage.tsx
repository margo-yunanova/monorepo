import { memo, useCallback, useMemo } from 'react'
import { Form, Field } from 'react-final-form'
import { Input, PasswordInput, Container, Button } from '@memebattle/ligretto-ui'
import { Paper } from '../../components/Paper'
import { Header } from '../../components/Header'
import { t } from '../../utils/i18n'
import { ROUTES } from '../../constants/routes'
import { Link } from 'react-router-dom'
import type { LoginFormSubmissionError, LoginFormValues } from './LoginPage.types'
// import { FORM_ERROR } from 'final-form'
import { login } from '../../services/login'
import { CreatedByInfo } from '../../components/CreatedByInfo'

export const LoginPage = memo(() => {
  const initialValues = useMemo<LoginFormValues>(
    () => ({
      username: '',
      password: '',
    }),
    [],
  )

  const handleSubmit = useCallback(async (values: LoginFormValues): Promise<LoginFormSubmissionError | undefined> => {
    try {
      const { data } = await login({ login: values.username, password: values.password })

      console.log(data)
    } catch (e) {
      console.log(e.response.status)
      return { username: 'Invalid login or password', password: 'Invalid login or password' }
    }
  }, [])

  return (
    <Container component="main" maxWidth="xs">
      <Header />
      <Form<LoginFormValues>
        onSubmit={handleSubmit}
        initialValues={initialValues}
        render={({ handleSubmit, submitError }) => (
          <form onSubmit={handleSubmit}>
            <Paper>
              <Field
                name="username"
                render={({ input, meta }) => (
                  <Input
                    {...input}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label={t.login.usernameOrEmail}
                    name="username"
                    autoComplete="username"
                    autoFocus
                    error={!meta.modifiedSinceLastSubmit && Boolean(meta.error || meta.submitError)}
                    helperText={!meta.modifiedSinceLastSubmit && meta.submitError}
                  />
                )}
              />
              <Field
                name="password"
                render={({ input, meta }) => (
                  <PasswordInput
                    {...input}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label={t.login.password}
                    id="password"
                    autoComplete="current-password"
                    error={!meta.modifiedSinceLastSubmit && Boolean(meta.error || meta.submitError)}
                  />
                )}
              />
              {submitError}
              <br />
              <Button type="submit" fullWidth variant="contained" color="primary" size="large">
                {t.login.submit}
              </Button>
              <br />
              <Link to={ROUTES.REGISTER}>{t.login.linkToRegister}</Link>
            </Paper>
          </form>
        )}
      />
      <br />
      <br />
      <br />
      <CreatedByInfo />
    </Container>
  )
})