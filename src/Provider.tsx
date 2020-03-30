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

  const generateObject = (ref: any, result: any) => {
    const obj = models[ref];
    const keys = Object.keys(obj);

    return keys.reduce(
      (carry, item) => {
        if (!result.hasOwnProperty(item)) return carry;

        return { ...carry, [item]: result[item] };
      },
      { ref }
    );
  };

  const generateRefObject = (ref: any, data: any, meta: any) => {
    if (meta["type"] === "one") {
      return generateObject(ref, data);
    }

    if (meta["type"] === "many") {
      return data.map((result: any) => {
        return generateObject(ref, result);
      });
    }

    return data;
  };

  const getRequestData = (data: any, { attr, meta }: any) => {
    if (attr === "reference") {
      const ref = meta["ref"];
      return generateRefObject(ref, data, meta);
    }

    if (attr === "custom") {
      // const ref = meta["ref"];
      // const obj = models[ref];

      const keys = Object.keys(meta);

      const tk = keys.reduce((carry, item) => {
        const metaItem = meta[item];

        if (metaItem["attr"] !== "reference") return metaItem;

        return { ...carry, [item]: metaItem };
      }, {});

      console.log(tk, "hello");

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
    const rootData = Object.assign(root);

    const queryable = method === "GET" ? "query" : "mutation";

    const requestData = getRequestData(data, payload);

    // console.log(requestData, "requestData");

    rootData[queryable] = { ...rootData[queryable], [metaQuery]: requestData };

    setRoot(rootData);
  };

  const writeData = (rootData: any, data: any, payload: any) => {};

  return (
    <AppContext.Provider value={{ root, writeRequest, writeData }}>
      {children}
    </AppContext.Provider>
  );
};
