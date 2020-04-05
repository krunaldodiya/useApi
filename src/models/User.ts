import { Model, Attr } from "dataorm";
import Post from "./Post";

class User extends Model {
  public entity = "users";

  public fields = {
    id: Attr.id({ autoincrement: true }),
    name: Attr.string({ default: "", nullable: true }),
    username: Attr.string(),
    password: Attr.string(),
    created_at: Attr.string(),
  };

  public posts() {
    return this.hasMany(Post);
  }
}

export default User;
