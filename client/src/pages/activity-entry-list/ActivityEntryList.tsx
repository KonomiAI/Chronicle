import React, { SyntheticEvent, useState } from 'react';
import { Button, Container, Tab } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useSnackbar } from 'notistack';
import { TabContext, TabList, TabPanel } from '@mui/lab';

import PageHeader from '../../components/page-header/PageHeader';
import Spacer from '../../components/spacer/Spacer';
import {
  createActivityEntry,
  useListAllActivityEntries,
  useListMyActivityEntries,
} from '../../data';
import { CustomerSelectDialog } from '../../components/customer-select-dialog/CustomerSelectDialog';
import { ActivityEntryTable } from './components/ActivityEntryTable';
import LoadingCard from '../../components/loading-card';

const MyActivityEntriesPanel = () => {
  const { data, isLoading } = useListMyActivityEntries();
  return (
    <TabPanel value="my-activity-entries" sx={{ padding: '0' }}>
      {isLoading && <LoadingCard title="Loading activity entries" />}
      {data && <ActivityEntryTable data={data} />}
    </TabPanel>
  );
};

const AllActivityEntriesPanel = () => {
  const { data, isLoading } = useListAllActivityEntries();
  return (
    <TabPanel value="all-activity-entries" sx={{ padding: '0' }}>
      {isLoading && <LoadingCard title="Loading activity entries" />}
      {data && <ActivityEntryTable data={data} />}
    </TabPanel>
  );
};

export function ActivityEntryList() {
  const [value, setValue] = useState('my-activity-entries');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (_: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const { mutate, isLoading: isMutationLoading } = useMutation(
    createActivityEntry,
    {
      onSuccess: (e) => {
        enqueueSnackbar(`Activity entry successfully created`, {
          variant: 'success',
        });
        navigate(`/activity-entries/${e.id}`);
      },
    },
  );
  return (
    <Container>
      <CustomerSelectDialog
        open={open}
        handleClose={(c) => {
          setOpen(false);
          if (c) {
            mutate({
              customerId: c.id,
            });
          }
        }}
      />
      <PageHeader
        pageTitle="Activity Entries"
        action={
          <Button
            variant="contained"
            data-testid="btn-create-entry"
            onClick={() => setOpen(true)}
            disabled={isMutationLoading}
          >
            New Entry
          </Button>
        }
      />
      <Spacer size="lg" />
      <TabContext value={value}>
        <TabList onChange={handleChange} aria-label="activity entry tabs">
          <Tab label="My entries" value="my-activity-entries" />
          <Tab label="All entries" value="all-activity-entries" />
        </TabList>
        <Spacer size="md" />
        <MyActivityEntriesPanel />
        <AllActivityEntriesPanel />
      </TabContext>
    </Container>
  );
}
