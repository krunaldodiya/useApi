import { Model, Attr } from "dataorm";
import User from "./User";

class Post extends Model {
  public entity = "posts";

  public fields = {
    id: Attr.id({ autoincrement: true }),
    name: Attr.string({ default: "", nullable: true }),
    user_id: Attr.id(),
  };

  public user() {
    return this.belongsTo(User);
  }
}

export default Post;
