import { makeAutoObservable, reaction } from 'mobx'
import {ServerError} from "../models/ServerError";

export default class CommonStore {
  token: string | null = window.localStorage.getItem('jwt')
  appLoaded: boolean = false
  error: ServerError | null = null
  lang: string | null = window.localStorage.getItem("lang")
  
  constructor() {
    makeAutoObservable(this)

    reaction(
      () => this.token,
      (token) => {
        if (token) {
          window.localStorage.setItem('jwt', token)
        } else {
          window.localStorage.removeItem('jwt')
        }
      }
    )
  }
  
  setServerError = (error: ServerError) =>{
    this.error = error;
  }

  setToken = (token: string | null) => {
    this.token = token
  }

  setAppLoaded = () => {
    this.appLoaded = true
  }

  setLang = (lang: string) => {
    window.localStorage.setItem('lang', lang)
    this.lang = lang
  }
}
