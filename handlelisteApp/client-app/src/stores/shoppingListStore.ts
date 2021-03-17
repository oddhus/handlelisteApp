import { Iitem, IShoppingList } from '../models/ShoppingList'
import { makeAutoObservable, runInAction } from 'mobx'
import agent from '../api/agent'

export default class shoppingListStore {
  shoppingList: IShoppingList = {
    shoppingListID: NaN,
    items: [],
    createdOn: '',
    updatedOn: '',
  }
  shoppingLists: IShoppingList[] = []
  isNew: boolean = false
  isLoading: boolean = false
  feedBack: any = null
  constructor() {
    makeAutoObservable(this)
  }

  getShoppinglist = async (id: number) => {
    let shoppingList = this.shoppingLists.find(
      (shoppinglist) => shoppinglist.shoppingListID === id
    )
    if (this.shoppingList != null && id == this.shoppingList.shoppingListID) {
      return this.shoppingList.items
    } else if (shoppingList === null || shoppingList === undefined) {
      try {
        const shoppingList = await agent.shoppingList.getShoppingList(id)
        runInAction(() => {
          this.shoppingList = shoppingList
        })
      } catch (e) {
        console.log(e)
      }
    }
  }

  fetchShoppingLists = async () => {
    try {
      this.isLoading = true
      let shoppingLists = await agent.shoppingLists.getShoppingLists()
      if (!shoppingLists) {
        shoppingLists = []
      }
      runInAction(() => {
        this.shoppingLists = shoppingLists
        this.isLoading = false
      })
    } catch (e) {
      this.feedBack = {
        status: e.response.status,
        type: 'error',
      }
    }
  }

  saveShoppinglist = async () => {
    try {
      const newList = await agent.shoppingList.updateShoppingList(
        this.shoppingList,
        this.shoppingList.shoppingListID
      )
      let index = this.shoppingLists.findIndex(
        (i) => i.shoppingListID === newList.shoppingListID
      )
      runInAction(() => {
        this.feedBack = {
          status: 200,
          type: 'success',
        }
        this.shoppingLists[index] = newList
        this.shoppingList = newList
      })
    } catch (e) {
      this.setError(e)
    }
  }

  addShoppinglist = async () => {
    try {
      let addedList = await agent.shoppingList.postShoppingList(
        this.shoppingList
      )
      runInAction(() => {
        this.shoppingLists.push(addedList)
        this.shoppingList = addedList
        this.feedBack = {
          status: 200,
          type: 'success',
        }
      })
    } catch (e) {
      this.setError(e)
    }
  }

  setCurrentShoppingList = (shoppingList: IShoppingList) => {
    runInAction(() => {
      this.shoppingList = shoppingList
    })
  }

  deleteShoppingList = async (listToDelete: IShoppingList) => {
    try {
      await agent.shoppingList.deleteShoppingList(listToDelete.shoppingListID)
      let newListOfShopLists = this.shoppingLists.filter(
        (shoppingList) => shoppingList !== listToDelete
      )
      runInAction(() => {
        this.feedBack = {
          status: 200,
          type: 'success',
        }
        this.shoppingLists = newListOfShopLists
      })
    } catch (e) {
      this.setError(e)
    }
  }

  changeQuantity = (item: Iitem, increment: boolean) => {
    if (item.quantity > 0) {
      const index = this.shoppingList.items.findIndex(
        (foundItem) => foundItem === item
      )
      runInAction(() => {
        this.shoppingList.items[index].quantity =
          this.shoppingList.items[index].quantity + (increment ? 1 : -1)
      })
    }
  }

  addItem = (item: Iitem) => {
    runInAction(() => {
      this.shoppingList.items.push(item)
    })
  }

  handleSaveList = () => {
    if (this.isNew) {
      this.addShoppinglist()
      runInAction(() => {
        this.isNew = false
      })
    } else {
      this.saveShoppinglist()
    }
  }

  onDeleteItem = (item: Iitem) => {
    runInAction(() => {
      this.shoppingList.items = this.shoppingList.items.filter(
        (foundItem) => foundItem !== item
      )
    })
  }

  onChecked = (item: Iitem) => {
    let index = this.shoppingList.items.findIndex(
      (foundItem) => foundItem === item
    )
    runInAction(() => {
      this.shoppingList.items[index].hasBeenBought = !this.shoppingList.items[
        index
      ].hasBeenBought
    })
  }

  setError = (e: any) => {
    console.log(e)
    this.feedBack = {
      status: e.response.status,
      type: 'error',
    }
  }
}
