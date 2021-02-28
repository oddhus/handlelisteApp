import React, {ChangeEvent, useState} from "react";
import {Language} from '../lang/ActiveLanguage';
import {Button, Container, FormControl, FormHelperText, FormLabel, Heading, Input} from "@chakra-ui/react";

interface Props {}

export const SignUp: React.FC<Props> = () => {
  
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
                {Language.signUp()}</Heading>
              <FormControl style={{marginTop: '10px'}} id='email'>
                  <FormLabel>{Language.emailAddress()}</FormLabel>
                  <Input
                      placeholder={Language.emailAddress()}
                      onChange={(event:ChangeEvent<HTMLInputElement>) =>{ onchangeEmailHandler(event)}}
                  />
              </FormControl>
            
              <FormControl style={{marginTop: '10px'}} id="username">
                  <FormLabel>{Language.Username()}</FormLabel>
                  <Input
                      placeholder={Language.Username()}
                      onChange={(event:ChangeEvent<HTMLInputElement>) =>{ onchangeUsernameHandler(event)}}
                  />
              </FormControl>

              <FormControl style={{marginTop: '10px'}} id="password">
                  <FormLabel>{Language.password()}</FormLabel>
                  <Input
                      placeholder={Language.password()}
                      onChange={(event:ChangeEvent<HTMLInputElement>) =>{ onchangePasswordHandler(event)}}
                      type='password'
                  />
              </FormControl>

              <FormControl style={{marginTop: '10px'}} id="passwordRepeat">
                  <FormLabel>{Language.passwordRepeat()}</FormLabel>
                  <Input
                      placeholder={Language.passwordRepeat()}
                      onChange={(event:ChangeEvent<HTMLInputElement>) =>{ onchangeRepeatPasswordHandler(event)}}
                      type='password'
                  />
              </FormControl>

              <Button
                  data-testid='signup-button'
                  style={{marginTop: '10px'}}
                  colorScheme="blue"
                  >{Language.signUp()}</Button>
          </Container>
      )
};
