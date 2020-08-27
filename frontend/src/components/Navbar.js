import React, { Fragment,useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";

function Navbar() {

    const { setUserData } = useContext(UserContext);

const click=e=>{

 setUserData({
   isAuthenticated: false,
   token: null,
   user: null,
 });

 localStorage.removeItem('token');

}

  const authLinks = (
    <ul>
      <li>
        <Link to="/home">
          <span className="hide-sm">Home</span>
        </Link>
      </li>
      <li>
        <Link onClick={click} to="/login">
          <span>Logout</span>
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      
       
        <Fragment>{ authLinks}</Fragment>
      
    </nav>
  );
};

export default Navbar;
