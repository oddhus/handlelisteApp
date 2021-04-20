import React, { ChangeEvent, useState, Fragment } from 'react'
import { observer } from 'mobx-react-lite'
import { Container, Heading, Button, Tag } from '@chakra-ui/react'
import { useStore } from '../stores/store'
import { Form, Formik, ErrorMessage } from 'formik'
import InputText from '../components/shared/form/InputText'
import * as Yup from 'yup'

interface Props {}

export const SignIn: React.FC<Props> = observer(() => {
  const { userStore, settingStore } = useStore()

  const [userName, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onChangeUsernameHandler = (event: any) => {
    setUsername(event.target.value)
  }

  const onChangePasswordHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const validationSchema = Yup.object({
    username: Yup.string().required('The username is required'),
    password: Yup.string().required('The password is required'),
  })

  return (
    <Fragment>
      <Container
        data-testid="login-container"
        style={{ top: '50%', left: '50%' }}
      >
        <Heading style={{ marginTop: '10px' }}>
          {settingStore.language.login}
        </Heading>
        <Formik
          validationSchema={validationSchema}
          initialValues={{ username: '', password: '', error: null }}
          onSubmit={(values, { setErrors }) =>
            userStore
              .login(values)
              .catch((error) =>
                setErrors({ error: 'Invalid username or password' })
              )
          }
        >
          {({ handleSubmit, errors }) => (
            <Form className="ui form" onSubmit={handleSubmit}>
              <ErrorMessage
                name="error"
                render={() => (
                  <Tag size="sm" variant="solid" colorScheme="red">
                    {errors.error}
                  </Tag>
                )}
              />
              <InputText
                aria-label={settingStore.language.Username}
                name="username"
                placeholder={settingStore.language.Username}
                label={settingStore.language.Username}
                data-cy="username-input"
              />
              <InputText
                aria-label={settingStore.language.password}
                name="password"
                placeholder={settingStore.language.password}
                label={settingStore.language.password}
                type="password"
                data-cy="password-input"
              />
              <Button
                data-testid="login-Button"
                style={{ marginTop: '10px' }}
                colorScheme="brand"
                type="submit"
                isLoading={userStore.loading}
              >
                {settingStore.language.login}
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    </Fragment>
  )
})
