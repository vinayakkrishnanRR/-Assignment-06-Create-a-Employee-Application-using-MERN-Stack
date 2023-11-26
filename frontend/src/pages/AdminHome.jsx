
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../Axiosinst';
import Addemployee from './AddEmp' ;

const AdminHome = () => {
  const [employees, setEmployees] = useState([]);
  var [update,setUpdate] = useState(false);
  var [singleValue,setSingleValue]=useState([])
  useEffect(()=>{
    fetchPost();
  },[]);

  function fetchPost(){
   axiosInstance.get('http://localhost:3000/emp').then((res)=>{
     setEmployees(res.data);
   
   })
  }

  const updateBlog = (val)=>{
    console.log("Updating",val);
    setUpdate(true);
    setSingleValue(val)
  }

  function deletePost (id) {
   axiosInstance.delete(`http://localhost:3000/emp/delete/${id}`)
     .then((res) => {
      alert(res.data);
      fetchPost();
     })
     .catch((error) => {
       console.error('Error deleting post:', error);
     });
  };

  let finalJSX= (
    <div className="table-container">
      <TableContainer className="employee-table" component={Paper} sx={{ maxHeight: 440 }}>
      <Table >
        <TableHead id='thead' >
          <TableRow>
            <TableCell className="table-cell" align="center" >Name</TableCell>
            <TableCell className="table-cell" align="center">Position</TableCell>
            <TableCell className="table-cell" align="center">Location</TableCell>
            <TableCell className="table-cell" align="center">Salary</TableCell>
            <TableCell className="table-cell" align="center">Email</TableCell>
            <TableCell className="table-cell" align="center">Password</TableCell>
            <TableCell className="table-cell" align="center"> </TableCell>
            <TableCell className="table-cell" align="center"> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee._id}>
              <TableCell className="table-cell" align="center">{employee.name}</TableCell>
              <TableCell className="table-cell" align="center">{employee.position}</TableCell>
              <TableCell className="table-cell" align="center">{employee.location}</TableCell>
              <TableCell className="table-cell" align="center">{employee.salary}</TableCell>
              <TableCell className="table-cell" align="center">{employee.email}</TableCell>
              <TableCell className="table-cell" align="center">{employee.password}</TableCell>
              <TableCell className="table-cell"  align="center">
              <Button className="action-button" onClick={() => deletePost(employee._id)}>Delete</Button> 
              </TableCell>
              <TableCell className="table-cell" align="center">
              <Button className="action-button" onClick={()=>updateBlog(employee)} color='primary'>Edit</Button> 
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
  if(update) finalJSX=<Addemployee method="put" data={singleValue}/>

  return (
      finalJSX
  )
}
export default AdminHome;
