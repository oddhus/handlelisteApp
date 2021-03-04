// @ts-ignore
import UserStore from "./userStore";
import { createContext, useContext } from "react";
import CommonStore from "./CommonStore";

export interface Store {
  userStore: UserStore;
  commonStore: CommonStore;
}

// add new instances of objects to make them available in the react context
export const store: Store = {
  userStore: new UserStore(),
  commonStore: new CommonStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
