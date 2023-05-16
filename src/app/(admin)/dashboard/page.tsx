"use client";
// @mui
import { Grid, Container, Box } from '@mui/material';

import {
  AppWelcome,
} from '@/components/dashboard';

// ----------------------------------------------------------------------

export default function DashboardApp() {

  return (
    <Box>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <AppWelcome />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
