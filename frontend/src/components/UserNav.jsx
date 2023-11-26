import React from 'react';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const UserNav = () => {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }} >
        <AppBar position="static">
          <Toolbar>
            <Typography id='react' variant="h5" component="div" sx={{ flexGrow: 1 }}>EmployeeCredApp</Typography>
            <Button color="inherit" size='large'><Link to = {'/userdash'} style={{color:'white',textDecoration:'none'}}>Home</Link></Button>
            <Button color="inherit" size='large'><Link to = {'/Logout'} style={{color:'white',textDecoration:'none'}}>Logout</Link></Button>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

export default UserNav;
