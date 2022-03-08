import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Alert,
  Checkbox,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getRole, getFeatures } from '../../data';
import PageHeader from '../../components/page-header/PageHeader';
import Spacer from '../../components/spacer/Spacer';
import SaveBar from '../../components/save-bar/save-bar';

export default function RoleDetails() {
  const { id } = useParams();
  if (!id) {
    return (
      <Container>
        <Alert severity="error">Role ID is not defined</Alert>
      </Container>
    );
  }
  // getFeatures().then(x => {

  // })
  // console.log(features)

  const queryClient = useQueryClient();
  
  let features = useQuery('users', getFeatures)

  const cacheKey = `role-${id}`;
  const { data } = useQuery(cacheKey, () => getRole(id));

  const [isSaveOpen, setIsSaveOpen] = useState(true);
  return (
    <>
      <Container>
        {data && (
          <>
            <PageHeader
              pageTitle={`${data.name}`}
              backURL="/roles"
            />
            <Spacer size="lg" />
            <Card sx={{ mb: 4 }}>
              <CardContent>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  About this role
                </Typography>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    variant="outlined"
                  />
                </Grid>
              </CardContent>
            </Card>
            <Card sx={{ mb: 4 }}>
              <CardContent>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  Permissions
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={8}></Grid>
                  <Grid item xs={2}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Read
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Write
                    </Typography>
                  </Grid>
                  {features.data.map((s) => (
                  <>
                    <Grid item xs={8}>
                      <Typography ml={2}>
                        {s.name}
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Checkbox checked={data.permissions[s.name].read}/>
                    </Grid>
                    <Grid item xs={2}>
                      <Checkbox checked={data.permissions[s.name].write}/>
                    </Grid>
                  </>
                  ))}
                </Grid>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Typography variant="h5" sx={{ mb: 2, color: 'error.main' }}>
                  Danger Zone
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={10}>
                    <Typography variant="h6">Delete this role</Typography>
                    <Typography variant="body2">
                      You cannot delete this role if it is currently assigned to any staff.
                      Please remove the role from all staff first.
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Button
                      variant="text"
                      color="error"
                    >
                      Delete
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </>
        )}
        <SaveBar open={isSaveOpen} onSave={() => { }} />
      </Container>
    </>
  );
}
