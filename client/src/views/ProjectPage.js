import React, {useEffect, useContext, useState} from "react";
import UserContext from "../context/UserContext";
import VesselFinderComponent from "./VesselFinderComponent";
import VesselModelComponent from "./VesselModelComponent";
import AddProjectMembersComponent from "./AddProjectMembersComponent";
import GetAssociatedMembersComponent from "./GetAssociatedMembersComponent";
import Axios from "axios";
import CommentsComponent from "./CommentsComponent";

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
        <h1 class="h1-responsive font-weight-bold text-center my-4">{userData.currVessel.name}</h1>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridGap: 20 }}>
        <VesselModelComponent></VesselModelComponent>
        <VesselFinderComponent></VesselFinderComponent>
        </div>
        <h1>            </h1>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridGap: 20 }}>
        <div><center><h4 class="h1-responsive font-weight-bold text-center my-4">Project Members</h4><GetAssociatedMembersComponent></GetAssociatedMembersComponent>
        <AddProjectMembersComponent></AddProjectMembersComponent></center></div>
        <CommentsComponent></CommentsComponent>
        </div>


        
        <br></br>
        

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