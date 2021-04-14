import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import { store, StoreContext } from './stores/store'
import  theme  from  './theme'

export const Providers: React.FC = ({ children }) => {
  return (
    <StoreContext.Provider value={store}>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </StoreContext.Provider>
  )
}
