import { cleanup, render } from "@testing-library/react";

import { App } from ".";
import { Provider } from "react-redux";
import React from "react";

import { BrowserRouter as Router } from "react-router-dom";
import { createMainStore } from "src/redux";

let mainStore = createMainStore();
global.fetch = jest.fn();

describe("src/app/index.tsx", () => {
  afterEach(() => cleanup());

  test("Render App page", async () => {
    const renderedApp = render(
      <Provider store={mainStore}>
        <Router>
          <App />
        </Router>
      </Provider>,
    );

    expect(renderedApp.container).toMatchSnapshot();
  });
});
