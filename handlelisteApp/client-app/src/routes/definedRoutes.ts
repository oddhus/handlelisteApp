export const allUsers = [
  { path: "/shopping-list", name: "Shopping List" },
  { path: "/recipes", name: "Recipes" },
  { path: "/create-recipe", name: "Create Recipes" },
  { path: "/household", name: "Household" },
  { path: "/settings", name: "Settings" },
];

export const signedIn = allUsers;
// export const signedIn = [
//   { path: "/create-recipes", name: "Create Recipes" },
//   { path: "/my-recipes", name: "My Recipes" },
//   { path: "/account", name: "Account" },
// ];

export const signedOut = [
  { path: "/signup", name: "Register" },
  { path: "/signin", name: "Login", isLast: true },
];
