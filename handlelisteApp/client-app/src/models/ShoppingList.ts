export interface IShoppingList {
  shoppingListID: number
  items: Iitem[]
  createdOn: string
  updatedOn: string
}

export interface Iitem {
  category: string
  itemName: string
  quantity: number
  unit: string
  hasBeenBought: boolean
  tempId?: string
}
