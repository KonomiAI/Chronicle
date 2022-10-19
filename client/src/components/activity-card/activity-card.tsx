import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { Activity } from '../../types';
import { penniesToPrice } from '../../utils';

export interface ActivityCardProps {
  activity: Activity;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => (
  <Card variant="outlined">
    <CardContent>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Link to={`/inventory/activities/${activity.id}`}>
          <Typography variant="h6" sx={{ mr: 1 }}>
            {activity.name}
          </Typography>
        </Link>
        {activity.isArchived && (
          <Tooltip
            title="This activity has a newer version, if you remove or change the activity you will not be able to undo this action"
            arrow
          >
            <Chip
              variant="outlined"
              color="warning"
              size="small"
              label="Legacy record"
              clickable
            />
          </Tooltip>
        )}
      </Box>
      <Typography variant="caption">
        {penniesToPrice(activity.price)}
      </Typography>
    </CardContent>
  </Card>
);
