import React from 'react'
import UserList from './UserList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DisplayUsers from './DisplayUsers';
import Navbar from './Navbar';
import AddUser from './AddUser';

const Home:React.FC=()=>{
   return(
    <div>
    <BrowserRouter>
    <Navbar/>
    <Routes>
        <Route path='/' element={<UserList/>}></Route>
        <Route path='/usercards' element={<DisplayUsers/>}></Route>
        <Route path='/adduser' element={<AddUser/>}></Route>
    </Routes>
    </BrowserRouter>
    </div>
   )
}

export default Home;
