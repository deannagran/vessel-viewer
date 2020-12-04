import React, {useEffect, useContext, useState} from "react";
import UserContext from "../context/UserContext";
import VesselFinderComponent from "./VesselFinderComponent";
import VesselModelComponent from "./VesselModelComponent";
import AddProjectMembersComponent from "./AddProjectMembersComponent";
import Axios from "axios";

export default function ProjectPage(props) {
  const { userData, setUserData } = useContext(UserContext);
  let associatedMembers = null;
  const [memberName, setMemberName] = useState(0);
  const [memberArray, setMemberArray] = useState([]);

  useEffect(() => {
    if (!userData.user){
      props.history.push("/login");
    }

      //query the database to autopopulate ProjectPage with members
      const getmembers = async (index) => {
          associatedMembers = await Axios.post("http://localhost:5000/users/getMember",
              { user: userData,
                  i: index
              });

          if(associatedMembers){
              console.log(associatedMembers.data);

              setMemberName(""+associatedMembers.data.retFName+" "+associatedMembers.data.retLName);

              let memberObject = ({fName: ""+associatedMembers.data.retFName, lName:""+associatedMembers.data.retLName,
                  role: ""+associatedMembers.data.retRole } );

              memberArray.push(memberObject);
          }
      }

      if(userData.user && memberArray.length === 0){
          //add to array of all associated members:
          for(let i = 0; i < userData.currVessel.associatedUsers.length; i++){
              getmembers(i);
              //setMemberName("");
          }
      }
  });


if(userData.currVessel){
  return (
      <div>
        <h1>{userData.currVessel.name}</h1>
        <AddProjectMembersComponent></AddProjectMembersComponent>
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