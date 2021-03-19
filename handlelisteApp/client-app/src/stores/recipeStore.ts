import { makeAutoObservable, runInAction } from 'mobx'
import agent from '../api/agent'
import { store } from './store'
import { IRecipe } from '../models/recipe'
import { history } from '../index'

export default class RecipeStore {
  currentRecipe: IRecipe | undefined = undefined
  currentRecipeList: IRecipe[] = []
  usersRecipeList: Map<number, IRecipe[] | undefined> = new Map()
  allRecipes: IRecipe[] | undefined = undefined
  loading: boolean = false
  successToastMessage: string = ''
  errorToastMessage: string = ''
  tabIndex: number = 0

  constructor() {
    makeAutoObservable(this)
  }

  getRecipe = async (id: number) => {
    this.resetAndStartLoading()

    if (this.currentRecipe?.recipeID === id) {
      runInAction(() => {
        this.loading = false
      })
      return
    }

    let recipe = this.currentRecipeList.find((recipe) => recipe.recipeID === id)
    if (recipe) {
      this.currentRecipe = recipe
      runInAction(() => {
        this.loading = false
      })
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

    //First return old list if exists
    let userRecipes = this.usersRecipeList.get(id)
    if (userRecipes) {
      runInAction(() => {
        this.currentRecipeList = userRecipes!
        this.loading = false
      })
    }

    //Then update list
    try {
      userRecipes = await agent.recipes.getAllUserRecipes(id)
      if (userRecipes) {
        runInAction(() => {
          this.usersRecipeList.set(id, userRecipes)
          this.currentRecipeList = userRecipes!
          this.loading = false
        })
      } else {
        this.error('retrive recipe.')
      }
    } catch (e) {
      this.error('retrive recipe.')
    }
  }

  getAllRecipes = async () => {
    this.resetAndStartLoading()

    if (this.allRecipes) {
      runInAction(() => {
        this.currentRecipeList = this.allRecipes!
        this.loading = false
      })
      return
    }

    try {
      const recipes = await agent.recipes.getAllRecipes()
      runInAction(() => {
        this.allRecipes = recipes || []
        this.currentRecipeList = recipes || []
        this.loading = false
      })
    } catch (e) {
      this.error('retrive recipes.')
    }
  }

  createRecipe = async (recipe: IRecipe) => {
    this.resetAndStartLoading()

    try {
      const newRecipe = await agent.recipe.postRecipe(recipe)

      if (!newRecipe) {
        this.error('create recipe.')
        return
      }

      if (store.userStore.user) {
        const userId = parseInt(store.userStore.user.userID)
        const oldList = this.usersRecipeList.get(userId) || []
        runInAction(() => {
          this.currentRecipe = newRecipe
          this.usersRecipeList.set(userId, [...oldList, newRecipe])
          this.currentRecipeList = [...oldList, newRecipe]
          this.successToastMessage = 'Recipe created successfully'
          this.loading = false
          history.push(`recipes`)
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

    if (!store.userStore.user?.userID) {
      this.error('update recipe')
      return
    }

    const userId = parseInt(store.userStore.user?.userID)

    try {
      const updatedRecipe = await agent.recipe.updateRecipe(recipe, id)

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

        if (store.userStore.user?.userID) {
          this.usersRecipeList.set(
            parseInt(store.userStore.user!.userID),
            this.currentRecipeList
          )
        }

        if (this.allRecipes) {
          this.allRecipes = this.allRecipes.filter(
            (recipe) => recipe.recipeID !== id
          )
        }

        this.successToastMessage = 'Deleted successfully'
        this.loading = false
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

  setTabIndex(index: number) {
    runInAction(() => (this.tabIndex = index))
  }

  setToastSuccessMessage(message: string) {
    runInAction(() => (this.successToastMessage = message))
  }

  private resetAndStartLoading() {
    runInAction(() => {
      this.loading = true
    })
  }

  private error(message: string) {
    runInAction(() => {
      this.errorToastMessage = `Failed to ${message}`
      this.loading = false
    })
  }
}
