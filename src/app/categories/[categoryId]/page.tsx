"use client";
import { ICategory } from "@/types";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const CategorySinglePage = ({
  params,
}: {
  params: {
    categoryId: string;
  };
}) => {
  const [category, setCategory] = useState<ICategory>({} as ICategory);

  useEffect(() => {
    const fetchCategory = async () => {
      const response = await fetch(`/api/categories/${params.categoryId}`);
      const data = await response.json();
      setCategory(data.data);
    };
    fetchCategory();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (category.name) {
      try {
        const res = await fetch(`/api/categories/${params.categoryId}`, {
          method: "PUT",
          body: JSON.stringify(category),
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
    setCategory({ ...category, [name]: value });
  };

  return (
    <Stack maxWidth={1200} mx="auto">
      <Typography variant="h4">{category.name}</Typography>

      <Stack component="form" onSubmit={(e) => handleSubmit(e)} mt={5}>
        <TextField
          label="Titre"
          name="name"
          onChange={(e) => handleChange(e)}
        />
        <Box>
          <Button variant="contained" color="primary" type="submit">
            Enregistrer les modifications
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
};

export default CategorySinglePage;
