import React, { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Tab,
  Typography,
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { ExpandMore } from '@mui/icons-material';
import { FormBrowser, FormBrowserProps } from '../form-browser/form-browser';
import { Form, FormResponse, SimpleResponse } from '../../types';
import { FormViewer } from '../form-viewer/form-viewer';
import { usePermission } from '../use-permission/UsePermissionContext';

type FormPages = 'responses' | 'newForm';

export interface FormIntegrationProps extends FormBrowserProps {
  responses: FormResponse[];
  onResponseSaved: (res: SimpleResponse) => void;
}

export function FormIntegration({
  purpose,
  responses,
  onResponseSaved,
}: FormIntegrationProps) {
  const [pageValue, setPageValue] = useState<FormPages>('responses');
  const [editingForm, setEditingForm] = useState<Form | null>(null);
  const { canWrite } = usePermission();

  const handleResponseCreated = (response: SimpleResponse) => {
    onResponseSaved(response);
    setEditingForm(null);
    setPageValue('responses');
  };
  return (
    <Box>
      <TabContext value={pageValue}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList
            onChange={(e, val) => setPageValue(val)}
            aria-label="Select an option"
          >
            <Tab label="Responses" value="responses" />
            <Tab label="New Form" value="newForm" disabled={!canWrite} />
          </TabList>
        </Box>
        <TabPanel value="responses" sx={{ padding: '24px 0' }}>
          {!responses.length && (
            <Alert severity="info">
              No forms are attached to this record, click the New Form button to
              attach a form to this record.
            </Alert>
          )}
          {responses.map((r) => (
            <Accordion key={r.id} variant="outlined">
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
              >
                <Typography>
                  {r.latestResponseVersion?.formVersion?.form.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormViewer
                  form={r.latestResponseVersion?.formVersion}
                  response={r}
                  onResponseSaved={handleResponseCreated}
                />
              </AccordionDetails>
            </Accordion>
          ))}
        </TabPanel>
        <TabPanel value="newForm">
          {editingForm && (
            <FormViewer
              form={{ ...editingForm.latestFormVersion, form: editingForm }}
              onGoBack={() => setEditingForm(null)}
              onResponseSaved={handleResponseCreated}
            />
          )}
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
