export interface IRecipe {
  recipeID?: number
  recipeName: string
  shortDescription: string
  approach: string
  imgUrl: string
  isOwner: boolean
  hasLiked: boolean
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
