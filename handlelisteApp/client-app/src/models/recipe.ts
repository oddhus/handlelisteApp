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

export interface IPaginatedRecipes {
  currentPage: number
  totalPages: number
  pageSize: number
  totalCount: number
  hasPrevious: boolean
  hasNext: boolean
  recipes: IRecipe[]
}

export interface IQueryParams {
  items: (null | string)[] | never[]
  pageSize: number | null | undefined
  searchText: string
}
