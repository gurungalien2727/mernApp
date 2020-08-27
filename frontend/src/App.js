import React, { useState,Fragment,useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './components/Login';
import Register from "./components/Register";
import Home from "./components/Home";
import UserContext from './context/UserContext';
import PrivateRoute from './components/PrivateRoute';
import Post from './components/posts/Post';
import axios from 'axios';
import "./App.css";

function App() {
  const[userData,setUserData]=useState({
    isAuthenticated:false,
    token:undefined,
    user:undefined
  })

  useEffect(()=>{
        const checkLoggedIn=async()=>{
      let token=localStorage.getItem('token');
      
        if(token==null){
          localStorage.setItem('auth-token',"");
          token =
            "";
        }
        
        const tokRes=await axios.post('http://localhost:4000/users/tokenIsValid',null,{
          headers:{'token':token}
        });
    
        if(tokRes.data){
    
        
          const userData = await axios.get(
            "http://localhost:4000/users",
            
            {
              headers: { 'token':token },
            }
          );

          setUserData({
            isAuthenticated:true,token,user:userData.data
          })
        }
      
        }
        checkLoggedIn();
  },[])


  return (
    <Router>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Fragment>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/home" component={Home} />
            <PrivateRoute exact path="/posts" component={Post} />
         
          </Switch>
        </Fragment>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
