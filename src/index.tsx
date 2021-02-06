import { App } from "src/app";
import { Provider } from "react-redux";

import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router } from "react-router-dom";

import { mainStore } from "src/redux";

ReactDOM.render(
  <Provider store={mainStore}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root"),
);
