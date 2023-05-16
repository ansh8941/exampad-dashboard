"use client";
import { Box, Container, Typography, Breadcrumbs, Link } from "@mui/material";
import PostEditForm from "../PostEditForm";

const CreatePost = () => {
  const handleSavePost = async () => {
    // await createPost({ title, content });
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
