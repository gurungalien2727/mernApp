import React,{Fragment,useContext} from "react";
import UserContext from "../context/UserContext";
import { Route, Redirect } from "react-router-dom";


function PrivateRoute ({component:Component}){

    const {userData}=useContext(UserContext);

    if(localStorage.getItem('token')==null){
           return <Redirect to="/login" />;
    }
    else{
   
       return <Component />;
     
    }
  


}
export default PrivateRoute;
