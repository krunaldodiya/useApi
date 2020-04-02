import React, { createContext, useState, useEffect } from "react";

const initialContext = {};

export const OrmContext = createContext(initialContext);

export const OrmProvider = ({
  children,
  database
}: {
  children: any;
  database: any;
}) => {
  const [context, setContext] = useState(initialContext);

  useEffect(() => {
    Object.defineProperty(database, "store", {
      value: { context, setContext }
    });
  }, [database, context]);

  return (
    <OrmContext.Provider value={{ context, setContext }}>
      {children}
    </OrmContext.Provider>
  );
};
