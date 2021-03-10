import React from "react";
import {ILanguage} from "./Language";


export default class English implements ILanguage {
    homePage = "HomePage";

    signUp = "Sign up";

    login = "Login";
    emailAddress = "Email address";
    password = "Password";
    weNeverShareEmail = "We will never share your email.";

    shoppingList = ["Quantity", "Unit"];
    shoppingLists = "Shopping lists";
    createShoppingList = "Create shopping list";
    product = "Product";
    category = "Category";
    units = ["PCS", "KG", "L", "ML", "PCK"];
    editList = "Edit shopping list";

    recipes = "Recipes";
    recipe = "Recipe";
    createRecipe = "Create recipe";

    settings = "Settings";
    userSettings = "User settings";
    householdSettings = "Household settings";
    accessibilitySettings = "Accessibility settings";
    blacklistSettings = "Blacklist settings";
    activeLanguage = "Language";

    household = "Household";

    noMatch = "No match";

    Username = "Your username";

    passwordRepeat = "Repeat your password";

    cancel = "Cancel";

    add = "Add";
}