import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { NoMatch } from "../../pages/NoMatch";
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

describe("NoMatch", () => {
  describe("Layout", () => {
    it("has header of NoMatch", () => {
      const { container } = render(<NoMatch />);
      const div = container.querySelector("div");
      expect(div).toHaveTextContent("No match");
    });
  });
});
