import React, { useContext } from "react";
import { OrmContext } from "./orm/context/OrmProvider";
import { Test } from "./models/Test";

function App() {
  const data: any = useContext(OrmContext);

  const tm = new Test();

  console.log(tm, "tm");

  Object.defineProperty(tm, "store", { value: data });

  const meta = tm.all();

  return (
    <div>
      <button onClick={() => tm.add()}>add</button>
      <button onClick={() => tm.change()}>change</button>
      <button onClick={() => tm.delete()}>remove</button>

      <pre>{JSON.stringify(meta)}</pre>
    </div>
  );
}

export default App;
