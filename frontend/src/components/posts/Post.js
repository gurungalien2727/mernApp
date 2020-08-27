import React, { Fragment, useEffect,useContext,useState } from "react";
import UserContext from "../../context/UserContext";
import PostItem from "./PostItem";
import PostForm from "./PostForm";
import axios from 'axios';
import { set } from "mongoose";


function Post(props) {

 const [posts,setPosts]=useState([]);
 const [uid,setUid]=useState();
 const {userData}=useContext(UserContext);


 useEffect(()=>{
  
   
 const showPosts= async (e) => {

    try {
      const res = await axios.get(
        "http://localhost:4000/posts",
        {
            headers:{'token':userData.token}
        }
      );
     setPosts(res.data)
     setUid(userData.user._id);
   
    }
    catch(err){

    }
 }
    showPosts();
    
  }
  ,[]);

  
  return (

   
    <Fragment>
      <PostForm />

      <div className="posts" style={{width:"60%"}}>
        {posts.map((post) => (
          <PostItem key={post._id} post={post}  />
        ))}
      </div>
    </Fragment>
  );
};



export default Post;
