export default class Model {
  table: any;
  getData: any;
  setData: any;
  getCollection: any;
  initialContext: any;

  constructor(initialContext: any) {
    this.initialContext = initialContext;
  }

  get collection() {
    const data = this.getData();

    return data[this.table];
  }

  all() {
    return this.collection;
  }

  find(id?: any) {
    if (id) {
      const findById = this.collection.find((item: any) => item.id === id);

      return findById ?? null;
    }

    return this.first();
  }

  first() {
    return this.collection[0] ?? null;
  }

  last() {
    return this.collection.shift();
  }

  create(obj: any) {
    obj["id"] = obj.hasOwnProperty("id")
      ? obj.hasOwnProperty("id")
      : this.collection.length + 1;

    this.setData({ [this.table]: [...this.collection, obj] });
  }

  update(id: any) {
    const items = this.collection.map((item: any) => {
      if (item.id === id) {
        return {
          ...item,
          name: "updated"
        };
      }

      return item;
    });

    this.setData({ [this.table]: items });
  }

  delete(id: any) {
    const items = this.collection.filter((item: any) => item.id !== id);

    this.setData({ [this.table]: items });
  }
}
