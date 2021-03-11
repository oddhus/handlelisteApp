import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ShoppingLists } from "../../pages/ShoppingLists";

jest.mock("../../stores/store", () => ({
  useStore: () => ({
    shoppingListStore: {
      shoppingLists: [],
      fetchShoppingLists() {},
    },
  }),
}));

jest.mock("../../lang/ActiveLanguage", () => ({
  activeLanguage: {
    shoppingLists: "Shopping Lists",
  },
}));

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    pathname: "history",
  }),
}));

describe("ShoppingListsPage", () => {
  describe("Layout", () => {
    it("contains a table", () => {
      const { container } = render(<ShoppingLists />);
      const div = container.querySelector("table");
      expect(div).toBeVisible;
    });
  });
});
