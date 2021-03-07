// @ts-ignore
import UserStore from "./userStore";
import { createContext, useContext } from "react";
import CommonStore from "./CommonStore";
import ShoppingListStore from "./shoppingListStore";

export interface Store {
  userStore: UserStore;
  commonStore: CommonStore;
  shoppingListStore: ShoppingListStore;
}

// add new instances of objects to make them available in the react context
export const store: Store = {
  userStore: new UserStore(),
  commonStore: new CommonStore(),
  shoppingListStore: new ShoppingListStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
