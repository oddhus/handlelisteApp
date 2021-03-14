export interface IRecipe {
  recipeID?: number
  recipeName: string
  shortDescription: string
  approach: string
  items: IitemInRecipe[]
}

export interface IitemInRecipe {
  productName: string
  quantity: number
  unit: string
}
