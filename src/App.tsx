import React, { useContext } from "react";
import { useRequest } from "./hooks/useRequest";
import { attr, ref } from "./hooks/payload";
import { AppContext } from "./hooks/Provider";

function App() {
  const appContext: any = useContext(AppContext);

  const { fetchData: fetchPosts, results: posts } = useRequest({
    appContext,
    url: "https://jsonplaceholder.typicode.com/posts",
    payload: attr("array", attr("reference", { type: "many", ref: "posts" }))
  });

  const { fetchData: fetchPostById, results: postmain } = useRequest({
    appContext,
    url: "https://jsonplaceholder.typicode.com/posts/1",
    payload: attr("object", attr("reference", { type: "one", ref: "posts" }))
  });

  const postmainref = ref(postmain, appContext);

  return (
    <div>
      <button onClick={fetchPosts}>fetch posts</button>

      <button onClick={fetchPostById}>fetch post by id</button>

      <div>
        <div
          style={{
            margin: 5,
            padding: 5,
            border: "1px solid green"
          }}
        >
          <div key={postmainref?.id}>{postmainref?.title}</div>
        </div>

        <div
          style={{
            margin: 5,
            padding: 5,
            border: "1px solid green"
          }}
        >
          {posts?.map((post: any) => {
            const postref = ref(post, appContext);

            return (
              <div key={post.id}>
                <div key={post.id}>{postref.title}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
