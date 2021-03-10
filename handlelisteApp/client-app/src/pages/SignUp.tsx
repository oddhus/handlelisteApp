import React, {ChangeEvent, useState} from "react";
import {activeLanguage} from '../lang/ActiveLanguage';
import {Button, Container, FormControl, FormHelperText, FormLabel, Heading, Input} from "@chakra-ui/react";
import {observer} from "mobx-react-lite";
import {store} from "../stores/store";

interface Props {}


export const SignUp: React.FC<Props> = observer(() => {

    const [email, setEmail] = useState('')
    const [userName, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')

    const onchangeEmailHandler = (event:ChangeEvent<HTMLInputElement>) =>{
        setEmail(event.target.value)
    }
    const onchangeUsernameHandler = (event:ChangeEvent<HTMLInputElement>) =>{
        setUsername(event.target.value)
    }
    const onchangePasswordHandler = (event:ChangeEvent<HTMLInputElement>) =>{
        setPassword(event.target.value)
    }
    const onchangeRepeatPasswordHandler = (event:ChangeEvent<HTMLInputElement>) =>{
        setRepeatPassword(event.target.value)
    }



    return (
        <Container>
            <Heading
                style={{marginTop: '20px'}}
                textAlign='center'
                data-testid='signup-container'>
                {activeLanguage.signUp}</Heading>
            <FormControl style={{marginTop: '10px'}} id='email'>
                <FormLabel>{activeLanguage.emailAddress}</FormLabel>
                <Input
                    placeholder={activeLanguage.emailAddress}
                    onChange={(event:ChangeEvent<HTMLInputElement>) =>{ onchangeEmailHandler(event)}}
                />
            </FormControl>

            <FormControl style={{marginTop: '10px'}} id="username">
                <FormLabel>{activeLanguage.Username}</FormLabel>
                <Input
                    placeholder={activeLanguage.Username}
                    onChange={(event:ChangeEvent<HTMLInputElement>) =>{ onchangeUsernameHandler(event)}}
                />
            </FormControl>

            <FormControl style={{marginTop: '10px'}} id="password">
                <FormLabel>{activeLanguage.password}</FormLabel>
                <Input
                    placeholder={activeLanguage.password}
                    onChange={(event:ChangeEvent<HTMLInputElement>) =>{ onchangePasswordHandler(event)}}
                    type='password'
                />
            </FormControl>

            <FormControl style={{marginTop: '10px'}} id="passwordRepeat">
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
            >{activeLanguage.signUp}</Button>
        </Container>
        )
    }
)
