"use client";
import { IPost } from "@/types";
import { Button, Stack, TextField } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";

const FormPost = () => {
  const [post, setPost] = useState<IPost>({} as IPost);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (post.title && post.content) {
      try {
        const res = await fetch("/api/posts", {
          method: "POST",
          body: JSON.stringify(post),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.ok) {
          enqueueSnackbar("Post créé avec succès", { variant: "success" });
          setPost({} as IPost);
        }
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Stack
      component="form"
      gap={3}
      maxWidth={700}
      mx={2}
      onSubmit={(e) => handleSubmit(e)}
    >
      <TextField label="Titre" name="title" onChange={(e) => handleChange(e)} />
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
  );
};

export default FormPost;
