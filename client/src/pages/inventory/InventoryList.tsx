import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

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
import LoadingCard from '../../components/loading-card';
import ProductsTable from '../../components/products-table/ProductsTable';
import ActivitiesTable from '../../components/activities-table/ActivitiesTable';

import { useGetActivities, useGetProducts } from '../../data';
import { formatDate, getPenniesPriceRange, penniesToPrice } from '../../utils';
import { InventoryTabs } from '../../types';

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
        .map(
          ({ id: productId, name, brand, variants, createdAt, updatedAt }) => (
            <TableRow
              key={productId}
              hover
              sx={{ cursor: 'pointer' }}
              onClick={() => navigate(`products/${productId}`)}
            >
              <TableCell>{name}</TableCell>
              <TableCell>{brand}</TableCell>
              <TableCell>
                {getPenniesPriceRange(variants.map((v) => v.price))}
              </TableCell>
              <TableCell>{formatDate(createdAt, 'PP')}</TableCell>
              <TableCell>{formatDate(updatedAt, 'PP')}</TableCell>
            </TableRow>
          ),
        )
        .flat()}
    />
  );
};

const ActivitiesTableContainer = () => {
  const { data: activities, isLoading, isError } = useGetActivities();
  const navigate = useNavigate();

  if (isLoading) {
    return <LoadingCard title="Fetching activities..." />;
  }

  if (isError || !activities) {
    return (
      <Alert severity="error">
        <AlertTitle>An unexpected error has occured</AlertTitle>
        Something went wrong while fetching activities
      </Alert>
    );
  }

  if (activities.length === 0) {
    return (
      <Alert severity="info">
        <AlertTitle>No activities found</AlertTitle>
        Please use the &quot;create&quot; button to add an activity
      </Alert>
    );
  }

  return (
    <ActivitiesTable
      tableContents={activities
        .filter((a) => !a.isArchived)
        .map(({ id, name, price, createdAt, updatedAt }) => (
          <TableRow
            key={id}
            hover
            sx={{ cursor: 'pointer' }}
            onClick={() => navigate(`activities/${id}`)}
          >
            <TableCell>{name}</TableCell>
            <TableCell>{penniesToPrice(price)}</TableCell>
            <TableCell>{formatDate(createdAt, 'PP')}</TableCell>
            <TableCell>{formatDate(updatedAt, 'PP')}</TableCell>
          </TableRow>
        ))}
    />
  );
};

const TabSection = (label: string, index: number) => (
  <Tab
    label={label}
    id={`scrollable-auto-tab-${index}`}
    aria-controls={`scrollable-auto-tabpanel-${index}`}
  />
);

export default function InventoryPage() {
  const [tabValue, setTabValue] = useState(InventoryTabs.PRODUCTS);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const currentTab = searchParams.get('tab');

    if (currentTab && currentTab in InventoryTabs) {
      setTabValue(InventoryTabs[currentTab as keyof typeof InventoryTabs]);
    }
  }, []);

  const handleTabChange = (
    event: React.SyntheticEvent,
    newTabValue: number,
  ) => {
    setTabValue(newTabValue);
  };

  const handleCreateLink = () => {
    switch (tabValue) {
      case InventoryTabs.PRODUCTS:
        return '/inventory/products/create';
      case InventoryTabs.ACTIVITIES:
        return '/inventory/activities/create';
      default:
        return '';
    }
  };

  return (
    <Container>
      <PageHeader
        pageTitle="Inventory"
        action={
          <Button component={Link} to={handleCreateLink()} variant="contained">
            Create
          </Button>
        }
      />
      <Spacer size="lg" />

      <AppBar position="static" color="default">
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {TabSection('Products', InventoryTabs.PRODUCTS)}
          {TabSection('Activities', InventoryTabs.ACTIVITIES)}
        </Tabs>
      </AppBar>

      <TabPanel value={tabValue} index={InventoryTabs.PRODUCTS}>
        <ProductsTableContainer />
      </TabPanel>

      <TabPanel value={tabValue} index={InventoryTabs.ACTIVITIES}>
        <ActivitiesTableContainer />
      </TabPanel>

      <Spacer size="lg" />
    </Container>
  );
}
