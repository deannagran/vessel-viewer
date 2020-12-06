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
        <h1>{userData.currVessel.name}</h1>
        <AddProjectMembersComponent></AddProjectMembersComponent>
        <VesselModelComponent></VesselModelComponent>
        <VesselFinderComponent></VesselFinderComponent>
          <GetAssociatedMembersComponent></GetAssociatedMembersComponent>
        <CommentsComponent></CommentsComponent>

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