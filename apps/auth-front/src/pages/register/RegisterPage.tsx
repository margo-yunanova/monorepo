import { memo, useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { FORM_ERROR } from 'final-form'
import { Form, Field } from 'react-final-form'
import { Paper } from '../../components/Paper'
import { Button, Container, Input, PasswordInput } from '@memebattle/ligretto-ui'
import { t } from '../../utils/i18n'
import { ROUTES } from '../../constants/routes'
import type { RegisterFormSubmissionErrors, RegisterFormValues } from './RegisterPage.types'
import { register } from '../../services/register'
import { Header } from '../../components/Header'
import { useRegisterValidation } from './useRegisterValidation'

export const RegisterPage = memo(() => {
  const initialValues = useMemo<RegisterFormValues>(
    () => ({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    }),
    [],
  )

  const handleSubmit = useCallback(async (values: RegisterFormValues): Promise<RegisterFormSubmissionErrors | undefined> => {
    try {
      const { data } = await register(values)

      /** If user already exists */
      if (!data.user) {
        return { username: 'User already exists' }
      }

      /** If email already confirmed */
      if (!data.user) {
        return { email: 'Email is already confirmed' }
      }
    } catch (e) {
      return { [FORM_ERROR]: 'Something went wrong' }
    }
  }, [])

  const validate = useRegisterValidation()

  return (
    <Container component="main" maxWidth="xs">
      <Header />
      <Form<RegisterFormValues>
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validate={validate}
        render={({ handleSubmit, submitError }) => (
          <form onSubmit={handleSubmit} autoComplete="off">
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
                    label={t.register.username}
                    name="username"
                    autoComplete="username"
                    autoFocus
                    error={!meta.modifiedSinceLastSubmit && Boolean(meta.error || meta.submitError)}
                    helperText={!meta.modifiedSinceLastSubmit && meta.submitError}
                  />
                )}
              />
              <Field
                name="email"
                render={({ input, meta }) => (
                  <Input
                    {...input}
                    variant="outlined"
                    type="email"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label={t.register.email}
                    name="email"
                    autoComplete="email"
                    error={meta.error || meta.submitError || meta.invalid}
                    helperText={meta.error}
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
                    error={meta.error || meta.submitError || meta.invalid}
                    helperText={meta.error}
                  />
                )}
              />
              <Field
                name="confirmPassword"
                render={({ input, meta }) => (
                  <PasswordInput
                    {...input}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="confirmPassword"
                    label={t.register.confirmPassword}
                    id="confirmPassword"
                    error={(meta.touched && meta.error) || meta.submitError || meta.invalid}
                    helperText={meta.touched && meta.error}
                  />
                )}
              />
              {submitError}
              <br />
              <Button type="submit" fullWidth variant="contained" color="primary" size="large">
                {t.register.submit}
              </Button>
              <br />
              <Link to={ROUTES.LOGIN}>{t.register.linkToLogin}</Link>
            </Paper>
          </form>
        )}
      />
    </Container>
  )
})