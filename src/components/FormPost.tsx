"use client";
import { IPost } from "@/types";
import {
  Button,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";

const FormPost = () => {
  const [post, setPost] = useState<IPost>({} as IPost);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchAllCategories = async () => {
      const response = await fetch("/api/categories");
      const data = await response.json();
      setCategories(data.data);
    };
    fetchAllCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (post.title && post.content && post.categoryId) {
      try {
        const res = await fetch("/api/posts", {
          method: "POST",
          body: JSON.stringify({
            ...post,
            categoryId: +post.categoryId,
          }),
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
      <Select
        native
        label="Catégorie"
        name="categoryId"
        onChange={(e) => handleChange(e as any)}
      >
        <option value="">Aucune catégorie</option>
        {categories.map((category: any) => (
          <option value={category.id}>{category.name}</option>
        ))}
      </Select>
      <Button variant="contained" color="primary" type="submit">
        Enregistrer
      </Button>
    </Stack>
  );
};

export default FormPost;
