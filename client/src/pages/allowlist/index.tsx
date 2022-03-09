import React from 'react';
import {
  Box,
  Button,
  IconButton,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import PageHeader from '../../components/page-header/PageHeader';

const ipList = [
  { ip: "192.168.0.1", description: "Some description about this IP address" },
  { ip: "192.168.0.2", description: "Some description about this IP address" },
  { ip: "192.168.0.3", description: "Some description about this IP address" },
  { ip: "192.168.0.4", description: "Some description about this IP address" },
];

const AllowListRow = () => (
  ipList.map(({ ip, description }) => (
    <TableRow hover>
      <TableCell>
        <Box>
          <Typography variant="h2">{ip}</Typography>
          <Typography variant="body2">{description}</Typography>
        </Box>
      </TableCell>
      <TableCell>
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  )
))
export default function AllowListPage() {
  return (
    <Container maxWidth="sm">
      <Box  
        sx={{
          marginTop: '3em',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: '1em',
          gap: '5em',
        }}
      >
        <PageHeader 
          pageTitle="IP Allowlist"
          helpText="Add IP address to the allowlist to ensure your staff member can only access
          the application from certain locations"
          action={
            <Button variant="contained">Add New</Button>
          }
        />
      </Box>   
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {AllowListRow()}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
