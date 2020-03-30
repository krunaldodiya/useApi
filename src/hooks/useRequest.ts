import axios from "axios";
import { useContext, useState } from "react";
import { PayloadType } from "../payload";
import { AppContext } from "../Provider";

type methodType = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type metaType = {
  url: string;
  method?: methodType;
  variables?: object;
  headers?: object;
  payload: PayloadType;
};

export function useRequest({
  url,
  method = "GET",
  variables = {},
  headers,
  payload
}: metaType) {
  const appContext: any = useContext(AppContext);

  const meta: any = {
    url,
    method,
    headers
  };

  meta[method === "GET" ? "params" : "data"] = variables;

  const metaQuery = JSON.stringify({ url, method, variables });

  const [loading, setLoading] = useState(false);

  async function fetchData() {
    setLoading(true);

    const response = await axios(meta);

    appContext.writeRequest(metaQuery, response.data, method, payload);

    setLoading(false);
  }

  const requestData = appContext.root[method === "GET" ? "query" : "mutation"];

  return {
    fetchData,
    loading,
    results:
      requestData && requestData.hasOwnProperty(metaQuery)
        ? requestData[metaQuery]
        : undefined
  };
}
