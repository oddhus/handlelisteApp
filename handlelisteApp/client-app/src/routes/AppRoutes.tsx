import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { CreateRecipe } from '../pages/CreateRecipe'
import { Recipes } from '../pages/Recipes'
import { SignIn } from '../pages/SignIn'
import { SignUp } from '../pages/SignUp'
import { Recipe } from '../pages/Recipe'
import { ShoppingLists } from '../pages/ShoppingLists'
import { ShoppingList } from '../pages/ShoppingList'
import { Settings } from '../pages/Settings'
import { Household } from '../pages/Household'
import { NoMatch } from '../pages/NoMatch'
import { HomePage } from '../pages/HomePage'
import { MyKitchen } from '../pages/MyKitchen'

interface Props {}

export const AppRoutes: React.FC<Props> = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/create-recipe" component={CreateRecipe} />
      <Route exact path="/create-recipe/:recipeId" component={CreateRecipe} />
      <Route exact path="/recipes" component={Recipes} />
      <Route exact path="/recipes/:recipeId" component={Recipe} />
      <Route exact path="/shopping-list" component={ShoppingLists} />
      <Route
        exact
        path="/shopping-list/new-shopping-list"
        component={ShoppingList}
      />
      <Route exact path="/shopping-list/:listId" component={ShoppingList} />
      <Route exact path="/settings" component={Settings} />
      <Route exact path="/settings/user" component={Settings} />
      <Route exact path="/settings/accessibility" component={Settings} />
      <Route exact path="/settings/blacklist" component={Settings} />
      <Route exact path="/settings/household" component={Settings} />
      <Route exact path="/household" component={Household} />
      <Route exact path="/mykitchen" component={MyKitchen} />
      <Route exact component={NoMatch} />
    </Switch>
  )
}
