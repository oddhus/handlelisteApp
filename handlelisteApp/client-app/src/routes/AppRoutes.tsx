import React from "react";
import { Route, Switch } from "react-router-dom";
import { CreateRecipe } from "../pages/CreateRecipe";
import { Recipes } from "../pages/Recipes";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
import { Recipe } from "../pages/Recipe";
import { ShoppingLists } from "../pages/ShoppingLists";
import { ShoppingList } from "../pages/ShoppingList";
import { Settings } from "../pages/Settings";
import { Household } from "../pages/Household";

interface Props {}

export const AppRoutes: React.FC<Props> = () => {
  return (
    <Switch>
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/create-recipe" component={CreateRecipe} />
      <Route path="/recipes" component={Recipes} />
      <Route path="/recipes/:recipeId" component={Recipe} />
      <Route path="/shopping-list" component={ShoppingLists} />
      <Route path="/shopping-list/:listId" component={ShoppingList} />
      <Route path="/settings/user" component={Settings} />
      <Route path="/settings/accessibility" component={Settings} />
      <Route path="/settings/blacklist" component={Settings} />
      <Route path="/settings/household" component={Settings} />
      <Route path="/household" component={Household} />
    </Switch>
  );
};
