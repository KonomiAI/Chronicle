import React, { useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { useStore } from '../../store'


function LandingPage() {
  //const {test, testAdd} = useStore(state => ({test: state.test, testAdd: state.add})) 
  const [test, testAdd] = useStore((state) => [state.test, state.add])
  const getAllActivities = useStore(state => state.fetchActivities)
  useEffect(() => {
    getAllActivities();
    console.log(`test: ${test}`)
    testAdd();
  }, []);

  return (
    <Container>
      <Typography variant="h1">Good morning</Typography>
      <Typography variant="body2">Here is your daily briefing</Typography>
    </Container>
  );
}

export default LandingPage;
