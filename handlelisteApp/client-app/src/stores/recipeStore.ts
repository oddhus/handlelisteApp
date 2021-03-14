import { makeAutoObservable, runInAction } from 'mobx'
import agent from '../api/agent'
import { store } from './store'
import { IRecipe } from '../models/recipe'

export default class RecipeStore {
  currentRecipe: IRecipe | null = null
  currentRecipeList: IRecipe[] = []
  userRecipeList: Map<number, IRecipe[]> = new Map()
  loadingFetch: boolean = false
  requestFailed: boolean = false
  errorMessage: string = ''

  constructor() {
    makeAutoObservable(this)
  }

  getRecipe = async (id: number) => {
    if (this.currentRecipe?.recipeID === id) {
      return
    }

    let recipe = this.currentRecipeList.find((recipe) => recipe.recipeID === id)
    if (recipe) {
      this.currentRecipe = recipe
      return
    }

    try {
      recipe = await agent.recipe.getRecipe(id)
      if (recipe) {
        runInAction(() => this.currentRecipeList.push(recipe!))
      } else {
        runInAction(() => (this.requestFailed = true))
      }
    } catch (e) {
      runInAction(() => {
        this.requestFailed = true
      })
    }
  }

  getUserRecipes = async (id: number) => {
    let userRecipes = this.userRecipeList.get(id)
    if (userRecipes) {
      return
    }

    try {
      userRecipes = await agent.recipes.getAllUserRecipes(id)
      runInAction(() => this.userRecipeList.set(id, userRecipes || []))
    } catch (e) {
      console.log(e)
    }
  }

  saveRecipe = async (recipe: IRecipe) => {
    try {
      const newRecipe = await agent.recipe.postRecipe(recipe)

      if (!newRecipe) {
        runInAction(() => (this.requestFailed = true))
      }

      if (store.userStore.user?.id) {
        const userId = parseInt(store.userStore.user?.id)
        const oldList = this.userRecipeList.get(userId) || []
        runInAction(() => {
          this.currentRecipe = newRecipe
          this.userRecipeList.set(userId, [...oldList, newRecipe])
        })
      }
    } catch (e) {
      console.log(e)
    }
  }

  updateRecipe = async (recipe: IRecipe, id: number) => {
    if (!store.userStore.user) {
      return
    }

    const userId = parseInt(store.userStore.user?.id)

    try {
      const updatedRecipe = (await agent.recipe.updateRecipe(
        recipe,
        id
      )) as IRecipe

      const oldList = this.userRecipeList.get(userId) || []
      const index = oldList.findIndex(
        (recipe) => recipe.recipeID === updatedRecipe.recipeID
      )

      if (index !== -1) {
        oldList[index] = updatedRecipe
      }

      runInAction(() => {
        this.currentRecipe = updatedRecipe
        this.currentRecipeList = oldList
        this.userRecipeList.set(userId, oldList)
      })
    } catch (e) {
      throw e
    }
  }

  setCurrentRecipe = (recipe: IRecipe) => {
    runInAction(() => {
      this.currentRecipe = recipe
    })
  }

  deleteRecipe = async (id: number) => {
    try {
      await agent.recipe.deleteRecipe(id)

      runInAction(() => {
        if (this.currentRecipe?.recipeID === id) {
          this.currentRecipe = null
        }

        this.currentRecipeList = this.currentRecipeList.filter(
          (recipe) => recipe.recipeID !== id
        )
      })
    } catch (e) {
      throw e
    }
  }
}
