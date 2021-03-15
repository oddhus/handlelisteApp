// @ts-ignore
import UserStore from './userStore'
import { createContext, useContext } from 'react'
import CommonStore from './CommonStore'
import ShoppingListStore from './shoppingListStore'
import ModalStore from './modalStore'
import SettingStore from './settingStore'
import RecipeStore from './recipeStore'
import MyKitchenStore from "./myKitchenStore";

export interface Store {
  userStore: UserStore
  commonStore: CommonStore
  shoppingListStore: ShoppingListStore
  modalStore: ModalStore
  settingStore: SettingStore
  recipeStore: RecipeStore
  myKitchenStore: MyKitchenStore
}

// add new instances of objects to make them available in the react context
export const store: Store = {
  userStore: new UserStore(),
  commonStore: new CommonStore(),
  shoppingListStore: new ShoppingListStore(),
  modalStore: new ModalStore(),
  settingStore: new SettingStore(),
  recipeStore: new RecipeStore(),
  myKitchenStore: new MyKitchenStore(),
}

export const StoreContext = createContext(store)

export function useStore() {
  return useContext(StoreContext)
}
