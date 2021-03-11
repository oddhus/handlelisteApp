import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { HomePage } from "../../pages/HomePage";

jest.mock("../../lang/ActiveLanguage", () => ({
  activeLanguage: {
    homePage: "HomePage",
  },
}));

describe("HomePage", () => {
  describe("Layout", () => {
    it("has header of HomePage", () => {
      const { container } = render(<HomePage />);
      const div = container.querySelector("div");
      expect(div).toHaveTextContent("HomePage");
    });
  });
});
