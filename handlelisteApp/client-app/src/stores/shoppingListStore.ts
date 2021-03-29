import { Iitem, IShoppingList } from '../models/ShoppingList'
import { makeAutoObservable, runInAction } from 'mobx'
import { v4 as uuidv4 } from 'uuid'
import agent from '../api/agent'

import { history } from '../index'
import SettingStore from './settingStore'

const settingStore = new SettingStore()

const emptyShoppingList = {
  shoppingListID: NaN,
  items: [],
  createdOn: '',
  updatedOn: '',
  name: settingStore.language.newShoppingList
}

export default class shoppingListStore {
  shoppingList: IShoppingList = emptyShoppingList
  shoppingLists: IShoppingList[] = []
  isNew: boolean = false
  isLoading: boolean = false
  feedBack: any = null
  backToMyShoppingList: string | null = null

  constructor() {
    makeAutoObservable(this)
  }

  getShoppinglist = async (id: number) => {
    const shoppingList = this.shoppingLists.find(
      (shoppinglist) => shoppinglist.shoppingListID === id
    )
    if (shoppingList) {
      runInAction(() => (this.shoppingList = shoppingList))
    } else {
      try {
        const fetchedShoppingList = await agent.shoppingList.getShoppingList(id)
        runInAction(() => {
          this.shoppingList = fetchedShoppingList
        })
        return fetchedShoppingList
      } catch (e) {
        throw e
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
      runInAction(() => {
        this.feedBack = {
          status: e.response.status,
          type: 'error',
        }
      })
    }
  }

  saveShoppinglist = async () => {
    try {
      const newList = await agent.shoppingList.updateShoppingList(
        this.shoppingList,
        this.shoppingList.shoppingListID
      )
      const index = this.shoppingLists.findIndex(
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
      runInAction(() => {
        this.setError(e)
      })
    }
  }

  CreateOrUpdateItemInShoppingList = async (item: Iitem) =>{
    if (item.itemName === '') return
    try {
      await agent.shoppingList.CreateOrUpdateItemInShoppingList(
          this.shoppingList.shoppingListID,
          item
      )
    }catch (e){
      throw e;
    }
  }

  addShoppinglist = async () => {
    try {
      const addedList = await agent.shoppingList.postShoppingList(
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
      history.push(`/shopping-list/${this.shoppingList.shoppingListID}`)
    } catch (e) {
      runInAction(() => {
        this.setError(e)
      })
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
      const newListOfShopLists = this.shoppingLists.filter(
        (shoppingList) => shoppingList !== listToDelete
      )
      runInAction(() => {
        this.shoppingList = emptyShoppingList
        this.feedBack = {
          status: 200,
          type: 'success',
        }
        this.shoppingLists = newListOfShopLists
      })
    } catch (e) {
      runInAction(() => {
        this.setError(e)
      })
    }
  }

  setQuantity = (item: Iitem, value: number) => {
    item.quantity = value
    try {
      this.CreateOrUpdateItemInShoppingList(item)
    }catch (e) {
      throw e
    }
  }

  changeQuantity = (item: Iitem, increment: boolean) => {
    if (item.quantity >= 0) {
      const index = this.shoppingList.items.findIndex(
        (foundItem) => foundItem === item
      )
      runInAction(() => {
        this.shoppingList.items[index].quantity =
          this.shoppingList.items[index].quantity + (increment ? 1 : -1)
      })
    }
  }

  setItemName = (item: Iitem, name: string) => {
    const index = this.shoppingList.items.findIndex(
      (foundItem) => foundItem === item
    )
    runInAction(() => {
      this.shoppingList.items[index].itemName = name
    })
  }

  insertEmptyItem = () => {
    this.shoppingList.items.unshift({
      itemName: '',
      category: '',
      hasBeenBought: false,
      quantity: 1,
      itemIdentifier: uuidv4(),
    })
  }

  addItem = (item: Iitem) => {
    const itemIndex = this.shoppingList.items.findIndex(
      (existingItem) => existingItem.itemName === item.itemName
    )
    //If item exists increase quantity, else add to shoppinglist
    if (itemIndex > -1) {
      runInAction(() => {
        this.shoppingList.items[itemIndex].quantity =
          this.shoppingList.items[itemIndex].quantity + item.quantity
      })
    } else {
      runInAction(() => {
        item.itemIdentifier = uuidv4()
        this.shoppingList.items.push(item)
      })
    }
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

  onDeleteItem = async (item: Iitem) => {
    this.shoppingList.items = this.shoppingList.items.filter(
      (foundItem) => foundItem !== item
    )
    try {
      await this.saveShoppinglist()
    } catch (e) {
      throw e
    }
  }

  onChecked = async (item: Iitem) => {
    item.hasBeenBought = !item.hasBeenBought
    try {
      await this.CreateOrUpdateItemInShoppingList(item)
    } catch (e) {
      throw e
    }
  }

  setError = (e: any) => {
    runInAction(() => {
      this.feedBack = {
        status: e.response?.status,
        type: 'error',
      }
    })
  }
  resetShoppingList = () => {
    this.shoppingList = emptyShoppingList
  }

  resetFeedBack = () => {
    this.feedBack = null
  }
}
