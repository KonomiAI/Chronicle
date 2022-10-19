import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Card, CardContent, Grid, Typography } from '@mui/material';

import { floatToPennies, penniesToFloat, priceCheck } from '../../utils';
import { Activity, PostActivityBody, PutActivityBody } from '../../types';
import { SaveBar } from '../../components';
import Spacer from '../../components/spacer/Spacer';
import { FormInputField } from '../../components/form-inputs/FormInputField';
import { fastUnsafeObjectCompare } from '../../utils/compare-object';

interface ActivityBaseProps {
  activity?: Activity;
  onSave: (body: PostActivityBody | PutActivityBody) => void;
  isLoading?: boolean;
  disabled?: boolean;
}

const defaultProps = {
  activity: undefined,
  isLoading: false,
};

const ActivityBase: React.FC<ActivityBaseProps> = ({
  activity,
  onSave,
  isLoading,
  disabled,
}) => {
  const initialValues = {
    name: activity?.name ?? '',
    price: activity?.price ? penniesToFloat(activity.price) : undefined,
  };
  const [isSavebarOpen, setIsSavebarOpen] = useState(false);
  const { control, handleSubmit, reset, watch } = useForm<PostActivityBody>({
    defaultValues: initialValues,
  });

  const currentValue = watch();

  useEffect(() => {
    if (fastUnsafeObjectCompare(initialValues, currentValue)) {
      setIsSavebarOpen(false);
    } else {
      setIsSavebarOpen(true);
    }
  }, [currentValue]);

  useEffect(() => {
    if (!activity) {
      return;
    }
    reset({
      name: activity.name,
      price: penniesToFloat(activity.price),
    });
  }, [activity]);

  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormInputField
                name="name"
                control={control}
                rules={{
                  required: true,
                  minLength: 1,
                }}
                label="Name"
                disabled={disabled}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormInputField
                type="number"
                name="price"
                control={control}
                rules={{
                  required: true,
                  minLength: 1,
                  pattern: priceCheck,
                }}
                label="Price"
                disabled={disabled}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Spacer size="lg" />
      <SaveBar
        loading={isLoading}
        open={!disabled && isSavebarOpen}
        onSave={handleSubmit((data) => {
          onSave({
            ...data,
            price: floatToPennies(data.price),
          });
        })}
      />
    </>
  );
};

ActivityBase.defaultProps = defaultProps;

export default ActivityBase;
