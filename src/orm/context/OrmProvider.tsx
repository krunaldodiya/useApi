import React, { createContext, useState, useEffect } from "react";

const initialContext: any = { data: {} };

export const OrmContext = createContext(initialContext);

export const OrmProvider = ({
  children,
  models
}: {
  children: any;
  models: any;
}) => {
  const [context, setContext] = useState(initialContext);

  const setData = (data: any) => {
    initialContext.data = data;
    setContext(initialContext);
  };

  const getData = () => {
    return initialContext.data;
  };

  useEffect(() => {
    models.forEach((model: any) => {
      const instance = new model();

      if (!context.data.hasOwnProperty(instance.table)) {
        Object.defineProperty(initialContext.data, instance.table, {
          value: [],
          writable: true
        });
      }

      instance.getData = getData;
      instance.setData = setData;

      Object.defineProperty(initialContext, model.name, {
        value: instance,
        writable: true
      });
    });
  }, [models, context]);

  return (
    <OrmContext.Provider value={{ context }}>{children}</OrmContext.Provider>
  );
};
