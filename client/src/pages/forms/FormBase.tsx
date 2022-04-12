import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import {
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';

import { FormPurpose, PostFormBody, Form } from '../../types/form';
import { getFormErrorMessage } from '../../utils';

import { SaveBar } from '../../components';

interface FormBaseProps {
  onSave: (body: PostFormBody) => void;
  formData?: Form | undefined;
}

const FormBase: React.FC<FormBaseProps> = ({ onSave, formData }) => {
  const { control, handleSubmit } = useForm<PostFormBody>({
    defaultValues: {
      title: formData?.title,
      description: formData?.description,
      purpose: formData?.purpose,
      body: {
        'some-key': 'some-value',
      },
    },
  });

  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="title"
                control={control}
                rules={{
                  required: true,
                  minLength: 1,
                }}
                render={({
                  field: { onChange, value },
                  fieldState: { invalid, error },
                }) => (
                  <TextField
                    fullWidth
                    label="Title"
                    variant="outlined"
                    onChange={onChange}
                    value={value}
                    required
                    error={invalid}
                    helperText={getFormErrorMessage(error?.type)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                rules={{
                  required: true,
                  minLength: 1,
                }}
                render={({
                  field: { onChange, value },
                  fieldState: { invalid, error },
                }) => (
                  <TextField
                    fullWidth
                    label="Description"
                    variant="outlined"
                    onChange={onChange}
                    value={value}
                    required
                    error={invalid}
                    helperText={getFormErrorMessage(error?.type)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="purpose"
                control={control}
                rules={{
                  required: true,
                }}
                render={({
                  field: { onChange, value },
                  fieldState: { invalid, error },
                }) => (
                  <FormControl fullWidth required error={!!error}>
                    <InputLabel id="demo-simple-select-label">
                      Purpose
                    </InputLabel>
                    <Select
                      id="purpose"
                      label="Purpose"
                      onChange={onChange}
                      value={value}
                      error={invalid}
                    >
                      <MenuItem value={FormPurpose.ACTIVITY_ENTRY}>
                        Activity Entry
                      </MenuItem>
                      <MenuItem value={FormPurpose.CUSTOMER}>Customer</MenuItem>
                      <MenuItem value={FormPurpose.INVENTORY}>
                        Inventory
                      </MenuItem>
                      <MenuItem value={FormPurpose.STAFF}>Staff</MenuItem>
                    </Select>
                    <FormHelperText>
                      {getFormErrorMessage(error?.type)}
                    </FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <SaveBar
        open
        onSave={handleSubmit((data) => {
          // TODO: add loading state
          onSave(data);
        })}
      />
    </>
  );
};

FormBase.defaultProps = {
  formData: undefined,
};

export default FormBase;
