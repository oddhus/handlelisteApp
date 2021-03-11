import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Recipe } from "../../pages/Recipe";
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

describe("RecipePage", () => {
  describe("Layout", () => {
    it("has header of Recipe", () => {
      const { container } = render(<Recipe />);
      const div = container.querySelector("div");
      expect(div).toHaveTextContent("Recipe");
    });
  });
});
