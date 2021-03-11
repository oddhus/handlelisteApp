import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Settings } from "../../pages/Settings";

jest.mock("../../lang/ActiveLanguage", () => ({
  activeLanguage: {
    settings: "Settings",
    activeLanguage: "Active Language",
  },
}));

jest.mock("../../stores/store", () => ({
  useStore: () => ({
    userStore: {
      setLanguage: () => null,
    },
  }),
}));

describe("SettingPage", () => {
  describe("Layout", () => {
    it("has header of Settings", () => {
      const { container } = render(<Settings />);
      const div = container.querySelector("div");
      expect(div).toHaveTextContent("Settings");
    });
  });
});
