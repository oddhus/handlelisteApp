import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Recipes } from "../../pages/Recipes";
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

describe("RecipesPage", () => {
  describe("Layout", () => {
    it("has header of Recipes", () => {
      const { container } = render(<Recipes />);
      const div = container.querySelector("div");
      expect(div).toHaveTextContent("Recipes");
    });
  });
});
