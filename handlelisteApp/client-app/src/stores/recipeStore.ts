import { makeAutoObservable, runInAction } from 'mobx'
import agent from '../api/agent'
import { store } from './store'
import { IPaginatedRecipes, IRecipe } from '../models/recipe'
import { history } from '../index'
import { IFeedback } from '../models/generalTypes'
import { debounce } from 'lodash'
export default class RecipeStore {
  currentRecipe: IRecipe | undefined = undefined
  filteredUserRecipeList: IRecipe[] = []
  userRecipeList: IRecipe[] = []

  savedRecipeList: IRecipe[] = []
  filteredSavedRecipeList: IRecipe[] = []
  filteredRecipeSuggestions: IRecipe[] = []
  recipeSuggestions: IRecipe[] = []
  allRecipes: IPaginatedRecipes | undefined = undefined
  loading: boolean = false
  loadingAddFavourite: number | undefined = undefined
  tabIndex: number = 0
  isOwnerOfCurrentRecipe: boolean = false
  feedBack: IFeedback | null = null
  cardView: boolean = true
  currentCroppedImage: Blob | undefined = undefined
  uploadedImageUrl: string = ''

  constructor() {
    makeAutoObservable(this)
  }

  debouncedGetRecipes = debounce((query) => {
    this.getAllRecipes(query)
  }, 500)

  //Creates a new recipe
  createRecipe = async (recipe: IRecipe) => {
    this.loading = true

    //If user has selected a picture, upload it and add the link
    if (
      this.currentCroppedImage &&
      (await this.upLoadPhoto(this.currentCroppedImage))
    ) {
      recipe.imgUrl = this.uploadedImageUrl
    }

    try {
      const newRecipe = await agent.recipe.postRecipe(recipe)

      if (!newRecipe) {
        this.error(store.settingStore.language.createRecipeFailed)
        return
      }

      if (store.userStore.user) {
        runInAction(() => {
          this.currentRecipe = newRecipe
          this.userRecipeList.push(newRecipe)
          this.currentCroppedImage = undefined
          this.success(store.settingStore.language.createdRecipe)
          history.push(`/recipes`)
        })
      }
    } catch (e) {
      this.error(store.settingStore.language.createRecipeFailed)
    } finally {
      runInAction(() => (this.loading = false))
    }
  }

  // Deletes a recipe based on id.
  deleteRecipe = async (id: number) => {
    try {
      await agent.recipe.deleteRecipe(id)

      runInAction(() => {
        if (this.currentRecipe?.recipeID === id) {
          this.currentRecipe = undefined
        }

        if (this.recipeSuggestions && this.recipeSuggestions.length > 0) {
          this.recipeSuggestions = this.recipeSuggestions.filter(
            (recipe) => recipe.recipeID !== id
          )
          this.filteredRecipeSuggestions = this.filteredRecipeSuggestions.filter(
            (recipe) => recipe.recipeID !== id
          )
        }

        if (this.userRecipeList && this.userRecipeList.length > 0) {
          this.userRecipeList = this.userRecipeList.filter(
            (recipe) => recipe.recipeID !== id
          )
          this.filteredUserRecipeList = this.filteredUserRecipeList.filter(
            (recipe) => recipe.recipeID !== id
          )
        }

        if (this.allRecipes?.recipes && this.allRecipes.recipes.length > 0) {
          this.allRecipes.recipes = this.allRecipes.recipes.filter(
            (recipe) => recipe.recipeID !== id
          )
        }
        this.success(store.settingStore.language.deletedRecipe)
      })
    } catch (e) {
      this.error(store.settingStore.language.deleteRecipeFailed)
    }
  }

