"use client";

import PostCard from "@/components/PostCard";
import { IPost } from "@/types";
import { useEffect, useState } from "react";
import { Typography, Stack, Button } from "@mui/material";
import IconPlus from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";

const PostsList = () => {
  const router = useRouter();
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

  const handleDeletePost = async (id: number) => {
    const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log(data);
    fetchAllPosts();
  };

  return (
    <>
      <Typography>Mon blog</Typography>
      <Button
        startIcon={<IconPlus />}
        onClick={() => router.push("/posts/new")}
      >
        Ajouter un nouveau post
      </Button>

      <Stack direction="row" flexWrap="wrap" mx="auto" maxWidth={1200} gap={2}>
        {posts.length !== 0 ? (
          posts.map((post: IPost) => {
            return (
              <PostCard
                key={post.id}
                post={post}
                handleDelete={handleDeletePost}
              />
            );
          })
        ) : (
          <Typography>Aucun post pour le moment</Typography>
        )}
      </Stack>
    </>
  );
};

export default PostsList;
