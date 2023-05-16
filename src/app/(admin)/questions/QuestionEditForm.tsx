"use client";
 import {
  Box,
   Typography,
   Grid,
  Card,
  FormControl,
  TextField,
  FormControlLabel,
  Switch,
  Autocomplete,
  Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';
 import { useFormik } from 'formik';
import Editor from '@/components/editor';

const ContentDiv = styled('div')({
  margin: '24px 0 0',
  '& .MuiTypography-root': {
    margin: '0px 0px 8px',
    fontWeight: 600,
    lineHeight: 1.57143,
    fontSize: '0.875rem',
    fontFamily: '"Public Sans", sans-serif',
    color: 'rgb(99, 115, 129)',
  },
});

const ControlDiv = styled('div')({
  '& .MuiFormControlLabel-root': {
    margin: '0px 0px 8px 0px',
    width: '100%',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
  },
});

const SubmitButtonDiv = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  marginTop: '24px',
});

interface PostTypes {
  title: string;
  content: any;
}

interface PostEditFormProps {
  post?: PostTypes;
}

const QuestionEditForm = (props: PostEditFormProps) => {
  const { post } = props;

  const formik = useFormik({
    initialValues: {
      title: post?.title,
      description: '',
      content: post?.content,
    },
    enableReinitialize: true,
    onSubmit: (values) => {},
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container sx={{ flexFlow: 'row wrap' }} spacing={3}>
        <Grid item xs={12} md={8} sx={{ padding: '24px 0 0 24px' }}>
          <Card elevation={0} sx={{ padding: '24px' }}>
            <div>
              <FormControl fullWidth>
                <TextField rows={3}
                  multiline name="question" label="Question" onChange={formik.handleChange} value={formik.values.title} />
              </FormControl>
              <FormControl sx={{ marginTop: '24px' }} fullWidth>
                <TextField sx={{ marginTop: '10px' }} name="option1" label="Option1" onChange={formik.handleChange} value={formik.values.title} />
                <TextField sx={{ marginTop: '10px' }} name="option2" label="Option2" onChange={formik.handleChange} value={formik.values.title} />
                <TextField sx={{ marginTop: '10px' }} name="option3" label="Option3" onChange={formik.handleChange} value={formik.values.title} />
                <TextField sx={{ marginTop: '10px' }} name="option4" label="Option4" onChange={formik.handleChange} value={formik.values.title} />
              </FormControl>

              <ContentDiv>
                <Typography>Detailed Solution</Typography>
                <div>
                  <Box>
                    <Editor formik={formik} />
                  </Box>
                </div>
              </ContentDiv>
            </div>
          </Card>
        </Grid>
        <Grid item xs={12} md={4} sx={{ padding: '24px 0 0 24px' }}>
          <Card elevation={0} sx={{ padding: '24px' }}>
            <div>
              <ControlDiv>
                <FormControlLabel
                  value="Publish"
                  control={<Switch color="primary" />}
                  label="Publish"
                  labelPlacement="start"
                />
                <FormControlLabel
                  value="Enable comments"
                  control={<Switch color="primary" />}
                  label="Enable comments"
                  labelPlacement="start"
                />
              </ControlDiv>
              <Autocomplete
                multiple
                sx={{ marginTop: '24px' }}
                id="tags-outlined"
                options={top100Films}
                getOptionLabel={(option) => option.title}
                filterSelectedOptions
                renderInput={(params) => <TextField {...params} label="Concept Tags" placeholder="Tags" />}
              />
              <FormControl sx={{ marginTop: '24px' }} fullWidth>
                <TextField label="Difficulty Level" />
              </FormControl>
              <FormControl sx={{ marginTop: '24px' }} fullWidth>
                <TextField rows={3} multiline label="Tricks involved" />
              </FormControl>
              <Autocomplete
                multiple
                sx={{ marginTop: '24px' }}
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
            <Button type="submit" variant="contained" size="large" sx={{ margin: '0px 0px 0px 12px' }} fullWidth>
              Post
            </Button>
          </SubmitButtonDiv>
        </Grid>
      </Grid>
    </form>
  );
};

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
];
export default QuestionEditForm;
