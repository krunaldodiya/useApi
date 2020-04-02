import { Database } from "./Database";
import { useContext } from "react";
import { OrmContext } from "./context/OrmProvider";

export function useDatabase() {
  const store = useContext(OrmContext);

  const db = new Database();

  Object.defineProperty(db, "store", {
    value: store
  });

  return db.getInstance();
}
