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
import YesNoChip from '../../components/yes-no-chip/YesNoChip';

import { useGetActivities, useGetProducts } from '../../data';
import { penniesToPrice } from '../../utils';
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
      tableContents={activities.map(
        ({ id, name, price, isArchived, createdAt, updatedAt }) => (
          <TableRow
            key={id}
            hover
            sx={{ cursor: 'pointer' }}
            onClick={() => navigate(`activities/${id}`)}
          >
            <TableCell>{name}</TableCell>
            <TableCell>{penniesToPrice(price)}</TableCell>
            <TableCell>
              <YesNoChip isYes={isArchived} />
            </TableCell>
            <TableCell>{new Date(createdAt).toLocaleString()}</TableCell>
            <TableCell>{new Date(updatedAt).toLocaleString()}</TableCell>
          </TableRow>
        ),
      )}
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
