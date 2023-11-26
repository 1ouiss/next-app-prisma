"use client";
import { IPost } from "@/types";
import { Chip, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const PostSinglePage = ({
  params,
  searchQuery,
}: {
  params: {
    postId: string;
  };
  searchQuery: {
    q: string;
  };
}) => {
  const [post, setPost] = useState<IPost>({} as IPost);

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    const response = await fetch(
      `http://localhost:3000/api/posts/${params.postId}`
    );
    const data = await response.json();
    setPost(data.data);
  };

  return (
    <Stack maxWidth={1200} mx="auto">
      <Typography variant="h3">Post Single Page {params.postId}</Typography>
      <Typography variant="h4">{post.title}</Typography>
      {post.categoryId !== null && post.category && (
        <Chip label={post.category.name} />
      )}
      <Typography>{post.content}</Typography>
    </Stack>
  );
};

export default PostSinglePage;
