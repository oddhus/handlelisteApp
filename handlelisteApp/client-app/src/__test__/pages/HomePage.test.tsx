import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { HomePage } from "../../pages/HomePage";

jest.mock("../../lang/ActiveLanguage", () => ({
  activeLanguage: {
    homePage: "HomePage",
    ShoppingList: "ShoppingLists",
    login: "Login",
    Signup: "Sign up",
    welcomeToTheShoppingList: "Welcome to the shopping list"
  },
}));

jest.mock("../../stores/store", () => ({
  useStore: () => ({
    userStore: {
      user: {
        id: 1,
        username: "bob",
        age: "12"
      },
      isLoggedIn () {
        return !! this.user
      }
    },
    modalStore: {
      openModal() {
      }
    }
  }),
}));



describe("HomePage", () => {
  describe("Layout", () => {
    it("has a header", () => {
      const { getByTestId } = render(<HomePage/>);
      expect(getByTestId('homepage')).toBeInTheDocument()
    });
  });
});
