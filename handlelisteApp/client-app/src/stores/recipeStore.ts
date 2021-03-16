import { makeAutoObservable, runInAction } from 'mobx'
import agent from '../api/agent'
import { store } from './store'
import { IRecipe } from '../models/recipe'
import { history } from '../index'

export default class RecipeStore {
  currentRecipe: IRecipe | undefined = undefined
  currentRecipeList: IRecipe[] = []
  usersRecipeList: Map<number, IRecipe[]> = new Map()
  loading: boolean = false
  successToastMessage: string = ''
  errorToastMessage: string = ''

  constructor() {
    makeAutoObservable(this)
  }

  getRecipe = async (id: number) => {
    this.resetAndStartLoading()

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
        runInAction(() => {
          this.currentRecipe = recipe
          this.currentRecipeList.push(recipe!)
          this.loading = false
        })
      } else {
        this.error('retrive recipe.')
      }
    } catch (e) {
      this.error('retrive recipe.')
    }
  }

  getUserRecipes = async (id: number) => {
    this.resetAndStartLoading()

    let userRecipes = this.usersRecipeList.get(id)
    if (userRecipes) {
      runInAction(() => (this.loading = false))
      return
    }

    try {
      userRecipes = await agent.recipes.getAllUserRecipes(id)
      runInAction(() => {
        this.usersRecipeList.set(id, userRecipes || [])
        this.loading = false
      })
    } catch (e) {
      this.error('retrive recipes.')
    }
  }

  createRecipe = async (recipe: IRecipe) => {
    this.resetAndStartLoading()

    try {
      const newRecipe = (await agent.recipe.postRecipe(recipe)) as IRecipe

      if (!newRecipe) {
        this.error('create recipe.')
      }

      if (store.userStore.user) {
        const userId = parseInt(store.userStore.user.id)
        const oldList = this.usersRecipeList.get(userId) || []
        runInAction(() => {
          this.currentRecipe = newRecipe
          this.usersRecipeList.set(userId, [...oldList, newRecipe])
          this.successToastMessage = 'Recipe created successfully'
          runInAction(() => (this.loading = false))
          history.push(`recipe/${newRecipe.recipeID}`)
        })
      }
    } catch (e) {
      this.error(
        'create recipe.' +
          (e.response ? ` With status code: ${e.response.status}` : '')
      )
    }
  }

  updateRecipe = async (recipe: IRecipe, id: number) => {
    this.resetAndStartLoading()

    if (!store.userStore.user) {
      this.error('update recipe')
      return
    }

    const userId = parseInt(store.userStore.user?.id)

    try {
      const updatedRecipe = (await agent.recipe.updateRecipe(
        recipe,
        id
      )) as IRecipe

      const oldList = this.usersRecipeList.get(userId) || []
      const index = oldList.findIndex(
        (recipe) => recipe.recipeID === updatedRecipe.recipeID
      )

      if (index !== -1) {
        oldList[index] = updatedRecipe
      }

      runInAction(() => {
        this.currentRecipe = updatedRecipe
        this.currentRecipeList = oldList
        this.usersRecipeList.set(userId, oldList)
        runInAction(() => (this.loading = false))
      })
    } catch (e) {
      this.error('update recipe')
    }
  }

  setCurrentRecipe = (recipe: IRecipe) => {
    runInAction(() => {
      this.currentRecipe = recipe
    })
  }

  deleteRecipe = async (id: number) => {
    this.resetAndStartLoading()
    try {
      await agent.recipe.deleteRecipe(id)

      runInAction(() => {
        if (this.currentRecipe?.recipeID === id) {
          this.currentRecipe = undefined
        }

        this.currentRecipeList = this.currentRecipeList.filter(
          (recipe) => recipe.recipeID !== id
        )
      })
    } catch (e) {
      this.error('delete recipe')
    }
  }

  reset() {
    runInAction(() => {
      this.loading = false
      this.successToastMessage = ''
      this.errorToastMessage = ''
    })
  }

  private resetAndStartLoading() {
    runInAction(() => {
      this.loading = true
      this.successToastMessage = ''
      this.errorToastMessage = ''
    })
  }

  private error(message: string) {
    runInAction(() => {
      this.errorToastMessage = `Failed to ${message}`
      this.loading = false
    })
  }
}
