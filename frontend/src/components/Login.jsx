import React from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axiosInst from '../Axiosinst';

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const navigate= useNavigate();
  const [errors, setErrors] = useState({});
  const inputHandler = (e) =>{
    setUser({...user,[e.target.name]:e.target.value})
    setErrors({ ...errors, [e.target.name]: '' });
  }

  const validateLog = () => {
    const Err = {};
    if (!user.email.trim()) {
      Err.email = 'Email is required';
    }
    if (!user.password.trim()) {
      Err.password = 'Password is required';
    }
    setErrors(Err);
    return Object.keys(Err).length === 0;
  };

  const addHandler=()=>{
    if (validateLog()) {
    axiosInst.post('http://localhost:3000/emp/login',user).then((res)=>{
      console.log('Login response:', res.data);
      alert(res.data.message);
      if (res.data.message === 'Login Success') {
        sessionStorage.setItem("userToken", res.data.token);
        if (user.email === 'admin@gmail.com') {
          navigate('/admindash');
        } else {
          navigate('/userdash');
        }
      }
  })

  .catch((error) => {
      if (error.response && error.response.status === 401) {
          alert('Invalid credentials.');
          setUser(' ');
      } else {
          console.error('Error during login:', error);
          alert('An error occurred.');
          setUser(' ');
      }});
    console.log(user)
  }}
  return (
    <div id='log'>
      <form className='loginform'>
        <Typography variant='h3' id='head'>Login</Typography><br/> <br/>
        <TextField variant='outlined' label='Email' name='email' onChange={inputHandler}  error={Boolean(errors.email)} helperText={errors.email} fullWidth/><br/><br/>
        <TextField type='password' variant='outlined' label='Password' name='password' onChange={inputHandler}  error={Boolean(errors.password)} helperText={errors.password} fullWidth/><br/><br/>
        <Button variant='contained' onClick={addHandler} fullWidth>Login</Button><br/> <br/> <br/>    
      </form>
    </div>
  );
}

export default Login;
