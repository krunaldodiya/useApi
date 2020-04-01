import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { OrmProvider } from "./orm/context/OrmProvider";
import { models } from "./models";

const App = lazy(() => import("./App"));

ReactDOM.render(
  <React.StrictMode>
    <OrmProvider models={models}>
      <Suspense fallback={null}>
        <App />
      </Suspense>
    </OrmProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
