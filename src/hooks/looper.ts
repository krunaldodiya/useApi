export const looper: any = (loopdata: any) => {
  let loop: any;

  const mapper: any = (mapdata: any) => {
    if (mapdata.hasOwnProperty("ref")) {
      const filteredData = Object.keys(mapdata).reduce((carry, item) => {
        if (mapdata[item] instanceof Array || mapdata[item] instanceof Object) {
          return carry;
        }
        return { ...carry, [item]: mapdata[item] };
      }, {});

      loop[mapdata["ref"]] = { ...loop[mapdata["ref"]] };

      loop[mapdata["ref"]][mapdata["id"]] = {
        ...loop[mapdata["ref"]][mapdata["id"]],
        ...filteredData
      };
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
