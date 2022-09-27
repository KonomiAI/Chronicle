import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';
import { Activity } from '../../types';
import { penniesToPrice } from '../../utils';

export interface ActivityCardProps {
  activity: Activity;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => (
  <Card variant="outlined">
    <CardContent>
      <Link to={`/inventory/activities/${activity.id}`}>
        <Typography variant="h6">{activity.name}</Typography>
      </Link>
      <Typography variant="caption">
        {penniesToPrice(activity.price)}
      </Typography>
    </CardContent>
  </Card>
);
