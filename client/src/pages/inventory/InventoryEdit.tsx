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
  CardMedia,
} from '@mui/material';

import PageHeader from '../../components/page-header/PageHeader';
import Spacer from '../../components/spacer/Spacer';


export default function InventoryEditPage() {
  return (
    <Container>
      <PageHeader
        pageTitle="Juicy Massage"
        backURL="/inventory"
      />
      <Spacer size="lg" />
      <Card>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="productName"
                variant="outlined"
                required
                fullWidth
                label="Product Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="productBrand"
                variant="outlined"
                required
                fullWidth
                label="Brand Name"
                autoFocus
              />
            </Grid>
          </Grid>
          <Spacer size="lg" />
          <Grid container spacing={2}>
            <Grid item xs='auto' sm={4}>
              <CardMedia
                component="img"
                alt="Kirby"
                image="https://i.ytimg.com/vi/8XW8u5xLnk0/maxresdefault.jpg"
              />
            </Grid>
            <Grid item xs='auto' sm={4}>
              <CardMedia
                component="img"
                alt="Kirby"
                image="https://i.chzbgr.com/full/5308424192/hD8F6D6A4/well-thats-horrible"
              />
            </Grid>
            <Grid item xs='auto' sm={4}>
              <CardMedia
                component="img"
                alt="Kirby"
                image="https://i.pinimg.com/originals/b0/76/9d/b0769dc9a4486558ee8069a271574a73.jpg"
              />
            </Grid>
          </Grid>
        </CardContent>

      </Card>
      <Spacer size="lg" />
      <Card>
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
      <Spacer size="lg" />
    </Container>

    );
  }
