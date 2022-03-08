import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

import PageHeader from '../../components/page-header/PageHeader';
import Spacer from '../../components/spacer/Spacer';


export default function InventoryEditPage() {
  return (
    <Container>
      <PageHeader
        pageTitle="${Product Name}"
        backURL="/inventory"
      />
      <Spacer size="lg" />
      <Card
        sx={{
          borderColor: 'red'
        }}
      >
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2, color: 'error.main' }}>
            Danger Zone
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <Typography variant="h6">Archive Product</Typography>
              <Typography variant="body2">
                Archiving the product will also archive any related
                variants assocaited with this product
              </Typography>
            </Grid>
            <Grid
              item
              xs={2}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Button variant="text" color="primary">
                Archive
              </Button>
            </Grid>
            <Grid item xs={10}>
              <Typography variant="h6">Delete Product</Typography>
              <Typography variant="body2">
                Deleting the product will also delte any related
                variants with the product
              </Typography>
            </Grid>
            <Grid
              item
              xs={2}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Button>
                Delete
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>

    );
  }
