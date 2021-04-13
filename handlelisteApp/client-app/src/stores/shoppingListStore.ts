import { Iitem, IShoppingList } from '../models/ShoppingList'
import { makeAutoObservable, runInAction } from 'mobx'
import { v4 as uuidv4 } from 'uuid'
import agent from '../api/agent'
import { history } from '../index'
import { store } from './store'
import { IFeedback } from '../models/generalTypes'
import { ICheckedItems } from '../models/recipe'

const emptyShoppingList = {
  shoppingListID: NaN,
  items: [],
  createdOn: '',
  updatedOn: '',
  name: '',
}

export default class shoppingListStore {
  shoppingList: IShoppingList = emptyShoppingList
  shoppingLists: IShoppingList[] = []
  isNew: boolean = false
  isLoading: boolean = false
  feedBack: IFeedback | null = null
  backToMyShoppingList: string | null = null

  constructor() {
    makeAutoObservable(this)
  }

  resetShoppingListStoreData = () => {
    this.shoppingList = emptyShoppingList
    this.shoppingLists = []
    this.isNew = false
    this.isLoading = false
    this.feedBack = null
    this.backToMyShoppingList = null
  }

  resetBackToShoppingList = () => {
    runInAction(() => {
      this.backToMyShoppingList = null
    })
  }

  setBackToShoppingList = (id: string) => {
    this.backToMyShoppingList = id
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
        this.error(store.settingStore.language.somethingError)
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
      this.error(store.settingStore.language.somethingError)
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
        this.shoppingLists[index] = newList
        this.shoppingList = newList
      })
    } catch (e) {
      runInAction(() => {
        this.error(store.settingStore.language.somethingError)
      })
    }
  }

  createOrUpdateItemInShoppingList = async (item: Iitem) => {
    if (item.itemName === '') return
    try {
      await agent.shoppingList.createOrUpdateItemInShoppingList(
        this.shoppingList.shoppingListID,
        item
      )
    } catch (e) {
      this.error(store.settingStore.language.somethingError)
    }
  }

  setOrder = () => {
    const newList = this.shoppingList.items.map((item, i) => ({
      ...item,
      order: i,
    }))
    this.shoppingList.items = newList
    this.saveShoppinglist()
  }

  deleteItemInShoppingList = async (item: Iitem) => {
    try {
      await agent.shoppingList.deleteItemInShoppingList(
        this.shoppingList.shoppingListID,
        item
      )
    } catch (e) {
      this.error(store.settingStore.language.somethingError)
    }
  }

  addShoppinglist = async () => {
    let shoppinglistToAdd = this.shoppingList
    shoppinglistToAdd.name = store.settingStore.language.newShoppingList
    try {
      const addedList = await agent.shoppingList.postShoppingList(
        shoppinglistToAdd
      )
      runInAction(() => {
        this.shoppingLists.push(addedList)
        this.shoppingList = addedList
      })
      history.push(`/shopping-list/${this.shoppingList.shoppingListID}`)
    } catch (e) {
      runInAction(() => {
        this.error(store.settingStore.language.somethingError)
      })
    }
  }

  addToShoppingListFromRecipe = (
    checked: ICheckedItems[],
    numberOfItems: number[] | undefined,
    returnToList: boolean
  ) => {
    checked.forEach((checkedItem, i) => {
      if (checkedItem.isChecked && numberOfItems && numberOfItems[i] > 0) {
        this.addItem({
          ...checkedItem.item,
          quantity: numberOfItems[i],
          hasBeenBought: false,
          category: store.recipeStore.currentRecipe!.recipeName,
          order: this.shoppingList.items.length + i,
        })
      }
    })
    this.success(store.settingStore.language.recipeAddedToShoppingList)
    this.saveShoppinglist()
    store.modalStore.closeModal()
    if (this.backToMyShoppingList && returnToList) {
      history.push(`/shopping-list/${this.backToMyShoppingList}`)
      this.resetBackToShoppingList()
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
        this.shoppingLists = newListOfShopLists
        this.success(store.settingStore.language.shoppingListDeleted)
      })
    } catch (e) {
      runInAction(() => {
        this.error(store.settingStore.language.somethingError)
      })
    }
  }

  setQuantity = (item: Iitem, value: number) => {
    if (!value) {
      value = 0
    }
    item.quantity = value
  }

  setItems = (items: Iitem[]) => {
    runInAction(() => {
      this.shoppingList.items = items
    })
  }

  changeQuantity = (item: Iitem, increment: boolean) => {
    if (item.quantity >= 0) {
      const index = this.shoppingList.items.findIndex(
        (foundItem) => foundItem === item
      )
      runInAction(() => {
        this.shoppingList.items[index].quantity =
          this.shoppingList.items[index].quantity +
          (increment ? 1 : item.quantity === 0 ? 0 : -1)
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
      order:
        (this.shoppingList.items.length === 0
          ? 0
          : this.shoppingList.items[0].order) - 1,
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

  onDeleteItem = (item: Iitem) => {
    this.shoppingList.items = this.shoppingList.items.filter(
      (foundItem) => foundItem !== item
    )
    this.deleteItemInShoppingList(item)
  }

  onChecked = async (item: Iitem) => {
    item.hasBeenBought = !item.hasBeenBought
    try {
      await this.createOrUpdateItemInShoppingList(item)
    } catch (e) {
      this.error(store.settingStore.language.somethingError)
    }
  }

  private error = (text?: string) => {
    runInAction(() => {
      this.feedBack = {
        status: 'error',
        text,
      }
      this.isLoading = false
    })
  }

  private success(text?: string) {
    runInAction(() => {
      this.feedBack = {
        status: 'success',
        text,
      }
      this.isLoading = false
    })
  }

  resetShoppingList = () => {
    this.shoppingList = emptyShoppingList
  }

  resetFeedBack = () => {
    this.feedBack = null
  }
}
