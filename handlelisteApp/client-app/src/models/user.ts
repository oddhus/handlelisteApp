import { IShoppingList } from './ShoppingList'

export interface IUser {
  userID: string
  username: string
  password: string
  token: string
  userAge: number
  shoppingLists: IShoppingList[]
}
