import React, { useEffect, useContext } from "react";
import UserContext from "../context/UserContext";
import VesselFinderComponent from "./VesselFinderComponent";
import VesselModelComponent from "./VesselModelComponent";

export default function ProjectPage(props) {
  const { userData } = useContext(UserContext);
  useEffect(() => {
    if (!userData.user) props.history.push("/login");
  });
  
  return (
      <div>
        <h1>Project Page</h1>
        <VesselModelComponent></VesselModelComponent>
        <VesselFinderComponent></VesselFinderComponent>
      </div>
    
        
    );
}