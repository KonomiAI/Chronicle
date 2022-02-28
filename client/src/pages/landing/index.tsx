import React, { useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { useActivityStore } from '../../store/activities'


function LandingPage() {
  const getAllActivities = useActivityStore(state => state.fetchActivities)
  useEffect(() => {
    getAllActivities();
  });

  return (
    <Container>
      <Typography variant="h1">Good morning</Typography>
      <Typography variant="body2">Here is your daily briefing</Typography>
    </Container>
  );
}

export default LandingPage;
