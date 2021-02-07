import "src/pages/home/style.sass";
import React, { FC, useEffect, useState } from "react";
import { swapiPlanet, swapiPlanetSearch } from "src/types/swapi";
import { BASE_API_URL } from "src/config";
import { Planet } from "src/components/planet";
import { Redirect } from "react-router-dom";
import { StateInterface } from "src/redux";
import axios from "axios";
import { useSelector } from "react-redux";

const Home: FC = () => {
  const state = useSelector<StateInterface, StateInterface>((state) => state);

  const [planets, setPlanets] = useState<swapiPlanet[]>([]);
  const [totalPopulation, setTotalPopulation] = useState<number>(0);

  const fetchPlanetsPerPage = async ({
    search,
    page,
    totalPages,
    planetsPerPage,
  }: {
    search: string;
    page: number;
    totalPages: number;
    planetsPerPage: swapiPlanet[];
  }): Promise<swapiPlanet[]> => {
    if (page > totalPages) return planetsPerPage;

    const {
      data: swapiPlanetSearchResult,
    } = await axios.get<swapiPlanetSearch>(
      `${BASE_API_URL}/planets?search=${search}&page=${page}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const { results } = swapiPlanetSearchResult;

    const newPlanetsPerPage = await fetchPlanetsPerPage({
      search,
      page: page + 1,
      totalPages,
      planetsPerPage: results,
    });
    return [...planetsPerPage, ...newPlanetsPerPage];
  };

  const searchPlanets = async (search: string) => {
    try {
      const {
        data: swapiPlanetSearchResult,
      } = await axios.get<swapiPlanetSearch>(
        `${BASE_API_URL}/planets?search=${search}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      let { results: planetsPerPage } = swapiPlanetSearchResult;
      const { count } = swapiPlanetSearchResult;
      const totalPages = Math.ceil(count / 10);

      if (totalPages > 1) {
        planetsPerPage = await fetchPlanetsPerPage({
          search,
          page: 2,
          totalPages,
          planetsPerPage,
        });
      }

      let totalPopulationIncrements = 0;
      planetsPerPage.forEach((planet) => {
        if (planet.population && planet.population !== "unknown") {
          totalPopulationIncrements += Number(planet.population);
        }
      });
      setTotalPopulation(totalPopulationIncrements);
      setPlanets(planetsPerPage);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    searchPlanets("");
  }, []);

  if (!state.user.isLoggedIn) return <Redirect to="/login" />;

  return (
    <>
      <div className="home">
        <div className="container">
          <input
            type="text"
            id="search"
            placeholder="Search"
            onChange={(e) => searchPlanets(e.target.value)}
          />
          <div className="planets">
            <h2>
              Total planets found: {planets.length}
              <br />
              Total population: {totalPopulation}
            </h2>
            {planets.map((planet, index) => (
              <Planet
                key={`planet-${index}`}
                planet={planet}
                totalPopulation={totalPopulation}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
