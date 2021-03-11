import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { CreateRecipe } from "../../pages/CreateRecipe";

jest.mock("../../lang/ActiveLanguage", () => ({
  activeLanguage: {
    createRecipe: "Create recipe",
  },
}));

describe("CreateRecipePage", () => {
  describe("Layout", () => {
    it("has header of Household", () => {
      const { container } = render(<CreateRecipe />);
      const div = container.querySelector("div");
      expect(div).toHaveTextContent("Create recipe");
    });
  });
});
