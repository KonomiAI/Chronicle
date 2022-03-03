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
          gap: '2em',
        }}
      >
        <Box>
          <Typography variant="h2">IP Allowlist</Typography>
          <Typography variant="body2">
            Add IP address to the allowlist to ensure your staff member can only access
            the application from certain locations
          </Typography>
        </Box>
        <Box
          sx={{
            whiteSpace: 'nowrap',
          }}
        >
          <Button variant="contained">Add New</Button>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow hover>
              <TableCell>
                <Box>
                  <Typography variant="h3">192.168.0.1</Typography>
                  <Typography variant="body2">Some description about this IP address</Typography>
                </Box>
              </TableCell>
              <TableCell>
                <IconButton>
                  <DeleteIcon/>
                </IconButton>
              </TableCell>
            </TableRow>
            <TableRow hover>
              <TableCell>
                <Box>
                  <Typography variant="h2">192.168.0.1</Typography>
                  <Typography variant="body2">Some description about this IP address</Typography>
                </Box>
              </TableCell>
              <TableCell>
                <IconButton>
                  <DeleteIcon/>
                </IconButton>
              </TableCell>
            </TableRow>
            <TableRow hover>
              <TableCell>
                <Box>
                  <Typography variant="h3">192.168.0.1</Typography>
                  <Typography variant="body2">Some description about this IP address</Typography>
                </Box>
              </TableCell>
              <TableCell>
                <IconButton>
                  <DeleteIcon/>
                </IconButton>
              </TableCell>
            </TableRow>
            <TableRow hover>
              <TableCell>
                <Box>
                  <Typography variant="h3">192.168.0.1</Typography>
                  <Typography variant="body2">Some description about this IP address</Typography>
                </Box>
              </TableCell>
              <TableCell>
                <IconButton>
                  <DeleteIcon/>
                </IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
