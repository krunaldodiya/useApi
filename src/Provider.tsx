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

  const generateObject: any = (ref: any, result: any) => {
    const obj: any = models[ref];

    const keys = Object.keys(obj);

    return keys.reduce(
      (carry, item) => {
        if (!result.hasOwnProperty(item)) return carry;

        return {
          ...carry,
          [item]:
            obj[item]["attr"] === "reference"
              ? generateRefObject(obj[item]["meta"], result[item])
              : result[item]
        };
      },
      { ref }
    );
  };

  const generateRefObject: any = (meta: any, data: any) => {
    const ref = meta["ref"];

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
      return generateRefObject(meta, data);
    }

    if (attr === "custom") {
      const keys = Object.keys(meta);

      const tk = keys.reduce((carry, item) => {
        const payload = meta[item];

        if (payload["attr"] === "reference") {
          const object = generateRefObject(payload["meta"], data[item]);

          return { ...carry, [item]: object };
        }

        return { ...carry, [item]: data[item] };
      }, {});

      return tk;
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

    console.log(requestData, "requestData");

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
