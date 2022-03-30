import React, { useState } from 'react';
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  Grid,
  Alert,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';

import Spacer from '../../components/spacer/Spacer';
import { createAllowlistEntry } from '../../data';
import { AllowlistData, Ip} from '../../types';


export interface AllowlistAddProps {
  handleClose: (created: boolean) => void;
}

export interface AllowlistAddResultProps extends AllowlistAddProps {
  details?: AllowlistData;
}

const AllowlistAddForm = ({ handleClose }: AllowlistAddProps) => {
  const navigate = useNavigate();

  const { handleSubmit, control } = useForm<AllowlistData>({
    defaultValues: {
      ip: '',
      description: '',
    },
  });
 
  const updateAllowlistEntryAndMutate = useMutation(createAllowlistEntry, {
    onSuccess: () => {
      navigate(`/allowlist`);
    },
  });

  const onSubmit = (values: AllowlistData) => updateAllowlistEntryAndMutate.mutate(values);
  
  return (
    <>
      <DialogTitle>Add new IP address</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Add a new IP address to your company allowlist to ensure your staff can access Chronicle
        </DialogContentText>
        <Spacer />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name="ip"
              control={control}
              rules={{
                required: true,
                minLength: 1,
              }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  label="IP Address"
                  variant="outlined"
                  onChange={onChange}
                  value={value}
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
              render={({ field: { onChange, value } }) => (
                <TextField
                  multiline
                  fullWidth
                  label="Description"
                  variant="outlined"
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(false)} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
      </DialogActions>
    </>
  );
};

export default function AllowlistAddDialog({
  handleClose,
}: AllowlistAddProps) {
  return <AllowlistAddForm handleClose={handleClose} />
}