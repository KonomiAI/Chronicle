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
  Typography,
} from '@mui/material';

import { FormPurpose, PostFormBody, Form } from '../../types/form';
import { getFormErrorMessage } from '../../utils';

import { FormBuilder, SaveBar, TextInput } from '../../components';
import Spacer from '../../components/spacer/Spacer';
import { DEFAULT_SCHEMA_VAL } from '../../components/form-builder/const';
import { useSaveBar } from '../../components/save-bar/use-save-bar';

interface FormBaseProps {
  onSave: (body: PostFormBody) => void;
  formData?: Form | undefined;
}

const FormBase: React.FC<FormBaseProps> = ({ onSave, formData }) => {
  const form = useForm<PostFormBody>({
    defaultValues: {
      title: formData?.title ?? '',
      description: formData?.description ?? '',
      purpose: formData?.purpose ?? FormPurpose.NO_PURPOSE,
      body: formData?.latestFormVersion?.body ?? DEFAULT_SCHEMA_VAL,
    },
  });

  const shouldShowSave = useSaveBar(form.watch);

  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h5">About form</Typography>
          <Spacer />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextInput
                control={form.control}
                rules={{
                  required: true,
                  minLength: 1,
                }}
                label="Form Title"
                name="title"
              />
            </Grid>
            <Grid item xs={12}>
              <TextInput
                control={form.control}
                rules={{
                  required: true,
                  minLength: 1,
                }}
                label="Form Description"
                name="description"
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="purpose"
                control={form.control}
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
                      <MenuItem value={FormPurpose.NO_PURPOSE}>
                        No specific purpose
                      </MenuItem>
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
      <Spacer size="lg" />
      <FormBuilder form={form} name="body" />
      <Spacer size="saveBar" />
      <SaveBar
        open={shouldShowSave}
        onSave={form.handleSubmit((data) => {
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
