import React from 'react';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const AdminNav = () => {
  
  return (
    <div>
      <Box sx={{ flexGrow: 1 }} >
        <AppBar position="static">
          <Toolbar>
            <Typography id='react' variant="h5" component="div" sx={{ flexGrow: 1}}>EmployeeCredApp</Typography>
            <Button color="inherit" size='large'><Link to = {'/admindash'} style={{color:'white',textDecoration:'none'}}>Home</Link></Button>
            <Button color="inherit" size='large'><Link to = {'/addemp'} style={{color:'white',textDecoration:'none'}}>Add Employee</Link></Button>
            <Button color="inherit" size='large'><Link to = {'/Logout'}  style={{color:'white',textDecoration:'none'}}>Logout</Link></Button>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

export default AdminNav;
