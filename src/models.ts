import { ModelType, attr } from "./payload";

export const models: ModelType = {
  users: {
    id: attr("string"),
    name: attr("string"),
    posts: attr("reference", { type: "many", ref: "posts" })
  },

  posts: {
    id: attr("string"),
    name: attr("string"),
    owner: attr("reference", { type: "one", ref: "users" })
  }
};
