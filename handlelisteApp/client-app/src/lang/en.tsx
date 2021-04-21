import { ILanguage } from './Language'

export default class English implements ILanguage {
  homePage = 'HomePage'

  signUp = 'Sign up'

  login = 'Login'
  emailAddress = 'Email address'
  password = 'Password'
  weNeverShareEmail = 'We will never share your email.'

  shoppingList = ['Quantity', 'Unit']
  shoppingLists = 'Shopping lists'
  selectShoppingList = 'Select shopping list'
  createShoppingList = 'Create shopping list'
  product = 'Product'
  category = 'Category'
  units = ['PCS', 'PCK', 'KG', 'G', 'L', 'DL', 'ML', 'TBSP', 'TSP']
  editList = 'Edit shopping list'
  myShoppingLists = 'My shopping lists'
  saveList = 'Save shopping list'
  saveListName = 'Save shopping list name'
  newShoppingList = 'New Shopping list'
  categoryError = 'Category is required'
  itemNameError = 'Item name is required'
  shoppingListSaved = 'Shoppinglist successfully saved!'
  shoppingListDeleted = 'Shoppinglist successfully deleted!'
  noShoppingListFound = 'No shoppinglists found'
  endShoppingTrip = 'End shopping trip'
  editListName = 'Edit shopping list name'
  noItems = 'No items'

  myCookbook = 'My cookbook'
  savedRecipes = 'Saved recipes'
  myRecipes = 'My recipes'
  allRecipes = 'All recipes'
  recipes = 'Recipes'
  recipe = 'Recipe'
  createRecipe = 'Create recipe'
  createRecipeFailed = 'Failed to create recipe'
  createdRecipe = 'Recipe created successfully'
  deletedRecipe = 'Successfully deleted recipe'
  deleteRecipeFailed = 'Failed to delete recipe'
  retriveRecipesFailed = 'Failed to retrive recipes'
  retriveRecipeFailed = 'Failed to retrive recipe'
  updateRecipeFailed = 'Failed to update recipe'
  updateRecipe = 'Recipe updated successfully'
  ingredient = 'Ingredient'
  ingredients = 'Ingredients'
  noIngredients = 'No ingredients...'
  shortDescription = 'Short description'
  approach = 'Approach'
  imgUrl = 'Image Url'
  recipeName = 'Recipe name'
  recipeAddedToShoppingList = 'Recipe added to shopping list'
  addRecipeToShoppingList = 'Add recipe to shopping list'
  noRecipeSelected = 'No recipe selected'
  noRecipesFound = 'No recipes found'
  noRecipeFound = 'No recipe found'

  backToShoppingList = 'Back to my shopping list'

  suggestedRecipes = 'Suggested recipes'
  suggestedRecipesToolTip =
    'Based on your latest shopping trips we suggest these recipes.'

  settings = 'Settings'
  userSettings = 'User settings'
  householdSettings = 'Household settings'
  accessibilitySettings = 'Accessibility settings'
  blacklistSettings = 'Blacklist settings'
  activeLanguage = 'Language'

  household = 'Household'

  noMatch = 'No match'

  somethingError = 'Something went wrong, please try again!'

  Username = 'Your username'

  passwordRepeat = 'Repeat your password'

  cancel = 'Cancel'

  clear = 'Clear'

  add = 'Add'

  age = 'Age'

  recommendations = 'We recommend'

  search = 'Search'

  welcomeToTheShoppingList = ' Welcome to the shopping list'
  myShoppingList = 'My shopping list'
  remove = 'Remove'
  update = 'Update'
  createNew = 'Create'

  archiveShoppingList = 'Archive shopping list'
  addItemsFromRecipe = 'Add items from recipe'
  addItem = 'Add Item'
  addItemsFromLastTrip = 'Do you want to add items from your last trip?'
  addItemsFromLastTripOption = 'New shopping list with unbought items'
  noThanks = 'No thanks'
}
