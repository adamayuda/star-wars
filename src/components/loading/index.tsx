import "src/components/loading/style.sass";

import React, { FC } from "react";

import logoSquare from "src/assets/svg/logo.svg";

export const Loading: FC = () => {
  return (
    <div className="loading">
      <img src={logoSquare} alt="LinkedTeam" />
    </div>
  );
};
