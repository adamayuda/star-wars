import { cleanup, render, screen, waitFor } from "@testing-library/react";

import { Home } from ".";
import { Provider } from "react-redux";
import React from "react";

import { BrowserRouter as Router } from "react-router-dom";
import { createMainStore } from "src/redux";

let mainStore = createMainStore();

describe("src/pages/home/index.tsx", () => {
  afterEach(() => cleanup());
  beforeEach(() => {
    mainStore = createMainStore();
  });

  test("Render Home page", async () => {
    const renderedHome = render(
      <Provider store={mainStore}>
        <Router>
          <Home />
        </Router>
      </Provider>,
    );

    expect(renderedHome.container).toMatchSnapshot();
  });
});
