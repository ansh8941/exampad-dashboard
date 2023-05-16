"use client";

import { Box, Container, Typography, Breadcrumbs, Link } from "@mui/material";

const Page = () => {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/">
      Dashboard
    </Link>,
    <Link underline="hover" key="2" color="inherit" href="/material-ui/getting-started/installation/">
      User
    </Link>,
    <Typography key="3" color="text.primary">
      Account Settings
    </Typography>,
  ];

  return (
    <Box>
      <Container maxWidth={false}>
        <Box sx={{ marginBottom: "40px" }}>
          <Box>
            <Box>
              <Typography variant="h4" component="div" gutterBottom>
                Account
              </Typography>
              <Breadcrumbs separator="›" aria-label="breadcrumb">
                {breadcrumbs}
              </Breadcrumbs>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Page;
