import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import { store, StoreContext } from './stores/store'

export const Providers: React.FC = ({ children }) => {
  return (
    <StoreContext.Provider value={store}>
      <ChakraProvider>{children}</ChakraProvider>
    </StoreContext.Provider>
  )
}
