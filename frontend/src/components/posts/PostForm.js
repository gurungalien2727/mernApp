import React, { useState,useContext } from "react";
import UserContext from "../../context/UserContext";
import axios from 'axios';


function PostForm ()  {
  const [text, setText] = useState("");
   const {userData}=useContext(UserContext);

   

   
  const onSubmit = async (e) => {

    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4000/posts",{
            "text":text
        },
        {
            headers:{'token':userData.token}
        }
      );
      
       setText("");
       window.location.reload(false);
      

    } catch (err) {
   
    }
  };

  return (
    <div className="post-form">
      <form
        className="form my-1"
        onSubmit={onSubmit}
      >
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Write something ..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <input type="submit" className="btn btn-light" value="Submit" />
      </form>
    </div>
  );
};


export default PostForm;
