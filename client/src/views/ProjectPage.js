import React, { useEffect, useContext } from "react";
import UserContext from "../context/UserContext";
import VesselFinderComponent from "./VesselFinderComponent";


export default function ProjectPage(props) {
  const { userData } = useContext(UserContext);
  useEffect(() => {
    if (!userData.user) props.history.push("/login");
  });
  
  return (
      <div>
        <h1>Project Page</h1>
        <VesselFinderComponent></VesselFinderComponent>

      </div>
    
        
    );
}