import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Card, CardContent, Grid, MenuItem, Typography } from '@mui/material';

import { FormPurpose, PostFormBody, Form } from '../../types/form';

import { FormBuilder, SaveBar } from '../../components';
import Spacer from '../../components/spacer/Spacer';
import { DEFAULT_SCHEMA_VAL } from '../../components/form-builder/const';
import { useSaveBar } from '../../components/save-bar/use-save-bar';
import { FormInputField } from '../../components/form-inputs/FormInputField';
import { FormSelect } from '../../components/form-inputs/FormSelect';

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

  const [shouldShowSave, setFormData] = useSaveBar<PostFormBody>(form);

  useEffect(() => {
    const { latestFormVersion, description, purpose, title } = formData ?? {};

    setFormData({
      title,
      purpose,
      description,
      body: latestFormVersion?.body ?? DEFAULT_SCHEMA_VAL,
    });
  }, [formData]);

  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h5">About form</Typography>
          <Spacer />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormInputField
                control={form.control}
                rules={{
                  required: true,
                  minLength: 1,
                }}
                label="Form title"
                name="title"
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputField
                control={form.control}
                rules={{
                  required: true,
                  minLength: 1,
                }}
                label="Form Description"
                name="description"
                multiline={3}
              />
            </Grid>
            <Grid item xs={12}>
              <FormSelect
                control={form.control}
                name="purpose"
                label="Form purpose"
                rules={{ required: true }}
              >
                <MenuItem value={FormPurpose.NO_PURPOSE}>
                  No specific purpose
                </MenuItem>
                <MenuItem value={FormPurpose.ACTIVITY_ENTRY}>
                  Activity Entry
                </MenuItem>
                <MenuItem value={FormPurpose.CUSTOMER}>Customer</MenuItem>
                <MenuItem value={FormPurpose.INVENTORY}>Inventory</MenuItem>
                <MenuItem value={FormPurpose.STAFF}>Staff</MenuItem>
              </FormSelect>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Spacer size="md" />
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
