import React, { useEffect, useContext } from "react";
import UserContext from "../context/UserContext";

export default function ProjectPage(props) {
  const { userData } = useContext(UserContext);
  useEffect(() => {
    console.log("hey");
    if (!userData.user) props.history.push("/login");
    console.log("heyooo");
    
  });
  
  return (
     <h1>Contact Digital Twin Marine</h1>
        
    );
}