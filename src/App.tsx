import React from "react";
import { useRequest } from "./hooks/useRequest";
import { attr } from "./payload";

function App() {
  const { fetchData: fetchPosts, results: posts } = useRequest({
    url: "https://jsonplaceholder.typicode.com/posts",
    payload: attr("reference", { type: "many", ref: "posts" })
  });

  const { fetchData: fetchPostById, results: post } = useRequest({
    url: "https://jsonplaceholder.typicode.com/posts/1",
    payload: attr("reference", { type: "one", ref: "posts" })
  });

  const { fetchData: fetchDemoPosts } = useRequest({
    url: "https://learning.shendre.com/api/test",
    payload: attr("custom", {
      users: attr("reference", { type: "many", ref: "users" })
    })
  });

  return (
    <div>
      <button onClick={fetchPosts}>fetch posts</button>

      <button onClick={fetchPostById}>fetch post by id</button>

      <button onClick={fetchDemoPosts}>fetch demo post</button>

      <div>
        <div
          style={{
            margin: 5,
            padding: 5,
            border: "1px solid green"
          }}
        >
          <div key={post?.id}>{post?.title}</div>
        </div>

        <div
          style={{
            margin: 5,
            padding: 5,
            border: "1px solid green"
          }}
        >
          {posts?.map((post: any) => {
            return <div key={post.id}>{post.title}</div>;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
