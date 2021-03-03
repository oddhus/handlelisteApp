import React, {ChangeEvent, useState} from "react";
import {RouteComponentProps} from 'react-router-dom';
import {Language} from '../lang/ActiveLanguage';

import {
    Input,
    Container,
    Heading,
    Button,
    FormControl,
    FormLabel,
    FormHelperText

} from '@chakra-ui/react'

import {observer} from "mobx-react-lite";
import {useStore} from "../stores/store";

interface Props {}

export const SignIn: React.FC<RouteComponentProps<Props>> = observer(({match, history}) => {
    
    const {userStore} = useStore()
    
    const [userName, setUsername] = useState('')
    const [password, setPassword] = useState('')
   
    const loginHandler = () =>{
       userStore.login({
           username: userName,
           password: password
       })
    }
    const onChangeUsernameHandler = (event:any) => {
        setUsername(event.target.value)
    }
    
    const onChangePasswordHandler = (event:ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }
    
  return (
      <Container 
          data-testid='login-container'
          style={{top: '50%', left: '50%'}}>
          <Heading style={{marginTop: '10px'}}>{Language.login()}</Heading>
          <FormControl style={{marginTop: '10px'}} id="username">
              <FormLabel>{Language.emailAddress()}</FormLabel>
              <Input 
                  type="text" 
                  onChange={(event:ChangeEvent<HTMLInputElement>) => onChangeUsernameHandler(event)}
                  placeholder='Email address'
                  value={userName}
              />
              <FormHelperText>{Language.weNeverShareEmail()}</FormHelperText>
          </FormControl>
          <FormControl style={{marginTop: '10px'}} id="email">
              <FormLabel>{Language.password()}</FormLabel>
              <Input
                  type='password'
                  onChange={(event:ChangeEvent<HTMLInputElement>) => onChangePasswordHandler(event)}
                  placeholder='Your password'
                  value={password}
              />
          </FormControl>
          <Button
              data-testid='login-Button'
              style={{marginTop: '10px'}} 
              colorScheme="blue"
              onClick={() => loginHandler()} // testing the loading icone
              >{Language.login()}</Button>
      </Container>
      
      
        )
    }
);
