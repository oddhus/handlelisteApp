import React, {ChangeEvent, useState, Fragment} from 'react'
import {observer} from 'mobx-react-lite'
import {
    Input,
    Container,
    Heading,
    Button,
    Tag,
    FormControl,
    FormLabel
} from '@chakra-ui/react'
import {useStore} from '../stores/store'
import {Form, Formik, ErrorMessage} from 'formik'

interface Props {
}

export const SignIn: React.FC<Props> = observer(() => {
    const {userStore, settingStore} = useStore()

    const [userName, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onChangeUsernameHandler = (event: any) => {
        setUsername(event.target.value)
    }

    const onChangePasswordHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    return (
        <Fragment>
            <Container
                data-testid="login-container"
                style={{top: '50%', left: '50%'}}
            >
                <Heading style={{marginTop: '10px'}}>
                    {settingStore.language.login}
                </Heading>
                <Formik
                    initialValues={{username: '', password: '', error: null}}
                    onSubmit={(values, {setErrors}) => {
                        userStore.login({
                            username: userName,
                            password: password
                        }).catch(error =>
                            setErrors({error: 'Invalid username or password'}))
                    }}
                >
                    {({handleSubmit, errors}) => (
                        <Form className='ui form' onSubmit={handleSubmit}>
                            <ErrorMessage
                                name='error'
                                render={() => <Tag size='sm' variant="solid" colorScheme="red">
                                    {errors.error}
                                </Tag>}
                            />
                            <FormControl style={{marginTop: '10px'}} id="username">
                                <FormLabel>{settingStore.language.Username}</FormLabel>
                                <Input
                                    aria-label={settingStore.language.Username}
                                    type="text"
                                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                        onChangeUsernameHandler(event)
                                    }
                                    placeholder={settingStore.language.Username}
                                    value={userName}
                                />
                            </FormControl>
                            <FormControl style={{marginTop: '10px'}} id="email">
                                <FormLabel>{settingStore.language.password}</FormLabel>
                                <Input
                                    aria-label={settingStore.language.password}
                                    type="password"
                                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                        onChangePasswordHandler(event)
                                    }
                                    placeholder="Your password"
                                    value={password}
                                />
                            </FormControl>
                            <Button
                                data-testid="login-Button"
                                style={{marginTop: '10px'}}
                                colorScheme='green' type='submit'
                                isLoading={userStore.loading}
                            >{settingStore.language.login}</Button>
                        </Form>
                    )}
                </Formik>
            </Container>
        </Fragment>
    )
})
