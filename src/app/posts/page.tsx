import { IPost } from "@/types";
import PostListComponent from "./PostListComponent";

const fetchAllPosts = async () => {
  const response = await fetch("http://localhost:3000/api/posts");
  const data = await response.json();
  //   console.log(data);
  return data.data;
};

const PostsListPage = async () => {
  const posts = await fetchAllPosts();

  return (
    <>
      <h1>Posts List</h1>

      {posts.map((post: IPost) => {
        return (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        );
      })}

      <h2>Posts List Hybride</h2>
      <PostListComponent />
    </>
  );
};

export default PostsListPage;
