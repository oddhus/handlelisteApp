export interface IShoppingList {
  name: string
  shoppingListID: number
  items: Iitem[]
  createdOn: string
  updatedOn: string
}

export interface Iitem {
  category: string
  itemName: string
  quantity: number
  hasBeenBought: boolean
  itemIdentifier?: string
}
