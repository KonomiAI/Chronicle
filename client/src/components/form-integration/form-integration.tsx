import React, { useState } from 'react';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { FormBrowser, FormBrowserProps } from '../form-browser/form-browser';
import { Form } from '../../types';
import { If } from '../utils/util-components';
import { FormViewer } from '../form-viewer/form-viewer';

type FormPages = 'responses' | 'newForm';

export interface FormIntegrationProps extends FormBrowserProps {
  responses: unknown[];
}

export function FormIntegration({ purpose }: FormIntegrationProps) {
  const [pageValue, setPageValue] = useState<FormPages>('responses');
  const [editingForm, setEditingForm] = useState<Form | null>(null);
  return (
    <Box>
      <TabContext value={pageValue}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList
            onChange={(e, val) => setPageValue(val)}
            aria-label="Select "
          >
            <Tab label="Responses" value="responses" />
            <Tab label="New Form" value="newForm" />
          </TabList>
        </Box>
        <TabPanel value="responses">Item One</TabPanel>
        <TabPanel value="newForm">
          {editingForm && <FormViewer form={editingForm} />}
          {!editingForm && (
            <FormBrowser
              purpose={purpose}
              onFormOpen={(f) => setEditingForm(f)}
            />
          )}
        </TabPanel>
      </TabContext>
    </Box>
  );
}
