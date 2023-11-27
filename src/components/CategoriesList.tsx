"use client";
import PostCard from "@/components/PostCard";
import { ICategory, IPost } from "@/types";
import { useEffect, useState } from "react";
import { Typography, Stack, Button } from "@mui/material";
import IconPlus from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";

const CategoriesList = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    fetchAllCategories();
  }, []);
  const fetchAllCategories = async () => {
    const response = await fetch("/api/categories");
    const data = await response.json();
    setCategories(data.data);
  };

  const handleDeleteCategory = async (id: number) => {
    const response = await fetch(`/api/categories/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log(data);
    fetchAllCategories();
  };

  return (
    <>
      <Typography>Mes catégories</Typography>
      <Button
        startIcon={<IconPlus />}
        onClick={() => router.push("/categories/new")}
      >
        Ajouter une nouvelle catégorie
      </Button>

      <Stack direction="row" flexWrap="wrap" mx="auto" maxWidth={1200} gap={2}>
        {categories.length !== 0 ? (
          categories.map((category: ICategory) => {
            return (
              <Stack
                direction="row"
                flexWrap="wrap"
                mx="auto"
                maxWidth={1200}
                gap={2}
              >
                <Typography>{category.name}</Typography>
                <Button
                  color="error"
                  onClick={() =>
                    category.id && handleDeleteCategory(category.id)
                  }
                >
                  Delete
                </Button>
              </Stack>
            );
          })
        ) : (
          <Typography>
            Aucun catégories pour le moment vous pouvez en ajouter une nouvelle
          </Typography>
        )}
      </Stack>
    </>
  );
};

export default CategoriesList;
