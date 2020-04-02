import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Test } from "./models/Test";
import { OrmProvider } from "./orm/context/OrmProvider";
import { Database } from "./orm/Database";

const database = new Database();

database.register(Test);

console.log(database);

ReactDOM.render(
  <React.StrictMode>
    <OrmProvider database={database}>
      <Suspense fallback={null}>
        <App />
      </Suspense>
    </OrmProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
