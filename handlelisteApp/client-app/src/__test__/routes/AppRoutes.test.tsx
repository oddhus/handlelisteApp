import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import { AppRoutes } from "../../routes/AppRoutes";
import {Heading} from "@chakra-ui/react";
import {MockLanguage} from "../MockLanguage";


const setup = (path: string) => {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
    </MemoryRouter>
  );
};

const routeComponentPropsMock = {
  history: {} as any,
  location: {} as any,
  match: {} as any,
};

//Mock the store returned from the useStore hook. In this case only null is returned.
jest.mock("../../stores/store", () => ({
  useStore: () => ({
    userStore: null,
    shoppingListStore: {
      shoppingList: {
        shoppingListId: 0
      },
      shoppingLists: [],
      fetchShoppingLists(){},
      getShoppinglist(id: number){
        return (
          [
            {
              shoppingListID: 1,
              items: [
                {
                  category: "category",
                  product: "product",
                  quantity: 1,
                  unit: "pcs"
                }
              ]
            }
          ]
        )
      }
    },
    settingStore: {
      language: {...MockLanguage}
    },
  }),
}));



describe("AppRoutes", () => {
  describe("Layout", () => {
    it("displays homepage when url is /", () => {
      const { queryByTestId } = setup("/");
      expect(queryByTestId("homepage")).toBeInTheDocument();
    });

    it("displays SignInPage when url is /signin", () => {
      const { getByTestId } = setup("/signin");
      expect(getByTestId("login-container")).toBeInTheDocument();
    });
    
    it("displays Sign up when url is /signup", () => {
      const { getByTestId } = setup("/signup");
      expect(getByTestId('signup-container')).toHaveTextContent("Sign up");
    });
    it("displays Create recipe when url is /create-recipe", () => {
      const { container } = setup("/create-recipe");
      const header = container.querySelector("div");
      expect(header).toHaveTextContent("Create recipe");
    });

    it("displays recipesPage when url is /recipes", () => {
      const { container } = setup("/recipes");
      const header = container.querySelector("div");
      expect(header).toHaveTextContent("Recipes");
    });

    it("displays RecipePage when url is /recipes/:recipeId", () => {
      const { container } = setup("/recipes/:recipeId");
      const header = container.querySelector("div");
      expect(header).toHaveTextContent("Recipe");
    });

    it("displays a table when url is shopping-list", () => {
      const { container } = setup("/shopping-list");
      const div = container.querySelector('table')
      expect(div).toBeVisible
    });

    it("displays ShoppingList when url is /shopping-list/:listId", () => {
      const { container } = setup("/shopping-list/:listId");
      const table = container.querySelector("table");
      expect(table).toBeVisible();
    });

    it("displays SettingPage when url is /settings/user", () => {
      const { container } = setup("/settings/user");
      const header = container.querySelector("div");
      expect(header).toHaveTextContent("Settings");
    });

    it("displays householdPage when url is /household", () => {
      const { container } = setup("/household");
      const header = container.querySelector("div");
      expect(header).toHaveTextContent("Household");
    });
  });
});
