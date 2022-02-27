import React from 'react';
import { ArrowBack } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export interface PageHeaderProps {
  pageTitle: string;
  backURL?: string;
  helpText?: string;
  action?: React.ReactNode;
}

export default function PageHeader({
  pageTitle,
  helpText,
  action,
  backURL,
}: PageHeaderProps) {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {backURL && (
          <IconButton
            aria-label="go back"
            size="large"
            sx={{ mr: 1 }}
            color="inherit"
            onClick={() => navigate(backURL)}
          >
            <ArrowBack />
          </IconButton>
        )}
        <Box>
          <Typography variant="h2">{pageTitle}</Typography>
          {helpText && <Typography variant="body2">{helpText}</Typography>}
        </Box>
      </Box>
      {action && <Box>{action}</Box>}
    </Box>
  );
}
