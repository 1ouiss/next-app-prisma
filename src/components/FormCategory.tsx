"use client";

import { ICategory } from "@/types";
import { Button, Stack, TextField } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";

const FormCategory = () => {
  const [category, setCategory] = useState<ICategory>({} as ICategory);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (category.name) {
      try {
        const res = await fetch("/api/categories", {
          method: "POST",
          body: JSON.stringify(category),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.ok) {
          enqueueSnackbar("Category créé avec succès", { variant: "success" });
          setCategory({} as ICategory);
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
      <TextField label="Titre" name="name" onChange={(e) => handleChange(e)} />
      <Button variant="contained" color="primary" type="submit">
        Enregistrer
      </Button>
    </Stack>
  );
};

export default FormCategory;