  // Search all the different lists in the store if they contain a recipe with a specified id
  findExistingRecipe(id: number) {
    let recipe
    recipe = this.allRecipes?.recipes.find((recipe) => recipe.recipeID === id)
    if (recipe) {
      return recipe
    }
    recipe = this.userRecipeList.find((recipe) => recipe.recipeID === id)
    if (recipe) {
      return recipe
    }
    recipe = this.recipeSuggestions.find((recipe) => recipe.recipeID === id)
    return recipe
  }

  // Search through all recipes
  getAllRecipes = async (query?: string | undefined) => {
    this.loading = true
    try {
      const paginatedRecipes = await agent.recipes.getAllRecipes(query)
      runInAction(() => {
        this.allRecipes = paginatedRecipes
      })
    } catch (e) {
      this.error(store.settingStore.language.retriveRecipesFailed)
    } finally {
      runInAction(() => (this.loading = false))
    }
  }

  // Get a recipe with a specified id. First search through the local store, then fetch externally
  getRecipe = async (id: number) => {
    if (this.currentRecipe?.recipeID === id) {
      return
    }

    this.loading = true
    let recipe = this.findExistingRecipe(id)
    if (recipe) {
      runInAction(() => {
        this.currentRecipe = recipe
        this.loading = false
      })
      return
    }

    try {
      recipe = await agent.recipe.getRecipe(id)
      if (recipe) {
        runInAction(() => {
          this.currentRecipe = recipe
        })
      } else {
        this.error(store.settingStore.language.retriveRecipeFailed)
      }
    } catch (e) {
      this.error(store.settingStore.language.retriveRecipeFailed)
    } finally {
      runInAction(() => (this.loading = false))
    }
  }

  getRecipieSuggestions = async (
    searchText?: string | null | undefined,
    items?: never[] | (string | null)[]
  ) => {
    try {
      this.loading = true
      const recipes = await agent.recipes.getRecipieSuggestions()
      runInAction(() => {
        this.recipeSuggestions = recipes || []
        this.filteredRecipeSuggestions = this.filterRecipes(
          this.recipeSuggestions,
          searchText,
          items
        )
      })
    } catch (e) {
      this.error(store.settingStore.language.retriveRecipesFailed)
    } finally {
      runInAction(() => (this.loading = false))
    }
  }

  getUserSavedRecipes = async (
    searchText?: string | null | undefined,
    items?: never[] | (string | null)[]
  ) => {
    this.loading = true
    try {
      const savedRecipes = await agent.recipes.getSavedRecipes()
      if (savedRecipes) {
        runInAction(() => {
          this.savedRecipeList = savedRecipes || []
          this.filteredSavedRecipeList = this.filterRecipes(
            savedRecipes,
            searchText,
            items
          )
        })
      } else {
        this.error(store.settingStore.language.retriveRecipesFailed)
      }
    } catch (e) {
      this.error(store.settingStore.language.retriveRecipeFailed)
    } finally {
      runInAction(() => (this.loading = false))
    }
  }

  getUserRecipes = async (
    id: number,
    searchText?: string | null | undefined,
    items?: never[] | (string | null)[]
  ) => {
    this.loading = true
    try {
      const userRecipes = await agent.recipes.getAllUserRecipes(id)
      if (userRecipes) {
        runInAction(() => {
          this.userRecipeList = userRecipes || []
          this.filteredUserRecipeList = this.filterRecipes(
            userRecipes,
            searchText,
            items
          )
        })
      } else {
        this.error(store.settingStore.language.retriveRecipesFailed)
      }
    } catch (e) {
      this.error(store.settingStore.language.retriveRecipeFailed)
    } finally {
      runInAction(() => (this.loading = false))
    }
  }

