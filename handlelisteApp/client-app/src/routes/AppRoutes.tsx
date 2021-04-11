import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { CreateRecipe } from '../pages/CreateRecipe'
import { Recipes } from '../pages/Recipes'
import { SignIn } from '../pages/SignIn'
import { SignUp } from '../pages/SignUp'
import { Recipe } from '../pages/Recipe'
import { ShoppingLists } from '../pages/ShoppingLists'
import { ShoppingListPage } from '../pages/ShoppingList'
import { Settings } from '../pages/Settings'
import { Household } from '../pages/Household'
import { HomePage } from '../pages/HomePage'
import { NoMatch } from '../pages/errors/NoMatch'
import { ServerError } from '../pages/errors/ServerError'
import { Unauthorized } from '../pages/errors/Unauthorized'

interface Props {}

export const AppRoutes: React.FC<Props> = () => {
  return (
    <Switch>
      <Route exact path="/" component={ShoppingLists} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/create-recipe" component={CreateRecipe} />
      <Route exact path="/create-recipe/:recipeId" component={CreateRecipe} />
      <Route exact path="/recipe/:recipeId" component={Recipe} />
      <Route exact path="/recipes" component={Recipes} />
      <Route exact path="/recipes/:recipeId" component={Recipe} />
      <Route exact path="/shopping-list" component={ShoppingLists} />
      <Route path="/shopping-list/:listId" component={ShoppingListPage} />
      <Route exact path="/settings" component={Settings} />
      <Route exact path="/settings/user" component={Settings} />
      <Route exact path="/settings/accessibility" component={Settings} />
      <Route exact path="/settings/blacklist" component={Settings} />
      <Route exact path="/settings/household" component={Settings} />
      <Route exact path="/household" component={Household} />
      <Route exact path="/server-error" component={ServerError} />
      <Route exact path="/unauthorised" component={Unauthorized} />
      <Route exact component={NoMatch} />
    </Switch>
  )
}
