import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { CreateRecipe } from "../../pages/CreateRecipe";
import English from "../../lang/en";
import {MockLanguage} from "../MockLanguage";




//Mock the store returned from the useStore hook. In this case only null is returned.
jest.mock("../../stores/store", () => ({
  useStore: () => ({
    settingStore: {
      language: {...MockLanguage}
    }
  }),
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
