import React from 'react';
import { Link } from 'react-router-dom';

import { TableCell, TableRow, Typography } from '@mui/material';

import { Audit } from '../../types';
import resolveAuditMessage from './resolver';

export interface AuditRowProps {
  audit: Audit;
}

const AuditRow: React.FC<AuditRowProps> = ({ audit }) => {
  const dateTime = new Date(audit.createdAt).toLocaleString();

  return (
    <TableRow hover sx={{ cursor: 'pointer' }}>
      <TableCell style={{ width: '180px' }}>
        <Typography variant="caption">{dateTime}</Typography>
      </TableCell>
      <TableCell>
        <Link to={`/staff/${audit.staffId}`}>{audit.createdBy.email}</Link>
      </TableCell>
      <TableCell>{resolveAuditMessage(audit)}</TableCell>
    </TableRow>
  );
};

export default AuditRow;
