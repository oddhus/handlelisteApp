// @ts-ignore
import UserStore from './userStore'
import { createContext, useContext } from 'react'
import CommonStore from './CommonStore'
import ShoppingListStore from './shoppingListStore'
import ModalStore from './modalStore'
import SettingStore from './settingStore'

export interface Store {
  userStore: UserStore
  commonStore: CommonStore
  shoppingListStore: ShoppingListStore
  modalStore: ModalStore
  settingStore: SettingStore
}

// add new instances of objects to make them available in the react context
export const store: Store = {
  userStore: new UserStore(),
  commonStore: new CommonStore(),
  shoppingListStore: new ShoppingListStore(),
  modalStore: new ModalStore(),
  settingStore: new SettingStore(),
}

export const StoreContext = createContext(store)

export function useStore() {
  return useContext(StoreContext)
}
