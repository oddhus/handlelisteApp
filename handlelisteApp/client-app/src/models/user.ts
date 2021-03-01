import {IShoppingList} from "./ShoppingList";

export interface IUser {
    userID: string,
    username: string,
    userAge: number,
    shoppingLists: IShoppingList []
}