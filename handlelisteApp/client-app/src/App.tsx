import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { NavBar } from "./components/navbar/NavBar";
import { AppRoutes } from "./routes/AppRoutes";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <NavBar />
        <AppRoutes />
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
