import React from 'react';
import { Button, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { DateInput } from '../../../components';

export interface DateRange {
  start: string;
  end: string;
}

interface DateRangePickerProps {
  value?: DateRange;
  onChange: (dateRange: DateRange) => void;
}

export default function DateRangePicker({
  onChange,
  value,
}: DateRangePickerProps) {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      start: value?.start ?? '',
      end: value?.end ?? '',
    },
  });
  return (
    <Grid container spacing={2}>
      <Grid item md={6} xs={12}>
        <DateInput
          name="start"
          label="Start Date"
          control={control}
          rules={{ required: true }}
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <DateInput
          name="end"
          label="End Date"
          control={control}
          rules={{ required: true }}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={handleSubmit(onChange)}>
          Apply
        </Button>
      </Grid>
    </Grid>
  );
}
