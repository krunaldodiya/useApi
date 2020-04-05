import { DB } from "dataorm";

import User from "./models/User";
import Post from "./models/Post";

DB.config({ name: "socialstock", storage: "LocalStorage" })
  .register(User)
  .register(Post)
  .start();
