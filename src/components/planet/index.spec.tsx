import { swapiPlanet } from "src/types/swapi";
import { Planet } from ".";
import { render } from "@testing-library/react";
import React from "react";

describe("src/components/loading/index.tsx", () => {
  test("Render Loading component", () => {
    const planet: swapiPlanet = {
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
      created: new Date("2014-12-20T17:57:47.420000Z"),
      edited: new Date("2014-12-20T20:58:18.519000Z"),
      url: "http://swapi.dev/api/planets/57/",
    };
    const renderedLoading = render(
      <Planet planet={planet} totalPopulation={1} />,
    );
    expect(renderedLoading.container).toMatchSnapshot();
  });
});
