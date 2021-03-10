import React, { useState, useEffect } from 'react';
import Norwegian_B from './no_b';
import English from './en';
import {useStore} from "../stores/store";
import {ILanguage} from "./Language";


const englishLanguage: ILanguage = new English;
const norwegian_BLanguage: ILanguage = new Norwegian_B();


interface Props {}

export const SetStoredLanguage: React.FC<Props> = () => {
    const {userStore} = useStore()

    const [language, setLanguage] = useState(userStore.language);

    useEffect(() => {
        function handleLanguageChange(userStore: { language: React.SetStateAction<string>; }) {
            setLanguage(userStore.language);
        }
    });


    setCurrentLanguage(language)

    return null;
}

export var activeLanguage: ILanguage = englishLanguage;
function setCurrentLanguage(language: string) {
    switch(language) {
        case 'en': 
            activeLanguage = englishLanguage;
            break;
        case 'no_b':
            activeLanguage = englishLanguage;
            break;
        default:
            activeLanguage = englishLanguage;
            break;
    }
}





