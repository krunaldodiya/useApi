export default class Model {
  table: any;
  getData: any;
  setData: any;
  getCollection: any;

  get data() {
    return this.getData();
  }

  get collection() {
    const data = this.getData();
    return data[this.table];
  }

  all() {
    console.log(this.collection, "collection");

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

  delete(id: any) {
    const items = this.collection.filter((item: any) => item.id !== id);

    this.setData({ [this.table]: items });
  }
}
