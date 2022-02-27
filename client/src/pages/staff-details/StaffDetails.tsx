import React from 'react';
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
} from '@mui/material';
import PageHeader from '../../components/page-header/PageHeader';
import Spacer from '../../components/spacer/Spacer';

export default function StaffDetailsPage() {
  return (
    <Container>
      <PageHeader pageTitle="Daniel Wu" backURL="/staff" />
      <Spacer size="lg" />
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2 }}>
            About Daniel Wu
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="firstName"
                label="First Name"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="lastName"
                label="Last Name"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="email"
                type="email"
                label="Email Address"
                variant="outlined"
                autoComplete="nope"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="genderLabel">Gender</InputLabel>
                <Select
                  labelId="genderLabel"
                  id="demo-simple-select"
                  value="male"
                  label="Gender"
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                  <MenuItem value="na">Prefer not to disclose</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Permissions
          </Typography>
          <FormControl fullWidth>
            <InputLabel id="roleLabel">Role</InputLabel>
            <Select
              id="roleSelect"
              value={['masseuse']}
              label="Role"
              labelId="roleLabel"
              multiple
            >
              <MenuItem value="masseuse">Masseuse</MenuItem>
              <MenuItem value="female">Receptionist</MenuItem>
              <MenuItem value="other">Admin</MenuItem>
              <MenuItem value="na">IT folk</MenuItem>
            </Select>
          </FormControl>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2, color: 'error.main' }}>
            Danger Zone
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <Typography variant="h6">Suspend staff</Typography>
              <Typography variant="body2">
                Suspending a staff will suspend the user&apos;s ability to
                access the app.
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
              <Button variant="text" color="error">
                Suspend
              </Button>
            </Grid>
            <Grid item xs={10}>
              <Typography variant="h6">Delete staff</Typography>
              <Typography variant="body2">
                Delete this staff from your team. You must suspend the staff
                first.
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
              <Button variant="text" color="error" disabled>
                Delete
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
