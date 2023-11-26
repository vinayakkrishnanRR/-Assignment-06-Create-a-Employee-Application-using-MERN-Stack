import React, { useState } from 'react';
import { TextField, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import axiosInst from '../Axiosinst';

const AddEmp = (props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: props.data ? props.data.name : '',
    position: props.data ? props.data.position : '',
    location: props.data ? props.data.location : '',
    salary: props.data ? props.data.salary : '',
    email: props.data ? props.data.email : '',
    password: props.data ? props.data.password : '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) { newErrors.name = 'Name is required';}
    if (!formData.position.trim()) { newErrors.position = 'Position is required';}
    if (!formData.location.trim()) { newErrors.location = 'Location is required';}
    if (!formData.salary.trim()) { newErrors.salary = 'Salary is required'; }
    if (!formData.email.trim()) { newErrors.email = 'Email is required';}
    else if (!/\S+@\S+\.\S+/.test(formData.email)) {newErrors.email = 'Invalid email address';}

    if (!formData.password.trim()) {newErrors.password = 'Password is required';}
    else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,}/.test(formData.password)){
      newErrors.password = 'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one digit, and one special character.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {    
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      if (props.method === 'put') {
      axiosInst.put('http://localhost:3000/emp/update/' + props.data._id, formData)
        .then((response) => {
          if (response.data === 'Updated Successfully') {
            alert(response.data);
            window.location.reload(false);
            navigate('/admindash');
          } else {
            alert('Credentials Not Updated');
          }
        });
    } else {
      if (validateForm()) {
      axiosInst.post('http://localhost:3000/emp/add', formData)
        .then((res) => {
          alert(res.data);
          navigate('/admindash');
        });
    }
  }};

  return (
    <div>
      <Box component="form"sx={{'& .MuiTextField-root': { m: 1, width: '100%', maxWidth: '400px' },}} noValidate autoComplete="off">
        <div id="sign">
          <form id="signform">
            <br />
            <h3 id="signhead">Employee Registration </h3>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  className="textfields"
                  id="outlined-error"
                  label="Name"
                  variant="outlined"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={Boolean(errors.name)}
                  helperText={errors.name}/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  className="textfields"
                  id="outlined-error"
                  label="Position"
                  variant="outlined"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  error={Boolean(errors.position)}
                  helperText={errors.position}/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  className="textfields"
                  id="outlined-error"
                  label="Location"
                  variant="outlined"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  error={Boolean(errors.location)}
                  helperText={errors.location}/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  className="textfields"
                  id="outlined-error"
                  label="Salary"
                  value={formData.salary}
                  variant="outlined"
                  name="salary"
                  onChange={handleChange}
                  error={Boolean(errors.salary)}
                  helperText={errors.salary}/>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  className="textfields text-full"
                  id="outlined-error"
                  label="Email"
                  variant="outlined"
                  name="email"
                  type='email'
                  value={formData.email}
                  onChange={handleChange}
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                  fullWidth/>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  className="textfields text-full"
                  id="outlined-error"
                  label="Password"
                  variant="outlined"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  error={Boolean(errors.password)}
                  helperText={errors.password}
                  fullWidth/>
              </Grid>
            </Grid><br />
            <Button id="submit" variant="contained" onClick={handleSubmit}>Submit</Button>
          </form>
        </div>
      </Box>
    </div>
  );
};

export default AddEmp;