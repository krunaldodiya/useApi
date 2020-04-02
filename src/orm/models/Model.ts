import { Database } from "../Database";

export default class Model extends Database {
  store: any;

  all() {
    return this.store.context;
  }

  delete() {
    delete this.store.context["name"];

    return this.store.setContext({});
  }

  add() {
    return this.store.setContext({ name: "john" });
  }

  change() {
    return this.store.setContext({ name: "max" });
  }
}
