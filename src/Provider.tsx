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

  const getRequestData = (data: any, { type, payload }: any) => {
    if (type === "reference") {
      return data;
    }

    if (type === "custom") {
      return data;
    }

    return data;
  };

  const writeRequest = (
    metaQuery: string,
    data: object,
    method: string,
    action: any
  ) => {
    const rootData = { ...root };

    const queryable = method === "GET" ? "query" : "mutation";
    rootData[queryable] = {
      ...rootData[queryable],
      [metaQuery]: getRequestData(data, action)
    };

    setRoot(rootData);

    writeData(rootData, data, action);
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
    console.log(models);
    console.log(payload);

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
