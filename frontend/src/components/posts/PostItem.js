
import React, { Fragment,useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import axios from 'axios';

function PostItem (props) {
  const { userData } = useContext(UserContext);
  
  const delPost= async (id) => {

    try {
      const res = await axios.delete(
        "http://localhost:4000/posts/"+id,{
            headers:{'token':userData.token}
        },
        {
            headers:{'token':userData.token}
        }
      );
      
      
       window.location.reload(false);
      

    } catch (err) {
     
    }
  };



  return <div className="post bg-white p-1 my-1">
    <div>
      <h4>{props.post.name} </h4>
    </div>
    <div>
      <p className="my-1">{props.post.text}</p>

      
{props.post.user==localStorage.getItem('user') &&
    
     <p>  <button    className="btn btn-danger" onClick={()=>delPost(props.post._id)}
          >
            Delete
          </button>
          
        </p>     }
        
    </div>
  </div>


        }

export default PostItem;