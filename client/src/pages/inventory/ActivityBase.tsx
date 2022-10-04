import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Card, CardContent, Grid, Typography } from '@mui/material';

import { floatToPennies, penniesToFloat, priceCheck } from '../../utils';
import { Activity, PostActivityBody, PutActivityBody } from '../../types';
import { SaveBar } from '../../components';
import Spacer from '../../components/spacer/Spacer';
import { FormInputField } from '../../components/form-inputs/FormInputField';

interface ActivityBaseProps {
  activity?: Activity;
  onSave: (body: PostActivityBody | PutActivityBody) => void;
  isLoading?: boolean;
}

const defaultProps = {
  activity: undefined,
  isLoading: false,
};

const ActivityBase: React.FC<ActivityBaseProps> = ({
  activity,
  onSave,
  isLoading,
}) => {
  const { control, handleSubmit, reset } = useForm<PostActivityBody>({});

  useEffect(() => {
    reset({
      ...activity,
      price: penniesToFloat(activity?.price || 0),
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
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormInputField
                type-="number"
                name="price"
                control={control}
                rules={{
                  required: true,
                  minLength: 1,
                  pattern: priceCheck,
                }}
                label="Price"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Spacer size="lg" />
      <SaveBar
        loading={isLoading}
        open
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
