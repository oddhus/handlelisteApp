import React, {ChangeEvent, useState} from "react";
import {Button, Container, FormControl, FormHelperText, FormLabel, Heading, Input} from "@chakra-ui/react";
import {observer} from "mobx-react-lite";
import {useStore} from "../stores/store";

interface Props {}


export const SignUp: React.FC<Props> = observer(() => {

    const [email, setEmail] = useState('')
    const [userName, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')

    const {settingStore} = useStore()


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
                {settingStore.language.signUp}</Heading>
            <FormControl style={{marginTop: '10px'}} id='email'>
                <FormLabel>{settingStore.language.emailAddress}</FormLabel>
                <Input
                    placeholder={settingStore.language.emailAddress}
                    onChange={(event:ChangeEvent<HTMLInputElement>) =>{ onchangeEmailHandler(event)}}
                />
            </FormControl>

            <FormControl style={{marginTop: '10px'}} id="username">
                <FormLabel>{settingStore.language.Username}</FormLabel>
                <Input
                    placeholder={settingStore.language.Username}
                    onChange={(event:ChangeEvent<HTMLInputElement>) =>{ onchangeUsernameHandler(event)}}
                />
            </FormControl>

            <FormControl style={{marginTop: '10px'}} id="password">
                <FormLabel>{settingStore.language.password}</FormLabel>
                <Input
                    placeholder={settingStore.language.password}
                    onChange={(event:ChangeEvent<HTMLInputElement>) =>{ onchangePasswordHandler(event)}}
                    type='password'
                />
            </FormControl>

            <FormControl style={{marginTop: '10px'}} id="passwordRepeat">
                <FormLabel>{settingStore.language.passwordRepeat}</FormLabel>
                <Input
                    placeholder={settingStore.language.passwordRepeat}
                    onChange={(event:ChangeEvent<HTMLInputElement>) =>{ onchangeRepeatPasswordHandler(event)}}
                    type='password'
                />
            </FormControl>

            <Button
                data-testid='signup-button'
                style={{marginTop: '10px'}}
                colorScheme="blue"
            >{settingStore.language.signUp}</Button>
        </Container>
        )
    }
)
