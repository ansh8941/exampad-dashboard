"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Container, Typography, Breadcrumbs, Link } from "@mui/material";
import PostEditForm from "../PostEditForm";
import { toast } from "react-toastify";
import { useCreatePostMutation } from "@/redux/features/blog/api";
import { CreatePostRequest } from "@/redux/features/blog/types";
import { QueryErrorTypes } from "@/types/globalInterface";

const CreatePost = () => {
  const router = useRouter();

  const [createPost, { isSuccess, isError, isLoading, error }] = useCreatePostMutation();
  const QueryError = error as QueryErrorTypes;

  useEffect(() => {
    if (isSuccess) {
      toast.success("Post created successfully");
      router.push("/blog/posts");
    }

    if (isError) {
      console.log(QueryError);

      toast.error(QueryError?.message, {
        position: "top-right",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const handleSavePost = async ({ title, content }: CreatePostRequest) => {
    await createPost({ title, content });
  };

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/">
      MUI
    </Link>,
    <Link underline="hover" key="2" color="inherit" href="/material-ui/getting-started/installation/">
      Core
    </Link>,
    <Typography key="3" color="text.primary">
      Breadcrumb
    </Typography>,
  ];

  return (
    <Box>
      <Container maxWidth={false}>
        <Box sx={{ marginBottom: "40px" }}>
          <Box>
            <Box>
              <Typography variant="h4" component="div" gutterBottom>
                Create a new post
              </Typography>
              <Breadcrumbs separator="›" aria-label="breadcrumb">
                {breadcrumbs}
              </Breadcrumbs>
            </Box>
          </Box>
        </Box>
        <PostEditForm handleSavePost={handleSavePost} />
      </Container>
    </Box>
  );
};

export default CreatePost;
