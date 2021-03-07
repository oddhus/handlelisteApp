
export interface IShoppingList{
        shoppingListID: number,
        items: Iitem[],
        createdOn: string,
        updatedOn: string
}

export interface Iitem {
        category: string,
        product: string,
        quantity: number,
        unit: string
}