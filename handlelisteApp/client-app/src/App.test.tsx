import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders no match", () => {
  render(<App />);
  const linkElement = screen.getByText(/No match/);
  expect(linkElement).toBeInTheDocument();
});
