const datamapper = (storedata: any, dataprop: any) => {
  return storedata[dataprop["ref"]][dataprop["id"]];
};

const reducer = (reducerdata: any, mapperdata: any, storedata: any) => {
  let obj: any = {};

  Object.keys(reducerdata).forEach(key => {
    if (mapperdata[key] instanceof Array) {
      const mappedData = mapperdata[key].map((item: any) => {
        const metadata = mapper(item, storedata);

        return metadata.hasOwnProperty("ref")
          ? { ...metadata, ...datamapper(storedata, metadata) }
          : metadata;
      });
      obj[key] = mappedData;
    } else if (mapperdata[key] instanceof Object) {
      const mappedData = mapper(mapperdata[key], storedata);
      obj[key] = mappedData.hasOwnProperty("ref")
        ? { ...mappedData, ...datamapper(storedata, mappedData) }
        : mappedData;
    } else {
      obj[key] = mapperdata[key];
    }
  });

  return obj;
};

export const mapper = (mapperdata: any, storedata: any) => {
  if (mapperdata instanceof Array) {
    return mapperdata.map(item => reducer(item, mapperdata, storedata));
  }

  if (mapperdata instanceof Object) {
    return reducer(mapperdata, mapperdata, storedata);
  }

  return mapperdata;
};
