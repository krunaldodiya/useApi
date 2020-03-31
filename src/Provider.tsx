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

  const generateObject: any = (ref: any, result: any, compact: boolean) => {
    const obj: any = models[ref];

    const keys = Object.keys(obj);

    return keys.reduce(
      (carry, item) => {
        if (!result.hasOwnProperty(item)) return carry;

        if (
          compact === true &&
          item !== "id" &&
          result[item] instanceof Object === false
        ) {
          return carry;
        }

        let generatedObj = result[item];
        if (obj[item]["attr"] === "reference") {
          generatedObj = generateRefObject(
            obj[item]["meta"],
            result[item],
            compact
          );
        }

        return { ...carry, [item]: generatedObj };
      },
      { ref }
    );
  };

  const generateRefObject: any = (meta: any, data: any, compact: boolean) => {
    const ref = meta["ref"];

    if (meta["type"] === "one") {
      return generateObject(ref, data, compact);
    }

    if (meta["type"] === "many") {
      return data.map((result: any) => {
        return generateObject(ref, result, compact);
      });
    }

    return data;
  };

  const getRequestData = (data: any, { attr, meta }: any, compact: boolean) => {
    if (attr === "reference") {
      return generateRefObject(meta, data, compact);
    }

    if (attr === "object") {
      const keys = Object.keys(meta);

      const tk = keys.reduce((carry, item) => {
        const payload = meta[item];

        if (payload["attr"] === "reference") {
          const object = generateRefObject(
            payload["meta"],
            data[item],
            compact
          );

          return { ...carry, [item]: object };
        }

        return { ...carry, [item]: data[item] };
      }, {});

      return tk;
    }

    return data;
  };

  const mapData: any = (data: any) => {
    const process: any = (item: any) => {
      return item;
    };

    if (data instanceof Array) {
      return data.map(item => process(item));
    } else {
      return process(data);
    }
  };

  const writeRequest = (
    metaQuery: string,
    data: object,
    method: string,
    payload: any
  ) => {
    const rootData = Object.assign(root);

    const generatedPayload =
      payload.hasOwnProperty("meta") && payload.meta.hasOwnProperty("attr")
        ? payload.meta.attr
        : payload;

    const queryable = method === "GET" ? "query" : "mutation";

    // const fullData = getRequestData(data, generatedPayload, false);

    // const mappedData = mapData(fullData);

    // console.log(mappedData, "mappedData");

    const compactData = getRequestData(data, generatedPayload, true);

    console.log(compactData, "compactData");

    rootData[queryable] = {
      ...rootData[queryable],
      [metaQuery]: compactData
    };

    setRoot(rootData);
  };

  const writeData = (rootData: any, data: any, payload: any) => {};

  return (
    <AppContext.Provider value={{ root, writeRequest, writeData }}>
      {children}
    </AppContext.Provider>
  );
};
