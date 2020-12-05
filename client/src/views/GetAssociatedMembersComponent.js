import React, {useEffect, useContext, useState} from "react";
import UserContext from "../context/UserContext";
import VesselFinderComponent from "./VesselFinderComponent";
import VesselModelComponent from "./VesselModelComponent";
import AddProjectMembersComponent from "./AddProjectMembersComponent";
import Axios from "axios";

    const GetAssociatedMembersComponent = () => {
        const { userData, setUserData } = useContext(UserContext);
        let associatedMembers = null;
        const [memberName, setMemberName] = useState(0);
        const [memberArray, setMemberArray] = useState([]);

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
            }else{
                setMemberName("No Associated Members");
            }
        }

        if(userData.user && memberArray.length === 0){
            //add to array of all associated members:
            for(let i = 0; i < userData.currVessel.associatedUsers.length; i++){
                getmembers(i);
                //setMemberName("");
            }
        }
        let listofMembers = memberArray.map(member =>
            `<div class="card bg-light mb-3" style="width: 18rem">
              <img class="card-img-top" src="" alt="Card image">
              <div class="card-body">
              <h3 class="card-title">${member.fName + " " + member.lName}</h3>
              <button id="${member.lName}" onClick={proj} class="register-button ">Update User Roles</button> 
              <br>
              </div>
              </div>
              <br>
       
      `
        ).join('');


        /*let membersString = "No associated members";
        if(memberArray.length > 0){
            membersString = "";
            for(let i = 0; i<memberArray.length/2; i++){
                let fName = memberArray[i].fName;
                let lName = memberArray[i].lName;
                let role = memberArray[i].role;
                let member = "Name: " + fName + " " + lName + " Role: " + role;
                membersString = membersString + member;
            }
        }
        return (
            <h3>{membersString}</h3>
        );*/
    }

    export default GetAssociatedMembersComponent;