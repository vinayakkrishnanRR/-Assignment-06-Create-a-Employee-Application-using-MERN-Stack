
import './App.css';
import Login from './components/Login.jsx';
import UserHome from './pages/UserHome.jsx';
import Main from './components/Main.jsx';
import AddEmp from './pages/AddEmp.jsx';
import AdminHome from './pages/AdminHome.jsx';
import MainAdmin from './components/MainAdmin.jsx';
import { Route, Routes } from 'react-router-dom';
import { Requireauth } from './Auth';
import { Logout } from './Logout';

function App() {
  return (
    <div className="App">
      <Routes>    
      <Route path = '/' element={<Login/>}/>
      <Route path = '/Logout' element={<Logout/>}/>
      <Route path = '/userdash' element={<Requireauth><Main child ={<UserHome/>}/></Requireauth>}/>
      <Route path = '/addemp' element={<Requireauth><MainAdmin child ={<AddEmp/>}/></Requireauth>}/>
      <Route path = '/admindash' element={<Requireauth><MainAdmin child ={<AdminHome/>}/></Requireauth>}/>      
    </Routes>
  
    </div>
  );
}

export default App;
