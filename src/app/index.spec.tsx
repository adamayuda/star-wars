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
  beforeEach(() => {
    global.fetch.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolve({
            json: () =>
              new Promise((resolve) =>
                resolve({
                  picture: "Post litle",
                  username: "Post Boby",
                }),
              ),
          });
        }),
    );
    mainStore = createMainStore();
  });

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

  test("Render App page with laptop device", async () => {
    mainStore.dispatch({
      type: "UPDATE_DEVICE_TYPE",
      payload: { type: "laptop" },
    });

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
