import "src/components/planet/style.sass";
import React, { FC, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { swapiPlanet } from "src/types/swapi";

interface IPlanetProps {
  planet: swapiPlanet;
  totalPopulation: number;
}

export const Planet: FC<IPlanetProps> = ({ planet, totalPopulation }) => {
  const [population, setPopulation] = useState(0);
  useEffect(() => {
    if (planet.population && planet.population !== "unknown") {
      setPopulation((Number(planet.population) * 100) / totalPopulation);
    } else setPopulation(0);
    console.log("planet", planet);
    console.log("totalPopulation", totalPopulation);
  });

  return (
    <>
      {!!totalPopulation && (
        <div className="planet">
          <h2>{planet.name}</h2>
          <div
            className="bar"
            style={{
              width: `${population}%`,
            }}
          ></div>
          <p>{population.toFixed(3)}% of the total population</p>
        </div>
      )}
    </>
  );
};

Planet.propTypes = {
  planet: PropTypes.any,
  totalPopulation: PropTypes.any,
};
