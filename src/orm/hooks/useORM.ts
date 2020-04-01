import { useContext } from "react";
import { OrmContext } from "../context/OrmProvider";

function useORM() {
  const { context } = useContext(OrmContext);

  return context;
}

export default useORM;
