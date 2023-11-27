"use client";
import { IPost } from "@/types";
import {
  Box,
  Button,
  Chip,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
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
    const fetchPost = async () => {
      const response = await fetch(`/api/posts/${params.postId}`);
      const data = await response.json();
      setPost(data.data);
    };
    fetchPost();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (post.title && post.content) {
      try {
        const res = await fetch(`/api/posts/${params.postId}`, {
          method: "PUT",
          body: JSON.stringify(delete post.id && delete post.category && post),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.ok) {
          console.log(res);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  return (
    <Stack maxWidth={1200} mx="auto">
      <Typography variant="h3">Post Single Page {params.postId}</Typography>
      <Typography variant="h4">{post.title}</Typography>
      <Box>
        {post.categoryId !== null && post.category && (
          <Chip label={post.category.name} />
        )}
      </Box>
      <Typography>{post.content}</Typography>
      <Stack
        component="form"
        gap={3}
        maxWidth={700}
        mx={2}
        onSubmit={(e) => handleSubmit(e)}
      >
        <TextField
          label="Titre"
          name="title"
          onChange={(e) => handleChange(e)}
        />
        <TextField
          label="Contenu"
          multiline
          rows={4}
          name="content"
          onChange={(e) => handleChange(e)}
        />
        <Button variant="contained" color="primary" type="submit">
          Enregistrer
        </Button>
      </Stack>
    </Stack>
  );
};

export default PostSinglePage;
