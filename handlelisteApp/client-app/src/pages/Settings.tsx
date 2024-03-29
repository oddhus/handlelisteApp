import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useStore } from '../stores/store'

import { Container, Heading, Radio, RadioGroup, Stack } from '@chakra-ui/react'

interface Props {}

export const Settings: React.FC<RouteComponentProps<Props>> = () => {
  const { settingStore } = useStore()
  const [language, setLanguage] = useState(settingStore.languageString)

  const onChangeLanguageHandler = (event: string) => {
    setLanguage(event)
    localStorage.setItem('lang', event)
    settingStore.setLanguage(event)
  }

  return (
    <Container
      data-testid="settings-container"
      style={{ top: '50%', left: '50%' }}
    >
      <Heading style={{ marginTop: '10px' }}>
        {settingStore.language.settings}
      </Heading>

      <div style={{ marginTop: '10px' }}>
        <div style={{ marginTop: '10px' }}>
          {' '}
          {settingStore.language.activeLanguage}
        </div>

        <div style={{ marginTop: '10px' }}>
          <RadioGroup
            name={'language-radio'}
            colorScheme="blue"
            onChange={(event: string) => onChangeLanguageHandler(event)}
            value={language}
          >
            <Stack>
              <Radio data-cy="en-radio" value="en">English</Radio>
              <Radio data-cy="no-radio" value="no">Norsk - Bokmål</Radio>
            </Stack>
          </RadioGroup>
        </div>
      </div>
    </Container>
  )
}
