import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import { store, StoreContext } from './stores/store'
import theme from './theme'
import { Route } from 'react-router-dom'
import { QueryParamProvider } from 'use-query-params'

export const Providers: React.FC = ({ children }) => {
  return (
    <StoreContext.Provider value={store}>
      <QueryParamProvider ReactRouterRoute={Route}>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </QueryParamProvider>
    </StoreContext.Provider>
  )
}
