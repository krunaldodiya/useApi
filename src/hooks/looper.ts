export const looper: any = (loopdata: any, appContext: any) => {
  let loop: any;

  const mapper: any = (mapdata: any) => {
    if (mapdata.hasOwnProperty("ref")) {
      const model = appContext.root.data[mapdata["ref"]][mapdata["id"]];
      console.log(model);
    }

    const keys = Object.keys(mapdata);

    keys.forEach(key => {
      if (mapdata[key] instanceof Object) {
        mapper(mapdata[key]);
      }

      if (mapdata[key] instanceof Array) {
        mapdata[key].forEach((item: any) => mapper(item));
      }
    });
  };

  mapper(loopdata);

  return loop;
};
