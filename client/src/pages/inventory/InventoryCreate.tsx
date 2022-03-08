import React, { useEffect, useState } from 'react';
import {
  Box,
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
  Dialog
} from '@mui/material';

import PageHeader from '../../components/page-header/PageHeader';
import Spacer from '../../components/spacer/Spacer';
import VaraintCreateDialog from './VariantCreate';
import { useNavigate } from 'react-router-dom';

const variantList = [
  { name: "Rainbow Kirbyzz", price: "$420.69", date: "1999-07-29", barcode: "66666"},
  { name: "Chad Kirby", price: "$420.69", date: "1999-07-29", barcode: "66666"},
  { name: "Snacccc Kirby", price: "$420.69", date: "1999-07-29", barcode: "66666"},
];

const VariantList = () => (
  variantList.map(({ name, price, date, barcode }) => (
  <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell>{price}</TableCell>
      <TableCell>{date}</TableCell>
      <TableCell>{barcode}</TableCell>
  </TableRow>
)
))
export default function InventoryCreatePage() {

  const navigate = useNavigate();
  const [variantDialogOpen, setVariantDialogOpen] = useState(false);
  return (
    <Container>
      <PageHeader
        pageTitle="Create a Product"
        backURL="/inventory"
      />
      <Spacer size="lg" />
      <Card>
        <CardContent>
          <Typography variant="h4" sx={{ mb: 2 }}>
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
            <Grid item xs={12} sm={6}>
              <TextField
                id="productPrice"
                variant="outlined"
                required
                fullWidth
                label="Price"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="productBarcode"
                variant="outlined"
                required
                fullWidth
                label="Barcode"
                autoFocus
              />
            </Grid>
          </Grid>

        </CardContent>
        <Spacer size="lg" />
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mb: '1em',
              gap: '5em',
            }}
          >
            <Typography variant="h4" sx={{ mb: 2 }}>
              Variants
            </Typography>
            <Box>
               <Dialog
                open={variantDialogOpen}
                onClose={() => setVariantDialogOpen(false)}
              >
                <VaraintCreateDialog handleClose={() => setVariantDialogOpen(false)}/>
              </Dialog>
              <Button variant="contained" onClick={() => setVariantDialogOpen(true)}>
                Add New Variant
              </Button>
            </Box>
          </Box>
          <TableContainer component={Paper}>
            <Table>
            <TableHead>
                <TableRow>
                  <TableCell>Variant Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Barcode</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {VariantList()}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      <Spacer size="lg" />
    </Container>
  );
}


