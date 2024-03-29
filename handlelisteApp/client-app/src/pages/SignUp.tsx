import React from 'react'
import { Button, Container, Heading } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { observer } from 'mobx-react-lite'
import { useStore } from '../stores/store'
import InputText from '../components/shared/form/InputText'

interface Props {}

export const SignUp: React.FC<Props> = observer(() => {
  const { userStore, settingStore } = useStore()

  const validationSchema = Yup.object({
    emailAddress: Yup.string()
      .email()
      .required('The email address is required'),
    username: Yup.string().required('The username is required'),
    password: Yup.string().required('The password is required'),
  })

  return (
    <Container data-testid="signup-container">
      <Heading style={{ marginTop: '20px' }} textAlign="center">
        {settingStore.language.signUp}
      </Heading>
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={{ emailAddress: '', username: '', password: '' }}
        onSubmit={(values) => userStore.registerNewUser(values)}
      >
        {({ values, handleChange, handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit} autoComplete="off">
            <InputText
              placeholder={settingStore.language.emailAddress}
              name="emailAddress"
              label={settingStore.language.emailAddress}
            />
            <InputText
              placeholder={settingStore.language.Username}
              name="username"
              label={settingStore.language.Username}
            />
            <InputText
              placeholder={settingStore.language.password}
              name="password"
              label={settingStore.language.password}
              type="password"
            />
            <Button
              colorScheme="brand"
              type="submit"
              style={{ marginTop: '10px' }}
              aria-label={settingStore.language.signUp}
              data-testid="signup-button"
              isLoading={userStore.loading || isSubmitting}
            >
              {settingStore.language.signUp}
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
    /*<Container data-testid="signup-container">
          <Heading style={{ marginTop: '20px' }} textAlign="center">
            {settingStore.language.signUp}
          </Heading>
          <FormControl style={{ marginTop: '10px' }} id="email" isRequired>
            <FormLabel>{settingStore.language.emailAddress}</FormLabel>
            <Input
              placeholder={settingStore.language.emailAddress}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                onchangeEmailHandler(event)
              }}
            />
          </FormControl>
    
          <FormControl style={{ marginTop: '10px' }} id="username" isRequired>
            <FormLabel>{settingStore.language.Username}</FormLabel>
            <Input 
              aria-label={settingStore.language.Username}
              placeholder={settingStore.language.Username}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                onchangeUsernameHandler(event)
              }}
            />
          </FormControl>
    
          <FormControl style={{ marginTop: '10px' }} id="username" isRequired>
            <FormLabel>{settingStore.language.age}</FormLabel>
            <Input
              aria-label={settingStore.language.age}  
              placeholder={settingStore.language.age}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                onchangeAgeHandler(event)
              }}
              type="number"
            />
          </FormControl>
    
          <FormControl style={{ marginTop: '10px' }} id="password" isRequired>
            <FormLabel>{settingStore.language.password}</FormLabel>
            <Input 
              aria-label={settingStore.language.password}   
              placeholder={settingStore.language.password}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                onchangePasswordHandler(event)
              }}
              type="password"
            />
          </FormControl>
    
          <FormControl style={{ marginTop: '10px' }} id="passwordRepeat" isRequired>
            <FormLabel>{settingStore.language.passwordRepeat}</FormLabel>
            <Input 
              aria-label={settingStore.language.passwordRepeat}  
              placeholder={settingStore.language.passwordRepeat}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                onchangeRepeatPasswordHandler(event)
              }}
              type="password"
            />
          </FormControl>
    
          <Button 
            aria-label={settingStore.language.signUp}
            data-testid="signup-button"
            style={{ marginTop: '10px' }}
            colorScheme="blue"
            onClick={() => registerNewUser()}
            isLoading={userStore.loading}
          >
            {settingStore.language.signUp}
          </Button>
        </Container>*/
  )
})
