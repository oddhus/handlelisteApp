import { makeAutoObservable, runInAction } from 'mobx'
import { ILanguage } from '../lang/Language'
import English from '../lang/en'
import Norwegian_B from '../lang/no_b'

export default class SettingStore {
  norwegian_b: ILanguage = new Norwegian_B()
  english: ILanguage = new English()
  language: ILanguage = this.english
  languageString: string = 'en'
  isEnglish: boolean = true

  constructor() {
    makeAutoObservable(this)
  }

  setLanguage = (language: string) => {
    switch (language) {
      case 'en':
        this.language = this.english
        this.languageString = 'en'
        break
      case 'no':
        this.language = this.norwegian_b
        this.languageString = 'no'
        break
      default:
        this.language = this.english
        this.languageString = 'en'
        break
    }
    runInAction(() => (this.isEnglish = this.languageString === 'en'))
  }
}
