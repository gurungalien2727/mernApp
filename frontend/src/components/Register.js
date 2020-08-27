import React, { Fragment, useState } from "react";

import { Link,useHistory} from "react-router-dom";
import axios from 'axios';

function Register () {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    
  });

  const { name, email, password } = formData;
  const history=useHistory();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
     try {
       const res = await axios.post("http://localhost:4000/users", formData);
       alert(res.data.msg);
       history.push('/');

       
     } catch (err) {
      alert(err.response.data.msg);
       
     }
    
  };


  return (
    <Fragment>
      <h1>Sign Up</h1>

      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={onChange}
    
          />
        </div>
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
      
        <input type="submit" className="btn btn-light" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};



export default Register;
