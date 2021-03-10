import React, {ChangeEvent, useState} from "react";
import {RouteComponentProps} from 'react-router-dom';
import {activeLanguage} from '../lang/ActiveLanguage';
import {useStore} from "../stores/store";

import {
    Input,
    Container,
    Heading,
    Button,
    FormControl,
    FormLabel,
    FormHelperText,
    Radio,
    RadioGroup,
    Stack

} from '@chakra-ui/react'

interface Props {
}




export const Settings: React.FC<RouteComponentProps<Props>> = ({match, history}) => {

    const [language, setLanguage] = React.useState('en');
    const {userStore} = useStore()

    //just for testing the loading icon
    const [isLoading, setIsLoading] = useState(false)
    const isLoadingFake = () => {
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
            history.push('/shopping-list')
        }, 2000)
    }

    const onChangeLanguageHandler = (event: string) =>{
        setLanguage(event)
        userStore.setLanguage(event)
        setCurrentLanguage(event)
    }
    
    return (
        <Container
            data-testid='settings-container'
            style={{top: '50%', left: '50%'}}>
            <Heading style={{marginTop: '10px'}}>{activeLanguage.settings}</Heading>
            
            <div style={{marginTop: '10px'}}>
                <div style={{marginTop: '10px'}}> {activeLanguage.activeLanguage}</div>
                
                <div style={{marginTop: '10px'}}>
                    <RadioGroup 
                        name={'language-radio'}
                        colorScheme='blue'
                        //onChange={(event: string) => setLanguage(event)}
                        //onChange={(event:ChangeEvent<HTMLInputElement>) => onChangeLanguageHandler(event)}
                        onChange={(event: string) => onChangeLanguageHandler(event)}

                        value={language}
                    >
                        <Stack>
                            <Radio value='en'>English</Radio>
                            <Radio value='no_b'>Norsk - Bokmål</Radio>
                        </Stack>
                    </RadioGroup>
                </div>
            </div>

            <div style={{marginTop: '10px'}}>
                {language}
            </div>
            <div style={{marginTop: '10px'}}>
                {radioCheckedLanguage}
            </div>
        </Container>
    )
};



export var radioCheckedLanguage: string = "test";

function setCurrentLanguage(event: string) {
    radioCheckedLanguage = event;
}