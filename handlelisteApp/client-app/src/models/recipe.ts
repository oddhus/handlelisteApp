export interface IRecipe {
  recipeID?: number
  recipeName: string
  shortDescription: string
  approach: string
  items: IitemInRecipe[]
}

export interface IitemInRecipe {
  itemName: string
  quantity: number
  unit: string
}
