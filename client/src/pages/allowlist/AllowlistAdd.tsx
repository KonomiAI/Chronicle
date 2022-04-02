import React, { useState } from 'react';
import {
  Container,
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
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import Spacer from '../../components/spacer/Spacer';
import { useAllowList, createAllowlistEntry } from '../../data';
import { AllowlistData, Ip} from '../../types';
import { getFormErrorMessage } from '../../utils';

export interface AllowlistAddProps {
  handleClose: (created: boolean) => void;
}

export interface AllowlistAddResultProps extends AllowlistAddProps {
  details?: AllowlistData;
}


const AllowlistAddForm = ({ handleClose }: AllowlistAddProps) => {
  const navigate = useNavigate();
  const { data: allowlistData} = useAllowList();
  const [duplicateIpAddressAlert, setDuplicateIpAddressAlert] = useState(false);
  const [ipAddressAlreadyExistsAlert, setIpAddressAlreadyExistsAlert] = useState(false);


  const duplicateIpAddress = (allowlistEntries: Ip[] | undefined, ipAddress : string) => {
   
    let foundDuplicateIpAddress = false;
  
    if(allowlistEntries){
      Array.from(allowlistEntries).forEach((element) => {
        if (element.ip === ipAddress) {
          foundDuplicateIpAddress = true;
        }
      });
      return foundDuplicateIpAddress;
    }
    
    return false;
  };
  
  const { handleSubmit, control } = useForm<AllowlistData>({
    defaultValues: {
      ip: '',
      description: '',
    },
  });

  const updateAllowlistEntryAndMutate = useMutation(createAllowlistEntry, {
    onSuccess: () => {
      window.location.reload();
    },
    onError: () => {
      setIpAddressAlreadyExistsAlert(true)
      setDuplicateIpAddressAlert(false);
    },
  });

  const onSubmit = (values: AllowlistData) => {
    if(duplicateIpAddress(allowlistData, values.ip)) {
      setIpAddressAlreadyExistsAlert(false);
      setDuplicateIpAddressAlert(true)
    } else {
      updateAllowlistEntryAndMutate.mutate(values);
    }
  }
  
  return (
    <Container>
      <DialogTitle>Add new IP address</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Add a new IP address to your company allowlist to ensure your staff can access Chronicle
        </DialogContentText>
        <Spacer size="md"/>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name="ip"
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
                  label="IP Address"
                  variant="outlined"
                  onChange={onChange}
                  value={value}
                  error={invalid}
                  helperText={getFormErrorMessage(error?.type)}
                />
              )}
            />
          </Grid>
          <Spacer size="md"/>
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
                  multiline
                  fullWidth
                  label="Description"
                  variant="outlined"
                  onChange={onChange}
                  value={value}
                  error={invalid}
                  helperText={getFormErrorMessage(error?.type)}
                />
              )}
            />
          </Grid>
        </Grid>
        <Spacer size="md"/>
        {duplicateIpAddressAlert &&
          <Alert severity="error">
            The specified IP Address already exists. Please enter a different one.
          </Alert>
        }
        {ipAddressAlreadyExistsAlert &&
          <Alert severity="error">
            You have entered an invalid IP address. IP Addresses are expressed as a set of four numbers. An example address might be 192.158.1.38. Each number in the set can range from 0 to 255.
          </Alert>
        }
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(false)} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
      </DialogActions>
    </Container>
  );
};


export default function AllowlistAddDialog({
  handleClose,
}: AllowlistAddProps) {
  return <AllowlistAddForm handleClose={handleClose} />
}