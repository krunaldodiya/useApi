import { ModelType, attr } from "./hooks/payload";

export const models: ModelType = {
  users: {
    id: attr("string"),
    name: attr("string"),
    posts: attr("reference", { type: "many", ref: "posts" })
  },

  posts: {
    id: attr("string"),
    title: attr("string"),
    body: attr("string"),
    user_id: attr("string"),
    owner: attr("reference", { type: "one", ref: "users" }),
    comments: attr("reference", { type: "many", ref: "comments" })
  },

  comments: {
    id: attr("string"),
    comment: attr("string"),
    post_id: attr("string"),
    post: attr("reference", { type: "one", ref: "posts" })
  }
};
