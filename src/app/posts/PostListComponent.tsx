"use client";

import { IPost } from "@/types";
import { useEffect, useState } from "react";

const PostListComponent = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchAllPosts();
  }, []);
  const fetchAllPosts = async () => {
    const response = await fetch("http://localhost:3000/api/posts");
    const data = await response.json();
    //   console.log(data);
    setPosts(data.data);
  };
  return (
    <div>
      <h1>Post List Component</h1>

      {posts.map((post: IPost) => {
        return (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        );
      })}
    </div>
  );
};

export default PostListComponent;
