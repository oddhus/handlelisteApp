import { IShoppingList } from "../models/ShoppingList";
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { store } from "./store";

export default class shoppingListStore {
  shoppingList: IShoppingList | null = null;
  shoppingLists: IShoppingList[] = [];
  constructor() {
    makeAutoObservable(this);
  }

  getShoppinglist = async (id: number) => {
    let shoppingList = this.shoppingLists.find(shoppinglist => shoppinglist.shoppingListID === id)
    if(this.shoppingList != null && id == this.shoppingList.shoppingListID){
      console.log(this.shoppingList)
      return this.shoppingList.items
    }
    else if((shoppingList === null || shoppingList === undefined)){
      try{
        const shoppingList = await agent.shoppingList.getShoppingList(id)
        console.log(shoppingList)
      } catch(e) {
        console.log(e)
      }
    }
  }

  fetchShoppingLists = async () => {
    try {
      let shoppingLists = await agent.shoppingLists.getShoppingLists()
      if(shoppingLists == undefined) shoppingLists = []
      runInAction(() => {
        this.shoppingLists = shoppingLists
      })
    } catch (e) {
      console.log(e)
    }
  }

  saveShoppinglist = async (shoppingList: any, id: number) => {
      try{
        let newList = await agent.shoppingList.updateShoppingList(shoppingList, id)
        let index = newList.indexOf(this.shoppingLists.find((list) => list.shoppingListID === newList.shoppingListID))
        runInAction(() => {
            this.shoppingLists[index] = newList
            this.shoppingList = newList
        })
      } catch(e) {
        throw(e)
      }
  }

  addShoppinglist = async (shoppingList: any) => {
    try {
        let addedList = await agent.shoppingList.postShoppingList(shoppingList)
        runInAction(() => {
            this.shoppingLists.push(addedList)
            this.shoppingList = addedList
        })
    } catch(e){
        throw(e)
    }
  }
  
  setCurrentShoppingList = (shoppingList: IShoppingList) => {
    runInAction(() => {
      this.shoppingList = shoppingList
  })
  }

}
