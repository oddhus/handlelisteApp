import React from 'react'
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
  units = ['PCS', 'KG', 'L', 'ML', 'PCK']
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

  myRecipes = 'My recipes'
  allRecipes = 'All recipes'
  recipes = 'Recipes'
  recipe = 'Recipe'
  createRecipe = 'Create recipe'
  ingredient = 'Ingredient'
  ingredients = 'Ingredients'
  shortDescription = 'Short description'
  approach = 'Approach'
  recipeName = 'Recipe name'
  recipeAddedToShoppingList = 'Recipe added to shopping list'
  addRecipeToShoppingList = 'Add recipe to shopping list'
  noRecipeSelected = 'No recipe selected'
  noRecipesFound = 'No recipes found'
  noRecipeFound = 'No recipe found'

  suggestedRecipes = 'Suggested recipes'
  suggestedRecipesToolTip = 'Based on your latest shopping trips we suggest these recipes.'

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

  explore = 'Explore'

  search = "Search"

  welcomeToTheShoppingList = ' Welcome to the shopping list'
  myShoppingList = 'My shopping list'
  remove = 'Remove'
  update = 'Update'
  createNew = 'Create'
  
  archiveShoppingList = 'Archive shopping list'
  addItemsFromRecipe = 'Add items from recipe'
  addItem = 'Add Item'
  addItemsFromLastTrip = 'Do you want to add items from your last trip?'
  noThanks= 'No thanks'
}
