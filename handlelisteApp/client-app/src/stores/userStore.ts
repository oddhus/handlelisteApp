import { IUser } from '../models/user'
import { makeAutoObservable, runInAction } from 'mobx'
import agent from '../api/agent'
import { store } from './store'
import { history } from '../index'

export default class UserStore {
  user: IUser | null = null
  loading: boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  get isLoggedIn() {
    return !!this.user
  }

  login = async (creds: any) => {
    this.loading = true
    try {
      const user = await agent.User.login(creds)
      runInAction(() => {
        store.commonStore.setToken(user.token)
        this.user = user
        this.loading = false
      })
      history.push(`/`)
      store.modalStore.closeModal()
    } catch (error) {
      runInAction(() => {
        this.loading = false
      })
      throw error
    }
  }

  registerNewUser = async (user: any) => {
    this.loading = true
    try {
      await agent.User.signUp(user)
      runInAction(() => {
        this.loading = false
      })
      store.modalStore.closeModal()
      history.push(`/`)
    } catch (e) {
      runInAction(() => {
        this.loading = false
      })
      throw e
    }
  }

  logout = () => {
    store.commonStore.setToken(null)
    store.recipeStore.resetRecipeStoreData()
    window.localStorage.removeItem('jwt')
    this.user = null
    history.push('/')
  }

  getUser = async () => {
    try {
      const user = await agent.User.currentUser()
      runInAction(() => (this.user = user))
    } catch (e) {
      throw e
    }
  }
}
