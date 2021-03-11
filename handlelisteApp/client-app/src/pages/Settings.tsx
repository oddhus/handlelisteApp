import React, {useState} from "react";
import {RouteComponentProps} from 'react-router-dom';
import {useStore} from "../stores/store";

import {
    Container,
    Heading,
    Radio,
    RadioGroup,
    Stack

} from '@chakra-ui/react'

interface Props {
}




export const Settings: React.FC<RouteComponentProps<Props>> = () => {

    const [language, setLanguage] = useState('en');
    const {settingStore} = useStore()

    const onChangeLanguageHandler = (event: string) =>{
        setLanguage(event)
        settingStore.setLanguage(event)
    }
    
    return (
        <Container
            data-testid='settings-container'
            style={{top: '50%', left: '50%'}}>
            <Heading style={{marginTop: '10px'}}>{settingStore.language.settings}</Heading>
            
            <div style={{marginTop: '10px'}}>
                <div style={{marginTop: '10px'}}> {settingStore.language.activeLanguage}</div>
                
                <div style={{marginTop: '10px'}}>
                    <RadioGroup 
                        name={'language-radio'}
                        colorScheme='blue'
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

        </Container>
    )
};