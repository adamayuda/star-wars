import "./style.sass";

import React, { FC, Suspense, lazy } from "react";

import { Route, RouteProps, Switch } from "react-router-dom";

import { Loading } from "src/components/loading";

/* eslint-disable  @typescript-eslint/no-explicit-any */
interface RouteInterface extends RouteProps {
  import: Promise<any>;
}

const routes: RouteInterface[] = [
  {
    import: import("src/pages/home"),
    path: "/",
    exact: true,
  },
  {
    import: import("src/pages/login"),
    path: "/login",
    exact: true,
  },
];

export const App: FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        {routes.map((route, index: number) => (
          <Route
            {...route}
            key={`route-${index}`}
            component={lazy(() => route.import)}
          />
        ))}
      </Switch>
    </Suspense>
  );
};
