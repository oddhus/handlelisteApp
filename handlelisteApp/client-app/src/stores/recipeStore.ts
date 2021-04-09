import { makeAutoObservable, runInAction } from 'mobx'
import agent from '../api/agent'
import { store } from './store'
import { IRecipe } from '../models/recipe'
import { history } from '../index'
import { IFeedback } from '../models/generalTypes'

export default class RecipeStore {
  currentRecipe: IRecipe | undefined = undefined
  currentRecipeList: IRecipe[] = []
  usersRecipeList: Map<number, IRecipe[] | undefined> = new Map()
  allRecipes: IRecipe[] | undefined = undefined
  loading: boolean = false
  successToastMessage: string = ''
  errorToastMessage: string = ''
  tabIndex: number = 0
  isOwnerOfCurrentRecipe: boolean = false
  recipieSuggestions: IRecipe[] | undefined = undefined
  feedBack: IFeedback | null = null

  constructor() {
    makeAutoObservable(this)
  }

  //Check is the current user is the owner of the current recipe
  get isOwner() {
    if (
      !store.userStore.user?.userID ||
      !this.currentRecipe ||
      !this.currentRecipe?.recipeID
    ) {
      return false
    }

    const userRecipes = this.usersRecipeList.get(
      parseInt(store.userStore.user!.userID)
    )

    return (
      !!userRecipes &&
      !!userRecipes.find(
        (recipe) => recipe.recipeID === this.currentRecipe!.recipeID
      )
    )
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
        const recipeList = this.usersRecipeList.get(userId) || []
        runInAction(() => {
          this.currentRecipe = newRecipe
          this.usersRecipeList.set(userId, [...recipeList, newRecipe])
          this.currentRecipeList = [...recipeList, newRecipe]
          this.success('Recipe created')
          history.push(`/recipes`)
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

      const recipeList = this.usersRecipeList.get(userId) || []
      const index = recipeList.findIndex(
        (recipe) => recipe.recipeID === updatedRecipe.recipeID
      )

      if (index !== -1) {
        recipeList[index] = updatedRecipe
      }

      runInAction(() => {
        this.currentRecipe = updatedRecipe
        this.currentRecipeList = recipeList
        this.usersRecipeList.set(userId, recipeList)
        this.success('Recipe updated')
        history.push(`/recipes`)
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
        this.success('Deleted')
      })
    } catch (e) {
      this.error('delete recipe')
    }
  }

  async getRecipieSuggestions() {
    this.resetAndStartLoading()
    /*
    if (this.recipieSuggestions) {
      runInAction(() => {
        this.currentRecipeList = this.recipieSuggestions!
        this.loading = false
      })
      return
    }
*/
    try {
      const recipes = await agent.recipes.getRecipieSuggestions()
      runInAction(() => {
        this.recipieSuggestions = recipes || []
        this.currentRecipeList = recipes || []
        this.loading = false
      })
    } catch (e) {
      this.error('Failed to retrieve recipe suggestions')
    }
  }

  reset() {
    runInAction(() => {
      this.loading = false
      this.successToastMessage = ''
      this.errorToastMessage = ''
    })
  }

  resetRecipeStoreData() {
    runInAction(() => {
      this.currentRecipe = undefined
      this.currentRecipeList = []
      this.usersRecipeList = new Map()
      this.allRecipes = undefined
      this.loading = false
      this.successToastMessage = ''
      this.errorToastMessage = ''
      this.tabIndex = 0
      this.isOwnerOfCurrentRecipe = false
      this.recipieSuggestions = undefined
      this.feedBack = null
    })
  }
  
  setTabIndex(index: number) {
    runInAction(() => (this.tabIndex = index))
  }

  setToastSuccessMessage(message: string) {
    runInAction(() => (this.successToastMessage = message))
  }

  searchInRecipies(keyword: string) {
    let foundRecipes: IRecipe[] = []
    this.allRecipes!.forEach((recipe) => {
      if (recipe.recipeName.toLocaleLowerCase().includes(keyword)) {
        foundRecipes.push(recipe)
      } else {
        if (
          recipe.items.some((item) => item.itemName.toLowerCase() === keyword)
        )
          foundRecipes.push(recipe)
      }
    })
    runInAction(() => (this.currentRecipeList = foundRecipes))
  }

  private resetAndStartLoading() {
    runInAction(() => {
      this.loading = true
    })
  }

  private success(message: string) {
    runInAction(() => {
      this.feedBack = {
        status: 'success',
        text: `${message} successfully`,
      }
      this.loading = false
    })
  }

  private error(message: string) {
    runInAction(() => {
      this.feedBack = {
        status: 'error',
        text: `Failed to ${message}`,
      }
      this.loading = false
    })
  }

  resetFeedBack = () => {
    this.feedBack = null
  }
}
