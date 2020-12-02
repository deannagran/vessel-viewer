import React, { useEffect, useContext } from "react";
import UserContext from "../context/UserContext";
import VesselFinderComponent from "./VesselFinderComponent";
import VesselModelComponent from "./VesselModelComponent";
import AddProjectMembersComponent from "./AddProjectMembersComponent";

export default function ProjectPage(props) {
  const { userData, setUserData } = useContext(UserContext);
  useEffect(() => {
    if (!userData.user){
      props.history.push("/login");
    }

    
  });


if(userData.currVessel){
  return (
      <div>
        <h1>{userData.currVessel[0]}</h1>
        <h2>{userData.currVessel[3]}</h2>
        <VesselModelComponent></VesselModelComponent>
        <VesselFinderComponent></VesselFinderComponent>

        {/* <button onClick={showAdd} class="register-button">Add Project Member</button> */}
      </div>
    );
  }else{
    return (
      <div>
        <h1>Project Name</h1>
        {/* <button onClick={showAdd} class="register-button">Add Project Member</button> */}
      </div>
    );
  }
}