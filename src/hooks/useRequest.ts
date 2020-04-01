import axios from "axios";
import { useState } from "react";
import { PayloadType } from "./payload";

type methodType = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type metaType = {
  appContext: any;
  url: string;
  method?: methodType;
  variables?: object;
  headers?: object;
  payload: PayloadType;
};

export function useRequest({
  appContext,
  url,
  method = "GET",
  variables = {},
  headers,
  payload
}: metaType) {
  const meta: any = {
    url,
    method,
    headers
  };

  meta[method === "GET" ? "params" : "data"] = variables;

  const metaQuery = JSON.stringify({ url, method, variables });

  const requestData = appContext.root[method === "GET" ? "query" : "mutation"];

  const requestExist = requestData && requestData.hasOwnProperty(metaQuery);

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  async function fetchData() {
    try {
      setLoading(true);
      const response = await axios(meta);
      appContext.writeRequest(metaQuery, response.data, method, payload);
      setLoading(false);
    } catch (error) {
      setErrors(error);
      setLoading(false);
    }
  }

  const datamapper = (dataprop: any) => {
    return appContext.root.data[dataprop["ref"]][dataprop["id"]];
  };

  const reducer = (reducerdata: any) => {
    let obj: any = {};

    Object.keys(reducerdata).forEach(key => {
      if (reducerdata[key] instanceof Array) {
        const mappedData = reducerdata[key].map((item: any) => {
          const metadata = mapper(item);

          return metadata.hasOwnProperty("ref")
            ? { ...metadata, ...datamapper(metadata) }
            : metadata;
        });
        obj[key] = mappedData;
      } else if (reducerdata[key] instanceof Object) {
        const mappedData = mapper(reducerdata[key]);
        obj[key] = mappedData.hasOwnProperty("ref")
          ? { ...mappedData, ...datamapper(mappedData) }
          : mappedData;
      } else {
        obj[key] = reducerdata[key];
      }
    });

    return obj;
  };

  const mapper = (mapperdata: any) => {
    if (mapperdata instanceof Array) {
      return mapperdata.map(item => reducer(item));
    }

    if (mapperdata instanceof Object) {
      return reducer(mapperdata);
    }

    return mapperdata;
  };

  const results = requestExist ? requestData[metaQuery] : undefined;

  console.log(mapper(results));

  return {
    fetchData,
    loading,
    errors,
    results
  };
}
