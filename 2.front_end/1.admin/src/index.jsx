import React from "react";
import ReactDOM from "react-dom/client";
import {Router} from "react-router-dom"
import "antd/dist/antd.css";
import "./index.css";
import AppRouter from "./AppRouter";
import history from "./utils/history.js";

import { Provider} from "react-redux"
import { store } from "./configs/stores.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Router history={history}> 
      <AppRouter />
    </Router>
  </Provider>
);
