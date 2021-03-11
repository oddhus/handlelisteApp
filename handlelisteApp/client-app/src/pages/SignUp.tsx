import React, {ChangeEvent, useState} from "react";
import {
    Button, 
    Container, 
    FormControl, 
    FormLabel, 
    Heading, 
    Input} from "@chakra-ui/react";

import {activeLanguage} from '../lang/ActiveLanguage';
import {observer} from "mobx-react-lite";
import {useStore} from "../stores/store";

interface Props {}


export const SignUp: React.FC<Props> = observer(() => {
    const {userStore} = useStore()

    const [email, setEmail] = useState('')
    const [userName, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [age, setAge] = useState(null)
    const [repeatPassword, setRepeatPassword] = useState('')

    const onchangeEmailHandler = (event:ChangeEvent<HTMLInputElement>) =>{
        setEmail(event.target.value)
    }
    const onchangeUsernameHandler = (event:ChangeEvent<HTMLInputElement>) =>{
        setUsername(event.target.value)
    }
    const onchangeAgeHandler = (event:any) =>{
        setAge(event.target.value)
    }
    const onchangePasswordHandler = (event:ChangeEvent<HTMLInputElement>) =>{
        setPassword(event.target.value)
    }
    const onchangeRepeatPasswordHandler = (event:ChangeEvent<HTMLInputElement>) =>{
        setRepeatPassword(event.target.value)
    }
    
    const registerNewUser = () =>{
        userStore.registerNewUser({
            email: email,
            username: userName,
            hashedPassword: password,
            repeatPassword: repeatPassword,
            userAge: age
        })
    }
    
    return (
        <Container data-testid='signup-container'>
            <Heading
                style={{marginTop: '20px'}}
                textAlign='center'>
                {activeLanguage.signUp}</Heading>
            <FormControl style={{marginTop: '10px'}} id='email' isRequired>
                <FormLabel>{activeLanguage.emailAddress}</FormLabel>
                <Input
                    placeholder={activeLanguage.emailAddress}
                    onChange={(event:ChangeEvent<HTMLInputElement>) =>{ onchangeEmailHandler(event)}}
                />
            </FormControl>

            <FormControl style={{marginTop: '10px'}} id="username" isRequired>
                <FormLabel>{activeLanguage.Username}</FormLabel>
                <Input
                    placeholder={activeLanguage.Username}
                    onChange={(event:ChangeEvent<HTMLInputElement>) =>{ onchangeUsernameHandler(event)}}
                />
            </FormControl>

            <FormControl style={{marginTop: '10px'}} id="username" isRequired>
                <FormLabel>{activeLanguage.age}</FormLabel>
                <Input
                    placeholder={activeLanguage.age}
                    onChange={(event:ChangeEvent<HTMLInputElement>) =>{ onchangeAgeHandler(event)}}
                    type="number"
                />
            </FormControl>

            <FormControl style={{marginTop: '10px'}} id="password" isRequired>
                <FormLabel>{activeLanguage.password}</FormLabel>
                <Input
                    placeholder={activeLanguage.password}
                    onChange={(event:ChangeEvent<HTMLInputElement>) =>{ onchangePasswordHandler(event)}}
                    type='password'
                />
            </FormControl>

            <FormControl style={{marginTop: '10px'}} id="passwordRepeat" isRequired>
                <FormLabel>{activeLanguage.passwordRepeat}</FormLabel>
                <Input
                    placeholder={activeLanguage.passwordRepeat}
                    onChange={(event:ChangeEvent<HTMLInputElement>) =>{ onchangeRepeatPasswordHandler(event)}}
                    type='password'
                />
            </FormControl>

            <Button
                data-testid='signup-button'
                style={{marginTop: '10px'}}
                colorScheme="blue"
                onClick={() => registerNewUser()}
                //isLoading={userStore.loading}
            >{activeLanguage.signUp}</Button>
        </Container>
        )
    }
)
