import { ChakraProvider } from "@chakra-ui/react";
import React, {useEffect} from "react";
import { BrowserRouter } from "react-router-dom";
import { NavBar } from "./components/navbar/NavBar";
import { AppRoutes } from "./routes/AppRoutes";
import {observer} from "mobx-react-lite";
import {useStore} from "./stores/store";
import {LoadingComponent} from "./components/shared/LoadingComponent";

function App() {
    
  const {commonStore, userStore} = useStore()
  
  useEffect(()=>{
      if (commonStore.token){
          userStore.getUser().finally(() => commonStore.setAppLoaded())
      }else{
          commonStore.setAppLoaded()
      }
  },[commonStore, userStore])
  
  if (!commonStore.appLoaded) return <LoadingComponent/> 
  
  return (
    <ChakraProvider>
      <BrowserRouter>
        <NavBar />
        <AppRoutes />
      </BrowserRouter>
    </ChakraProvider>
  );
}
export default observer(App) ;
