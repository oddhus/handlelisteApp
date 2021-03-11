import React from "react";
import {useStore} from "../stores/store";

interface Props {}

export const HomePage: React.FC<Props> = () => {

    const {settingStore} = useStore()
    
    
    return <div data-testid="homepage">{settingStore.language.homePage}</div>;
};
