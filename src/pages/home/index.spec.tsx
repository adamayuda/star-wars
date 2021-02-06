import { cleanup, render, screen, waitFor } from "@testing-library/react";
// import { configure, shallow } from "enzyme";
import axios from "axios";

import Home from ".";
import { Provider } from "react-redux";
import React from "react";

import { BrowserRouter as Router } from "react-router-dom";
import { createMainStore } from "src/redux";

let mainStore = createMainStore();

describe("src/pages/home/index.tsx", () => {
  afterEach(() => cleanup());
  beforeEach(() => {
    mainStore = createMainStore();
    axios.get = jest.fn().mockResolvedValue({
      data: {
        count: 12,
        results: [
          {
            name: "Muunilinst",
            rotation_period: "28",
            orbital_period: "412",
            diameter: "13800",
            climate: "temperate",
            gravity: "1",
            terrain: "plains, forests, hills, mountains",
            surface_water: "25",
            population: "5000000000",
            residents: ["http://swapi.dev/api/people/77/"],
            films: [],
            created: "2014-12-20T17:57:47.420000Z",
            edited: "2014-12-20T20:58:18.519000Z",
            url: "http://swapi.dev/api/planets/57/",
          },
        ],
      },
    });
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

  test("Render Home page", async () => {
    mainStore.dispatch({
      type: "USER_LOGIN",
      payload: {
        isLoggedIn: true,
        name: "Luke",
      },
    });

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
