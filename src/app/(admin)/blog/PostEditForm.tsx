"use client";
import { Box, Typography, Grid, Card, FormControl, TextField, FormControlLabel, Switch, Autocomplete, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import * as Yup from "yup";
import { useFormik } from "formik";
import Editor from "@/components/editor";

const ContentDiv = styled("div")({
  margin: "24px 0 0",
  "& .MuiTypography-root": {
    margin: "0px 0px 8px",
    fontWeight: 600,
    lineHeight: 1.57143,
    fontSize: "0.875rem",
    fontFamily: '"Public Sans", sans-serif',
    color: "rgb(99, 115, 129)",
  },
});

const ControlDiv = styled("div")({
  "& .MuiFormControlLabel-root": {
    margin: "0px 0px 8px 0px",
    width: "100%",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },
});

const SubmitButtonDiv = styled("div")({
  display: "flex",
  flexDirection: "row",
  marginTop: "24px",
});

interface PostTypes {
  title: string;
  content: string;
}

interface PostEditFormProps {
  post?: PostTypes;
  handleSavePost: (post: PostTypes) => {};
}

const PostEditForm = (props: PostEditFormProps) => {
  const { post, handleSavePost } = props;

  const PostSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("Content is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: post?.title || "",
      description: "",
      content: post?.content || "",
    },
    enableReinitialize: true,
    validationSchema: PostSchema,
    onSubmit: (values) => {
      handleSavePost(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container sx={{ flexFlow: "row wrap" }} spacing={3}>
        <Grid item xs={12} md={8} sx={{ padding: "24px 0 0 24px" }}>
          <Card elevation={0} sx={{ padding: "24px" }}>
            <div>
              <FormControl fullWidth>
                <TextField name="title" label="Post Title" onChange={formik.handleChange} value={formik.values.title} />
              </FormControl>
              <FormControl sx={{ marginTop: "24px" }} fullWidth>
                <TextField
                  rows={3}
                  multiline
                  label="Description"
                  name="description"
                  onChange={formik.handleChange}
                  value={formik.values.description}
                />
              </FormControl>
              <ContentDiv>
                <Typography>Content</Typography>
                <div>
                  <Box>
                    <Editor formik={formik} />
                  </Box>
                </div>
              </ContentDiv>
            </div>
          </Card>
        </Grid>
        <Grid item xs={12} md={4} sx={{ padding: "24px 0 0 24px" }}>
          <Card elevation={0} sx={{ padding: "24px" }}>
            <div>
              <ControlDiv>
                <FormControlLabel value="Publish" control={<Switch color="primary" />} label="Publish" labelPlacement="start" />
                <FormControlLabel value="Enable comments" control={<Switch color="primary" />} label="Enable comments" labelPlacement="start" />
              </ControlDiv>
              <Autocomplete
                multiple
                sx={{ marginTop: "24px" }}
                id="tags-outlined"
                options={top100Films}
                getOptionLabel={(option) => option.title}
                filterSelectedOptions
                renderInput={(params) => <TextField {...params} label="Tags" placeholder="Tags" />}
              />
              <FormControl sx={{ marginTop: "24px" }} fullWidth>
                <TextField label="Meta title" />
              </FormControl>
              <FormControl sx={{ marginTop: "24px" }} fullWidth>
                <TextField rows={3} multiline label="Meta description" />
              </FormControl>
              <Autocomplete
                multiple
                sx={{ marginTop: "24px" }}
                id="tags-outlined"
                options={top100Films}
                getOptionLabel={(option) => option.title}
                filterSelectedOptions
                renderInput={(params) => <TextField {...params} label="Meta keywords" placeholder="Meta keywords" />}
              />
            </div>
          </Card>
          <SubmitButtonDiv>
            <Button variant="outlined" size="large" fullWidth>
              Preview
            </Button>
            <Button type="submit" variant="contained" size="large" sx={{ margin: "0px 0px 0px 12px" }} fullWidth>
              Post
            </Button>
          </SubmitButtonDiv>
        </Grid>
      </Grid>
    </form>
  );
};

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
];
export default PostEditForm;
