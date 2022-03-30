import React, { useState } from 'react';
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
  TableRow,
  Typography,
  Dialog,
  List,
  ListItemButton,
  ListItem,
  ListSubheader,
  ListItemText,
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import PageHeader from '../../components/page-header/PageHeader';
import Spacer from '../../components/spacer/Spacer';
import AllowlistAdd from './AllowlistAdd';
import { useAllowList, useRoleList } from '../../data';

const ipList = [
  { ip: '192.168.0.1', description: 'Some description about this IP address' },
  { ip: '192.168.0.2', description: 'Some description about this IP address' },
  { ip: '192.168.0.3', description: 'Some description about this IP address' },
  { ip: '192.168.0.4', description: 'Some description about this IP address' },
];

const AllowListRow = () =>
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
  ));

  
export default function AllowListPage() {

  const { data: allowListData} = useAllowList();
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const { data: roleListData } = useRoleList();

  return (
    <Container maxWidth="sm">
      <Dialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
      >
        <AllowlistAdd handleClose={() => setAddDialogOpen(false)} />
      </Dialog>
        <PageHeader
          pageTitle="IP Allowlist"
          helpText="Add IP address to the allowlist to ensure your staff member can only access
          the application from certain locations"
          action={
            <Button variant="contained" onClick={() => setAddDialogOpen(true)}>
              Add New
            </Button>
          }
        />
      <Spacer size="lg" />
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {allowListData?.map((s) => (
              <TableRow hover>
                <TableCell>
                  <Box>
                    <Typography variant="h2">{s.ip}</Typography>
                    <Typography variant="body2">{s.description}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <List
        sx={{ width: '100%', bgcolor: 'background.paper' }}
        subheader={<ListSubheader component="div">Role Name</ListSubheader>}
      >
        {roleListData?.map((s) => (
          <ListItem
            disablePadding
            key={s.id}
            sx={{ cursor: 'pointer' }}
            onClick={() => navigate(s.id)}
          >
            <ListItemButton>
              <ListItemText primary={s.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List
        sx={{ width: '100%', bgcolor: 'background.paper' }}
        subheader={<ListSubheader component="div">Role Name</ListSubheader>}
      >
        {allowListData?.map((s) => (
          <ListItem
            disablePadding
            key={s.id}
            sx={{ cursor: 'pointer' }}
            onClick={() => navigate(s.id)}
          >
            <ListItemButton>
              <ListItemText primary={s.ip} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
    </Container>
  );
}
