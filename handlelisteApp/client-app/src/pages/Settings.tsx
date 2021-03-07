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
    FormHelperText,
    Radio,
    RadioGroup,
    Stack

} from '@chakra-ui/react'

interface Props {
}


export const Settings: React.FC<RouteComponentProps<Props>> = ({match, history}) => {

    const [value, setValue] = React.useState("en");

    //just for testing the loading icon
    const [isLoading, setIsLoading] = useState(false)
    const isLoadingFake = () => {
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
            history.push('/shopping-list')
        }, 2000)
    }



    return (
        <Container
            data-testid='settings-container'
            style={{top: '50%', left: '50%'}}>
            <Heading style={{marginTop: '10px'}}>{Language.settings()}</Heading>

            <div style={{marginTop: '10px'}}> YOUR NAME</div>
            <div style={{marginTop: '10px'}}> YOUR EMAIL ADDRESS</div>
            <div style={{marginTop: '10px'}}> YOUR USER ID</div>

            <div style={{marginTop: '10px'}}><Button
                data-testid='user-Button'
                colorScheme="blue"
                onClick={isLoadingFake} // testing the loading icone
                isLoading={isLoading}>{Language.userSettings()}
            </Button></div>

            <div style={{marginTop: '10px'}}><Button
                data-testid='household-Button'
                colorScheme="blue"
                onClick={isLoadingFake} // testing the loading icone
                isLoading={isLoading}>{Language.householdSettings()}
            </Button></div>

            <div style={{marginTop: '10px'}}><Button
                data-testid='accessibility-Button'
                colorScheme="blue"
                onClick={isLoadingFake} // testing the loading icone
                isLoading={isLoading}>{Language.accessibilitySettings()}
            </Button></div>

            <div style={{marginTop: '10px'}}><Button
                data-testid='blacklist-Button'
                colorScheme="blue"
                onClick={isLoadingFake} // testing the loading icone
                isLoading={isLoading}>
                {Language.blacklistSettings()}
            </Button></div>

            <div style={{marginTop: '10px'}}>
                <div style={{marginTop: '10px'}}> {Language.activeLanguage()}</div>
                
                <div style={{marginTop: '10px'}}>
                    <RadioGroup 
                        name={'language-radio'}
                        colorScheme="blue"
                        onChange={(event: string) => setValue(event)}
                        value={value}
                    >
                        <Stack>
                            <Radio value="en" >English</Radio>
                            <Radio value="no_b">Norsk - Bokmål</Radio>
                        </Stack>
                    </RadioGroup>
                </div>
            </div>

            <div style={{marginTop: '10px'}}>
                {value}
            </div>
        </Container>
    )
};

export const radioCheckedLanguage = (): string => 'en'
