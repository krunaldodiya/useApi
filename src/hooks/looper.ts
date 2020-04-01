const datamapper = (data: any, dataprop: any) => {
  return data[dataprop["ref"]][dataprop["id"]];
};

const reducer = (reducerdata: any, mapperdata: any) => {
  let obj: any = {};

  Object.keys(reducerdata).forEach(key => {
    if (mapperdata[key] instanceof Array) {
      const mappedData = mapperdata[key].map((item: any) => {
        const metadata = mapper(item);

        return metadata.hasOwnProperty("ref")
          ? { ...metadata, ...datamapper({}, metadata) }
          : metadata;
      });
      obj[key] = mappedData;
    } else if (mapperdata[key] instanceof Object) {
      const mappedData = mapper(mapperdata[key]);
      obj[key] = mappedData.hasOwnProperty("ref")
        ? { ...mappedData, ...datamapper({}, mappedData) }
        : mappedData;
    } else {
      obj[key] = mapperdata[key];
    }
  });

  return obj;
};

export const mapper = (mapperdata: any) => {
  if (mapperdata instanceof Array) {
    return mapperdata.map(item => reducer(item, mapperdata));
  }

  if (mapperdata instanceof Object) {
    return reducer(mapperdata, mapperdata);
  }

  return mapperdata;
};
