import { Iitem, IShoppingList } from '../models/ShoppingList'
import { makeAutoObservable, runInAction } from 'mobx'
import { v4 as uuidv4 } from 'uuid'
import agent from '../api/agent'
import { history } from '../index'
import { store } from './store'
import { IFeedback } from '../models/generalTypes'
import { ICheckedItems } from '../models/recipe'
import { debounce } from 'lodash'
import axios, { CancelTokenSource } from 'axios'

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
  orderHasChanged: boolean = false
  cancelToken: CancelTokenSource | undefined = undefined

  constructor() {
    makeAutoObservable(this)
  }

  debouncedSave = debounce(() => {
    this.saveShoppinglist()
  }, 2000)

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

  addShoppinglist = async () => {
    let shoppinglistToAdd = this.shoppingList
    shoppinglistToAdd.name = store.settingStore.language.newShoppingList
    try {
      const addedList = await agent.shoppingList.postShoppingList(
        shoppinglistToAdd
      )
      runInAction(() => {
        this.shoppingLists.unshift(addedList)
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
    this.debouncedSave()
    store.modalStore.closeModal()
    if (this.backToMyShoppingList && returnToList) {
      history.push(`/shopping-list/${this.backToMyShoppingList}`)
      this.resetBackToShoppingList()
    }
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

  getShoppinglist = async (id: number) => {
    const shoppingList = this.shoppingLists.find(
      (shoppinglist) => shoppinglist.shoppingListID === id
    )
    if (shoppingList) {
      this.shoppingList = shoppingList
    } else {
      try {
        const fetchedShoppingList = await agent.shoppingList.getShoppingList(id)
        runInAction(() => {
          this.shoppingList = fetchedShoppingList
        })
      } catch (e) {
        this.error(store.settingStore.language.somethingError)
      }
    }
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

  onChangeQuantity = (item: Iitem, increment: boolean) => {
    if (item.quantity >= 0) {
      item.quantity =
        item.quantity + (increment ? 1 : item.quantity === 0 ? 0 : -1)
      this.debouncedSave()
    }
  }

  onChecked = (item: Iitem) => {
    item.hasBeenBought = !item.hasBeenBought
    this.debouncedSave()
  }

  onDeleteItem = (item: Iitem) => {
    this.shoppingList.items = this.shoppingList.items.filter(
      (foundItem) => foundItem !== item
    )
    this.debouncedSave()
  }

  onSetItemName = (item: Iitem, name: string) => {
    item.itemName = name
    this.debouncedSave()
  }

  onSetQuantity = (item: Iitem, value: number) => {
    if (!value) {
      value = 0
    }
    item.quantity = value
    this.debouncedSave()
  }

  onUpdateOrder = () => {
    this.orderHasChanged = true
    this.debouncedSave()
  }

  orderList = () => {
    const newList = this.shoppingList.items.map((item, i) => ({
      ...item,
      order: i,
    }))
    this.shoppingList.items = newList
  }

  resetFeedBack = () => {
    this.feedBack = null
  }

  resetShoppingList = () => {
    this.shoppingList = emptyShoppingList
  }

  saveShoppinglist = async () => {
    if (this.cancelToken) {
      this.cancelToken.cancel('Operation canceled due to new request.')
    }

    this.cancelToken = axios.CancelToken.source()

    if (this.orderHasChanged) {
      this.orderList()
      this.orderHasChanged = false
    }

    try {
      const newList = await agent.shoppingList.updateShoppingList(
        this.shoppingList,
        this.shoppingList.shoppingListID,
        this.cancelToken.token
      )
      const index = this.shoppingLists.findIndex(
        (i) => i.shoppingListID === newList.shoppingListID
      )
      runInAction(() => {
        this.shoppingLists[index] = newList
      })
    } catch (e) {
      if (axios.isCancel(e)) {
        console.log(e)
      } else {
        runInAction(() => {
          this.error(store.settingStore.language.somethingError)
        })
      }
    }
  }

  setCurrentShoppingList = (shoppingList: IShoppingList) => {
    this.shoppingList = shoppingList
  }

  setItems = (items: Iitem[]) => {
    this.shoppingList.items = items
  }

  private error = (text?: string) => {
    this.feedBack = {
      status: 'error',
      text,
    }
    this.isLoading = false
  }

  private success(text?: string) {
    this.feedBack = {
      status: 'success',
      text,
    }
    this.isLoading = false
  }
}
