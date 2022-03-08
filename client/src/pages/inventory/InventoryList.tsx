import React, { useState } from 'react';
import {
  Button,
  Chip,
  Container,
  Dialog,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Link } from 'react-router-dom';

import PageHeader from '../../components/page-header/PageHeader';
import Spacer from '../../components/spacer/Spacer';

const inventoryList = [
    { name: "Daniel Wu", price: "$420.69", date: "1999-07-29", barcode: "66666"},
    { name: "Daniel Wu", price: "$420.69", date: "1999-07-29", barcode: "66666"},
];
  
const InventoryList = () => (
    inventoryList.map(({ name, price, date, barcode }) => (
    <TableRow>
        <TableCell>{name}</TableCell>
        <TableCell>{price}</TableCell>
        <TableCell>{date}</TableCell>
        <TableCell>{barcode}</TableCell>
    </TableRow>
)
))

export default function InventoryPage() {
  return (
    <Container>
      <PageHeader
        pageTitle="Inventory"
        action={
          <Button component={Link} to="/inventory/create" variant="contained" >
            Create
          </Button>
        }
      />
      <Spacer size="lg" />
      <TableContainer component={Paper}>
        <Table>
        <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Date Added</TableCell>
              <TableCell>Date Barcode</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {InventoryList()}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
