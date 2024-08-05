import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Navbar:React.FC=()=>{
   return(
    <div>
    <nav className="p-4 bg-purple-900">
      <Link to="/" className="mr-4 text-white hover:bg-purple-600 p-3 rounded-xl">User List</Link>
      <Link to="/usercards" className="mr-4 text-white hover:bg-purple-600 p-3 rounded-xl">User Cards</Link>
      <Link to="/adduser" className="mr-4 text-white hover:bg-purple-600 p-3 rounded-xl">Add User</Link>
    </nav>
    </div>
   )
}

export default Navbar;
