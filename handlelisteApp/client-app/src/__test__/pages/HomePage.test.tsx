import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { HomePage } from "../../pages/HomePage";
import English from "../../lang/en";
import {MockLanguage} from "../MockLanguage";



jest.mock("../../stores/store", () => ({
  useStore: () => ({
    userStore: {
      user: {
        id: 1,
        username: "bob",
        age: "12"
      },
      isLoggedIn () {
        return !! this.user
      }
    },
    modalStore: {
      openModal() {
      }
    },
    settingStore: {
      language: {...MockLanguage}
    },
  }),
}));

jest.mock("../../index.tsx", () => ({
}));



describe("HomePage", () => {
  describe("Layout", () => {
    it("has a header", () => {
      const { getByTestId } = render(<HomePage/>);
      expect(getByTestId('homepage')).toBeInTheDocument()
    });
  });
});
