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
      history.push(`/shopping-list`)
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
      const newuser = await agent.User.signUp(user)
      runInAction(() => {
        store.commonStore.setToken(newuser.token)
        this.user = user
        this.loading = false
      })
      store.modalStore.closeModal()
      history.push(`/shopping-list`)
    } catch (e) {
      runInAction(() => {
        this.loading = false
      })
      throw e
    }
  }
  
  clearAllStores = ()=>{
    store.recipeStore.resetRecipeStoreData()
    store.shoppingListStore.resetShoppingListStoreData()
    store.commonStore.setToken(null)
    window.localStorage.removeItem('jwt')
  }

  logout = () => {
    this.clearAllStores()
    this.user = null
    history.push('/signin')
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
