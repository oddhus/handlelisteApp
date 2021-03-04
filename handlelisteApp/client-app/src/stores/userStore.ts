import { IUser } from "../models/user";
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { store } from "./store";
import { history } from "../Providers";

export default class UserStore {
  user: IUser | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return !!this.user;
  }

  login = async (creds: any) => {
    try {
      const user = await agent.User.login(creds);
      store.commonStore.setToken(user.token);
      runInAction(() => (this.user = user));
      history.push(`/shopping-list/${user.id}`);
    } catch (e) {
      throw e;
    }
  };

  logout = () => {
    store.commonStore.setToken(null);
    window.localStorage.removeItem("jwt");
    this.user = null;
    history.push("/");
  };

  getUser = async () => {
    try {
      const user = await agent.User.currentUser();
      runInAction(() => (this.user = user));
    } catch (e) {
      throw e;
    }
  };
}
