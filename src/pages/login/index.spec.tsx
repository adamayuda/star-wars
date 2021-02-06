import { cleanup, render, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import { shallow, mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Login from ".";
import { Provider, useDispatch } from "react-redux";
import React from "react";

import { BrowserRouter as Router, RouteComponentProps } from "react-router-dom";
import { createMainStore } from "src/redux";

let mainStore = createMainStore();
configure({ adapter: new Adapter() });

// const useDispatchMock = jest.fn();
// jest.mock("react-redux", () => {
//   useDispatch: useDispatchMock;
// });

describe("src/pages/home/index.tsx", () => {
  afterEach(() => cleanup());
  beforeEach(() => {
    mainStore = createMainStore();
    axios.get = jest.fn().mockResolvedValue({
      data: {
        count: 1,
        results: [
          {
            name: "Luke Skywalker",
            height: "172",
            mass: "77",
            hair_color: "blond",
            skin_color: "fair",
            eye_color: "blue",
            birth_year: "19BBY",
            gender: "male",
            homeworld: "http://swapi.dev/api/planets/1/",
            films: [
              "http://swapi.dev/api/films/1/",
              "http://swapi.dev/api/films/2/",
              "http://swapi.dev/api/films/3/",
              "http://swapi.dev/api/films/6/",
            ],
            species: [],
            vehicles: [
              "http://swapi.dev/api/vehicles/14/",
              "http://swapi.dev/api/vehicles/30/",
            ],
            starships: [
              "http://swapi.dev/api/starships/12/",
              "http://swapi.dev/api/starships/22/",
            ],
            created: "2014-12-09T13:50:51.644000Z",
            edited: "2014-12-20T21:17:56.891000Z",
            url: "http://swapi.dev/api/people/1/",
          },
        ],
      },
    });
  });

  test("Render Login page", async () => {
    const routeComponentPropsMock = {
      history: {} as any,
      location: {} as any,
      match: {} as any,
    };
    const renderedLogin = render(
      <Provider store={mainStore}>
        <Router>
          <Login {...routeComponentPropsMock} />
        </Router>
      </Provider>,
    );

    expect(renderedLogin.container).toMatchSnapshot();
  });

  it("should add an item based on the value in the state", async () => {
    const routeComponentPropsMock = {
      history: {} as any,
      location: {} as any,
      match: {} as any,
    };
    // useDispatchMock = jest.fn(() => {
    //   return {};
    // });
    const component = render(
      <Provider store={mainStore}>
        <Login {...routeComponentPropsMock} />
      </Provider>,
    );

    const nameInput = await component.findByTestId("name-input");
    fireEvent.change(nameInput, { target: { value: "Luke Skywalker" } });

    const passwordInput = await component.findByTestId("password-input");
    fireEvent.change(passwordInput, { target: { value: "19BBY" } });

    const loginButton = await component.findByTestId("login-button");
    fireEvent.click(loginButton);

    expect(component).toMatchSnapshot();
  });
});
