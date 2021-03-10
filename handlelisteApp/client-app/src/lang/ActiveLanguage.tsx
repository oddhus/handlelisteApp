import React from 'react';
import Norwegian_B from './no_b';
import English from './en';
import {useStore} from "../stores/store";
import {ILanguage} from "./Language";


const englishLanguage: ILanguage = new English;
const Norwegian_BLanguage: ILanguage = new Norwegian_B();

const StoredLanguage = () => {
    const {userStore} = useStore()
    return userStore.language
}


export const activeLanguage: ILanguage = englishLanguage; 
    /*
    () => {
    switch(StoredLanguage()) {
        case 'en': return englishLanguage;
        case 'no_b': return englishLanguage;
        default: return englishLanguage;
    }
};


     */
