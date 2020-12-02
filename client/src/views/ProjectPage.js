import React, { useEffect, useContext } from "react";
import UserContext from "../context/UserContext";
import VesselFinderComponent from "./VesselFinderComponent";
import VesselModelComponent from "./VesselModelComponent";
import AddProjectMembersComponent from "./AddProjectMembersComponent";

export default function ProjectPage(props) {
  const { userData, setUserData } = useContext(UserContext);
  useEffect(() => {
    if (!userData.user) props.history.push("/login");
  });



  return (
      <div>
        <h1>{userData.currVessel}</h1>
        <AddProjectMembersComponent></AddProjectMembersComponent>
        <VesselModelComponent></VesselModelComponent>
        <VesselFinderComponent></VesselFinderComponent>

        
        {/* <button onClick={showAdd} class="register-button">Add Project Member</button> */}

        


      </div>
      
    
        
    );
}