import React, { useState } from 'react';
import {
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tab,
  Tabs,
  AppBar
} from '@mui/material';
import { Link } from 'react-router-dom';

import PageHeader from '../../components/page-header/PageHeader';
import Spacer from '../../components/spacer/Spacer';
import TabPanel from '../../components/tabs/TabPanel';


export function InventoryTable({ tableContents }: { tableContents: React.ReactNode }) {
  return (
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
          {tableContents}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


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

const productList = [
  { name: "Massage 1", price: "$420.69", date: "1999-07-29", barcode: "66666"},
  { name: "Massage 2", price: "$420.69", date: "1999-07-29", barcode: "66666"},
];

const ProductList = () => (
  productList.map(({ name, price, date, barcode }) => (
  <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell>{price}</TableCell>
      <TableCell>{date}</TableCell>
      <TableCell>{barcode}</TableCell>
  </TableRow>
)
))

function a11yProps(index:number) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`
  };
}

export default function InventoryPage() {

  const [value, setValue] = React.useState(0);

  function handleChange(event: React.ChangeEvent<{}>, newValue: number) {
    setValue(newValue);
  }
 
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

      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Products" {...a11yProps(0)} />
          <Tab label="Activities" {...a11yProps(1)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <InventoryTable tableContents={InventoryList()} />;
      </TabPanel>
      <TabPanel value={value} index={1}>
        <InventoryTable tableContents={ProductList()} />;
      </TabPanel>
    </Container>
  );
}
