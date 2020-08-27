import React, { Fragment,useContext } from "react";
import Navbar from './Navbar';
import Post from './posts/Post';
import UserContext from "../context/UserContext";

function Home() {

    const { userData } = useContext(UserContext);

   
    if(userData.isAuthenticated){
        return (
          <Fragment>
            <Navbar />
            <br />
            <br />
            <h1>Posts</h1>
           
            <Post />
          </Fragment>
        );

    }

    else{
        return <div>Loading ...</div>
    }
  







}



export default Home;
