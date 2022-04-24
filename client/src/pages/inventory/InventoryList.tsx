import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
  Button,
  Container,
  TableCell,
  TableRow,
  Tab,
  Tabs,
  AppBar,
  Alert,
  AlertTitle,
} from '@mui/material';

import PageHeader from '../../components/page-header/PageHeader';
import Spacer from '../../components/spacer/Spacer';
import TabPanel from '../../components/tabs/TabPanel';
import InventoryTable from '../../components/inventory/InventoryTable';
import LoadingCard from '../../components/loading-card';
import ProductsTable from '../../components/products-table/ProductsTable';
import YesNoChip from '../../components/yes-no-chip/YesNoChip';

import { useGetProducts } from '../../data';
import { penniesToPrice } from '../../utils';

const ProductsTableContainer = () => {
  const { data: products, isLoading, isError } = useGetProducts();
  const navigate = useNavigate();

  if (isLoading) {
    return <LoadingCard title="Fetching products..." />;
  }

  if (isError || !products) {
    return (
      <Alert severity="error">
        <AlertTitle>An unexpected error has occured</AlertTitle>
        Something went wrong while fetching products
      </Alert>
    );
  }

  if (products.length === 0) {
    return (
      <Alert severity="info">
        <AlertTitle>No products found</AlertTitle>
        Please use the &quot;create&quot; button to add a product
      </Alert>
    );
  }

  return (
    <ProductsTable
      tableContents={products
        .map(({ id: productId, name, variants, brand, isArchived }) =>
          variants.map(
            ({
              id: variantId,
              price,
              barcode,
              createdAt,
              updatedAt,
              isAvailable,
            }) => (
              <TableRow
                key={variantId}
                hover
                sx={{ cursor: 'pointer' }}
                onClick={() => navigate(`products/${productId}`)}
              >
                <TableCell>{name}</TableCell>
                <TableCell>{brand}</TableCell>
                <TableCell>{penniesToPrice(price)}</TableCell>
                <TableCell>{barcode}</TableCell>
                <TableCell>
                  <YesNoChip isYes={isArchived} />
                </TableCell>
                <TableCell>
                  <YesNoChip isYes={isAvailable} />
                </TableCell>
                <TableCell>{new Date(createdAt).toLocaleString()}</TableCell>
                <TableCell>{new Date(updatedAt).toLocaleString()}</TableCell>
              </TableRow>
            ),
          ),
        )
        .flat()}
    />
  );
};

const productList = [
  { name: 'Massage 1', price: '$420.69', date: '1999-07-29', barcode: '66666' },
  { name: 'Massage 2', price: '$420.69', date: '1999-07-29', barcode: '66666' },
];

const ProductList = () =>
  productList.map(({ name, price, date, barcode }) => (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell>{price}</TableCell>
      <TableCell>{date}</TableCell>
      <TableCell>{barcode}</TableCell>
    </TableRow>
  ));

const TabSection = (label: string, index: number) => (
  <Tab
    label={label}
    id={`scrollable-auto-tab-${index}`}
    aria-controls={`scrollable-auto-tabpanel-${index}`}
  />
);

export default function InventoryPage() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container>
      <PageHeader
        pageTitle="Inventory"
        action={
          <Button
            component={Link}
            to="/inventory/products/create"
            variant="contained"
          >
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
          {TabSection('Products', 0)}
          {TabSection('Activities', 1)}
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <ProductsTableContainer />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <InventoryTable tableContents={ProductList()} />
      </TabPanel>

      <Spacer size="lg" />
    </Container>
  );
}
