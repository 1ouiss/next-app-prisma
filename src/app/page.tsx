"use client";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/posts");
  }, []);
  return <main></main>;
}
