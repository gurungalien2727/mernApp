import React, { Fragment, useState,useContext } from "react";
import UserContext from '../context/UserContext';
import { Link,useHistory } from "react-router-dom";
import axios from 'axios';




function Login () {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const history=useHistory();
  const {setUserData}=useContext(UserContext);  // function

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4000/users/auth",
        formData
      );
  
      
      setUserData({
        isAuthenticated:res.data.auth,
        token:res.data.token,
        user:res.data.user

      })
    
      localStorage.setItem('user',res.data.user.id);

      localStorage.setItem('token',res.data.token);
      history.push('/home');

    } catch (err) {
     
      alert("Error : " + err.response.data.msg);
    }
  };

  
  return (
    <Fragment>
      <h1>Sign In</h1>
      <p>Sign Into Your Account</p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
            
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <input type="submit" className="btn btn-light" value="Login" />
      </form>
      <p>
        <br />
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </Fragment>
  );
};

export default Login;
