import { makeAutoObservable, runInAction } from "mobx";
import {ILanguage} from "../lang/Language";
import English from "../lang/en";
import Norwegian_B from "../lang/no_b";

export default class SettingStore {
    language: ILanguage = new English;

    
    constructor() {
        makeAutoObservable(this);
    }

    setLanguage = (language: string) => {
        switch(language) {
            case 'en':
                runInAction(() => (this.language = new English()));
                break;
            case 'no_b':
                runInAction(() => (this.language = new Norwegian_B()));
                break;
            default:
                runInAction(() => (this.language = new English()));
                break;
        }
    };
}
