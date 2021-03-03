import {IShoppingList} from "./ShoppingList";

export interface IUser {
    id: string,
    username: string,
    password: string,
    token: string,
    userAge: number,
    shoppingLists: IShoppingList []
}