  // Make request to like or unlike a specified recipe
  likeOrRemoveLikeOnRecipe = async (recipe: IRecipe) => {
    if (!store.userStore.user?.userID || !recipe || !recipe.recipeID) {
      return
    }
    // The loading indicator must be the number of the specific recipe
    this.loadingAddFavourite = recipe.recipeID
    try {
      if (!recipe.hasLiked) {
        await agent.recipe.likeRecipe(recipe.recipeID)
        if (!recipe.isOwner) {
          this.savedRecipeList.push(recipe)
        }
      } else {
        await agent.recipe.deleteRecipeLike(recipe.recipeID)
        if (!recipe.isOwner) {
          this.savedRecipeList = this.savedRecipeList.filter(
            (savedRecipe) => savedRecipe.recipeID !== recipe.recipeID
          )
          this.filteredSavedRecipeList = this.filteredSavedRecipeList.filter(
            (savedRecipe) => savedRecipe.recipeID !== recipe.recipeID
          )
        }
      }
      runInAction(() => (recipe.hasLiked = !recipe.hasLiked))
    } catch (error) {
    } finally {
      runInAction(() => (this.loadingAddFavourite = undefined))
    }
  }

  removeCurrentImage() {
    this.currentCroppedImage = undefined
  }

  //Reset the feedback which is displayed in the toast
  resetFeedBack = () => {
    this.feedBack = null
  }

  resetRecipeStoreData() {
    runInAction(() => {
      this.currentRecipe = undefined
      this.userRecipeList = []
      this.allRecipes = undefined
      this.filteredRecipeSuggestions = []
      this.filteredSavedRecipeList = []
      this.filteredUserRecipeList = []
      this.loading = false
      this.tabIndex = 0
      this.isOwnerOfCurrentRecipe = false
      this.recipeSuggestions = []
      this.feedBack = null
    })
  }

  // Depending on tab the user currently is viewing, filter the specific recipe list.
  searchInRecipes(
    searchText?: string | null | undefined,
    items?: never[] | (string | null)[]
  ) {
    if (!searchText) {
      searchText = ''
    }

    if (this.tabIndex === 0 && store.userStore.user?.userID) {
      this.filteredUserRecipeList = this.filterRecipes(
        this.userRecipeList,
        searchText,
        items
      )
      this.filteredSavedRecipeList = this.filterRecipes(
        this.savedRecipeList,
        searchText,
        items
      )
    } else if (this.tabIndex === 1) {
      this.debouncedGetRecipes(searchText)
    } else if (
      this.tabIndex === 2 &&
      this.recipeSuggestions &&
      this.recipeSuggestions.length > 0
    ) {
      this.filteredRecipeSuggestions = this.filterRecipes(
        this.recipeSuggestions,
        searchText,
        items
      )
    }
  }

  setCurrentRecipe = (recipe: IRecipe) => {
    runInAction(() => {
      this.currentRecipe = recipe
    })
  }

  //Sets the tab of the /recipes route
  setTabIndex(index: number) {
    runInAction(() => (this.tabIndex = index))
  }

  updateRecipe = async (recipe: IRecipe, id: number) => {
    if (!store.userStore.user?.userID) {
      this.error(store.settingStore.language.updateRecipeFailed)
      return
    }

    // Upload a new image if the user selects one, otherwise keep the same
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
        this.currentCroppedImage = undefined
        this.success(store.settingStore.language.updateRecipe)
        history.push(`/recipes`)
      })
    } catch (e) {
      this.error(store.settingStore.language.updateRecipeFailed)
    }
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

  //Set feedback which triggers toast
  private error(text: string) {
    runInAction(() => {
      this.feedBack = {
        status: 'error',
        text,
      }
    })
  }

  private filterRecipes(
    recipesToFilter: IRecipe[],
    searchText?: string | null | undefined,
    items?: never[] | (string | null)[]
  ) {
    //Filter based on title
    if (searchText) {
      recipesToFilter = recipesToFilter.filter((recipe) =>
        recipe.recipeName.toLocaleLowerCase().includes(searchText!)
      )
    }
    //Filter based on ingredients
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

  //Set feedback which triggers toast
  private success(text: string) {
    runInAction(() => {
      this.feedBack = {
        status: 'success',
        text,
      }
    })
  }
}
