import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { models } from "./models";
import { AppProvider } from "./hooks/Provider";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <AppProvider models={models}>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
