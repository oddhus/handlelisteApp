import { makeAutoObservable, runInAction } from 'mobx'
import agent from '../api/agent'
import { store } from './store'
import { IPaginatedRecipes, IRecipe } from '../models/recipe'
import { history } from '../index'
import { IFeedback } from '../models/generalTypes'
import { debounce } from 'lodash'
export default class RecipeStore {
  currentRecipe: IRecipe | undefined = undefined
  currentRecipeList: IRecipe[] = []
  userRecipeList: IRecipe[] = []
  allRecipes: IPaginatedRecipes | undefined = undefined
  loading: boolean = false
  loadingAddFavourite: number | undefined = undefined
  successToastMessage: string = ''
  errorToastMessage: string = ''
  tabIndex: number = 0
  isOwnerOfCurrentRecipe: boolean = false
  recipieSuggestions: IRecipe[] | undefined = undefined
  feedBack: IFeedback | null = null
  cardView: boolean = true
  uploading = false
  currentCroppedImage: Blob | undefined = undefined
  uploadedImageUrl: string = ''
  isFiltering: boolean = true

  constructor() {
    makeAutoObservable(this)
  }

  debouncedGetRecipes = debounce((query) => {
    this.getAllRecipes(query)
  }, 500)

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

  getUserRecipes = async (
    id: number,
    searchText?: string | null | undefined,
    items?: never[] | (string | null)[]
  ) => {
    this.resetAndStartLoading()

    try {
      const userRecipes = await agent.recipes.getAllUserRecipes(id)
      if (userRecipes) {
        runInAction(() => {
          this.userRecipeList = userRecipes || []
          this.currentRecipeList = this.filterRecipes(
            userRecipes,
            searchText,
            items
          )
          this.loading = false
        })
      } else {
        this.error('retrive recipe.')
      }
    } catch (e) {
      this.error('retrive recipe.')
    }
  }

  getAllRecipes = async (query?: string | undefined) => {
    this.resetAndStartLoading()
    try {
      const paginatedRecipes = await agent.recipes.getAllRecipes(query)
      runInAction(() => {
        this.allRecipes = paginatedRecipes || []
        this.currentRecipeList = paginatedRecipes.recipes || []
        this.loading = false
      })
    } catch (e) {
      this.error('retrive recipes.')
    }
  }

  createRecipe = async (recipe: IRecipe) => {
    this.resetAndStartLoading()

    if (
      this.currentCroppedImage &&
      (await this.upLoadPhoto(this.currentCroppedImage))
    ) {
      recipe.imgUrl = this.uploadedImageUrl
    }

    try {
      const newRecipe = await agent.recipe.postRecipe(recipe)

      if (!newRecipe) {
        this.error('create recipe.')
        return
      }

      if (store.userStore.user) {
        runInAction(() => {
          this.currentRecipe = newRecipe
          this.userRecipeList.push(newRecipe)
          this.currentRecipeList.push(newRecipe)
          this.currentCroppedImage = undefined
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

  likeOrRemoveLikeOnRecipe = async (recipe: IRecipe) => {
    if (!store.userStore.user?.userID || !recipe || !recipe.recipeID) {
      return
    }
    this.loadingAddFavourite = recipe.recipeID
    try {
      if (!recipe.hasLiked) {
        await agent.recipe.likeRecipe(recipe.recipeID)
      } else {
        await agent.recipe.deleteRecipeLike(recipe.recipeID)
      }
      runInAction(() => (recipe.hasLiked = !recipe.hasLiked))
    } catch (error) {
    } finally {
      runInAction(() => (this.loadingAddFavourite = undefined))
    }
  }

  updateRecipe = async (recipe: IRecipe, id: number) => {
    this.resetAndStartLoading()

    if (!store.userStore.user?.userID) {
      this.error('update recipe')
      return
    }

    if (
      this.currentCroppedImage &&
      (await this.upLoadPhoto(this.currentCroppedImage))
    ) {
      recipe.imgUrl = this.uploadedImageUrl
    }

    try {
      const updatedRecipe = await agent.recipe.updateRecipe(recipe, id)

      const index = this.userRecipeList.findIndex(
        (recipe) => recipe.recipeID === updatedRecipe.recipeID
      )

      if (index !== -1) {
        this.userRecipeList[index] = updatedRecipe
      }

      runInAction(() => {
        this.currentRecipe = updatedRecipe
        this.currentRecipeList = this.userRecipeList
        this.currentCroppedImage = undefined
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

        this.userRecipeList = this.userRecipeList.filter(
          (recipe) => recipe.recipeID !== id
        )

        if (this.allRecipes) {
          this.allRecipes.recipes = this.allRecipes.recipes.filter(
            (recipe) => recipe.recipeID !== id
          )
        }
        this.success('Deleted')
      })
    } catch (e) {
      this.error('delete recipe')
    }
  }

  async getRecipieSuggestions(
    searchText?: string | null | undefined,
    items?: never[] | (string | null)[]
  ) {
    this.resetAndStartLoading()
    try {
      const recipes = await agent.recipes.getRecipieSuggestions()
      runInAction(() => {
        this.recipieSuggestions = recipes || []
        this.currentRecipeList = this.filterRecipes(
          recipes || [],
          searchText,
          items
        )
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
      this.userRecipeList = []
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

  removeCurrentImage() {
    this.currentCroppedImage = undefined
  }

  setTabIndex(index: number) {
    runInAction(() => (this.tabIndex = index))
  }

  setToastSuccessMessage(message: string) {
    runInAction(() => (this.successToastMessage = message))
  }

  searchInRecipes(
    searchText?: string | null | undefined,
    items?: never[] | (string | null)[]
  ) {
    if (!searchText) {
      searchText = ''
    }

    if (this.tabIndex === 1) {
      this.currentRecipeList = this.allRecipes?.recipes || []
      this.debouncedGetRecipes(searchText)
      return
    }

    if (this.tabIndex === 0 && store.userStore.user?.userID) {
      this.currentRecipeList = this.filterRecipes(
        this.userRecipeList,
        searchText,
        items
      )
    } else if (
      this.tabIndex === 2 &&
      this.recipieSuggestions &&
      this.recipieSuggestions.length > 0
    ) {
      this.currentRecipeList = this.filterRecipes(
        this.recipieSuggestions,
        searchText,
        items
      )
    }
  }

  private filterRecipes(
    recipesToFilter: IRecipe[],
    searchText?: string | null | undefined,
    items?: never[] | (string | null)[]
  ) {
    if (searchText) {
      recipesToFilter = recipesToFilter.filter((recipe) =>
        recipe.recipeName.toLocaleLowerCase().includes(searchText!)
      )
    }

    if (items && items.length > 0) {
      recipesToFilter = recipesToFilter.filter((recipe) =>
        (items as (string | null)[]).every((searchitem) =>
          recipe.items.some(
            (item) => item.itemName.toLowerCase() === searchitem
          )
        )
      )
    }

    return recipesToFilter
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

  upLoadPhoto = async (file: Blob) => {
    if (!file) return ''
    const formData = new FormData()
    formData.append('file', file)

    formData.append('upload_preset', 'or5l9i0k')
    const options = {
      method: 'POST',
      body: formData,
    }
    try {
      return fetch(
        'https://api.Cloudinary.com/v1_1/superszura/image/upload',
        options
      )
        .then((res) => res.json())
        .then((res) => (this.uploadedImageUrl = res.secure_url.toString()))
        .catch((err) => err)
    } catch (error) {
      return ''
    }
  }
}
