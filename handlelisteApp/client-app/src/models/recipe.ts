export interface IRecipe {
  recipeID?: number
  recipeName: string
  shortDescription: string
  approach: string
  imgUrl: string
  items: IitemInRecipe[]
}

export interface IitemInRecipe {
  itemName: string
  quantity: number
  unit: string
}

export interface ICheckedItems {
  isChecked: boolean
  item: IitemInRecipe
}