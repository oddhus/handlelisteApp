import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { Router } from "react-router-dom";
import { store, StoreContext } from "./stores/store";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

export const Providers: React.FC = ({ children }) => {
  return (
    <StoreContext.Provider value={store}>
      <Router history={history}>
        <ChakraProvider>{children}</ChakraProvider>
      </Router>
    </StoreContext.Provider>
  );
};
