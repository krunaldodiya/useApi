import React, { createContext, useState } from "react";
import { ModelType } from "./payload";

const persistedInitialData = localStorage.getItem("root");
const initialContext = {
  query: {},
  mutation: {},
  data: {}
};

const initialData: any = persistedInitialData
  ? JSON.parse(persistedInitialData)
  : initialContext;

export const AppContext = createContext(initialData);

export const AppProvider = ({
  children,
  models
}: {
  children: any;
  models: ModelType;
}) => {
  const [root, setRoot] = useState(initialData);

  function counter(models: ModelType, meta: any, result: any) {
    const obj = models[meta["ref"]];
    const keys = Object.keys(obj);

    return keys.reduce((carry, item) => {
      if (!result.hasOwnProperty(item)) return carry;
      return { ...carry, [item]: result[item], ref: meta["ref"] };
    }, {});
  }

  const getRequestData = (rootData: any, data: any, { attr, meta }: any) => {
    if (attr === "reference") {
      if (meta["type"] === "one") {
        const one = counter(models, meta, data);
        console.log(one);

        return one;
      }

      if (meta["type"] === "many") {
        const many = data.map((result: any) => {
          return counter(models, meta, result);
        });

        console.log(many);
        return many;
      }

      return data;
    }

    if (attr === "custom") {
      return data;
    }

    return data;
  };

  const writeRequest = (
    metaQuery: string,
    data: object,
    method: string,
    payload: any
  ) => {
    const rootData = { ...root };

    const queryable = method === "GET" ? "query" : "mutation";
    rootData[queryable] = {
      ...rootData[queryable],
      [metaQuery]: getRequestData(rootData, data, payload)
    };

    setRoot(rootData);

    writeData(rootData, data, payload);
  };

  // const process = (data: any) => {
  //   const dataId = JSON.stringify("Post:" + data.id);

  //   const rootData = {
  //     ...root,
  //     data: { ...root.data, [dataId]: data }
  //   };

  //   setRoot(rootData);

  //   localStorage.setItem("root", JSON.stringify(rootData));
  // };

  const writeData = (rootData: any, data: any, payload: any) => {
    // if (data instanceof Array) {
    //   data.forEach((data: any) => {
    //     process(data);
    //   });
    // } else {
    //   process(data);
    // }
  };

  return (
    <AppContext.Provider value={{ root, writeRequest, writeData }}>
      {children}
    </AppContext.Provider>
  );
};
