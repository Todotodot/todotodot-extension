import React from "react";
import "@testing-library/jest-dom";
import * as chrome from "sinon-chrome";
import { render, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";

import InitialPage from "../src/components/InitialPage";

test("renders todotodot extension", () => {
  window.chrome = chrome;

  render(
    <Router>
      <InitialPage />
    </Router>
  );

  const todoButton = screen.getByText("Todo");

  expect(todoButton).toBeInTheDocument();
});
