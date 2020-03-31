import axios from "axios";
import { useState } from "react";
import { PayloadType } from "./payload";
import { looper } from "./looper";

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

  const results = requestExist ? requestData[metaQuery] : undefined;

  return {
    fetchData,
    loading,
    errors,
    results: looper(results, appContext)
  };
}
