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
import { NoMatch } from '../pages/errors/NoMatch'
import { ServerError } from '../pages/errors/ServerError'
import { Unauthorized } from '../pages/errors/Unauthorized'
import PrivateRoute from "./PrivateRoute";

interface Props {}

export const AppRoutes: React.FC<Props> = () => {
  return (
      <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
          <div style={{flex: 1}}>
              <Switch>
                  <PrivateRoute exact path="/" component={ShoppingLists} />
                  <Route exact path="/signin" component={SignIn} />
                  <Route exact path="/signup" component={SignUp} />
                  <PrivateRoute exact path="/create-recipe" component={CreateRecipe} />
                  <PrivateRoute exact path="/create-recipe/:recipeId" component={CreateRecipe} />
                  <Route exact path="/recipe/:recipeId" component={Recipe} />
                  <Route exact path="/recipes" component={Recipes} />
                  <Route exact path="/recipes/:recipeId" component={Recipe} />
                  <PrivateRoute exact path="/shopping-list" component={ShoppingLists} />
                  <PrivateRoute path="/shopping-list/:listId" component={ShoppingListPage} />
                  <PrivateRoute exact path="/settings" component={Settings} />
                  <Route exact path="/server-error" component={ServerError} />
                  <Route exact path="/unauthorised" component={Unauthorized} />
                  <Route exact component={NoMatch} />
              </Switch>
          </div>
      </div>

  )
}
