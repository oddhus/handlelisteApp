import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Recipe } from "../../pages/Recipe";

jest.mock("../../lang/ActiveLanguage", () => ({
  activeLanguage: {
    recipe: "Recipe",
  },
}));

describe("RecipePage", () => {
  describe("Layout", () => {
    it("has header of Recipe", () => {
      const { container } = render(<Recipe />);
      const div = container.querySelector("div");
      expect(div).toHaveTextContent("Recipe");
    });
  });
});
