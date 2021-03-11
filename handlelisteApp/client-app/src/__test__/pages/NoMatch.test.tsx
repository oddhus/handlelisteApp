import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { NoMatch } from "../../pages/NoMatch";

jest.mock("../../lang/ActiveLanguage", () => ({
  activeLanguage: {
    noMatch: "No match",
  },
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
