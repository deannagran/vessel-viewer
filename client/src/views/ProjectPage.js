import React, { useEffect, useContext } from "react";
import UserContext from "../context/UserContext";
import VesselFinderComponent from "./VesselFinderComponent";
import VesselModelComponent from "./VesselModelComponent";
import AddProjectMembersComponent from "./AddProjectMembersComponent";
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
      <div className = "ppage">
        <h1 className="ppageHeader">{userData.currVessel.name} <AddProjectMembersComponent></AddProjectMembersComponent></h1>
        <table className="ptable">
          <tr>
            <td>
            <VesselModelComponent></VesselModelComponent>
            
            </td>
            <td>
            
            
            
            </td>
          </tr>
          <tr>
            <td>
            <VesselFinderComponent></VesselFinderComponent>
            <CommentsComponent></CommentsComponent>
            </td>
            <td>
            
            
            
            </td>
          </tr>
          
          
          
          
        </table>
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