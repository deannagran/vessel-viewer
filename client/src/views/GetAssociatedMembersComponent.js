import React, {useEffect, useContext, useState} from "react";
import UserContext from "../context/UserContext";
import VesselFinderComponent from "./VesselFinderComponent";
import VesselModelComponent from "./VesselModelComponent";
import AddProjectMembersComponent from "./AddProjectMembersComponent";
import Axios from "axios";
import {useHistory} from "react-router-dom";

    const GetAssociatedMembersComponent = () => {
        const { userData, setUserData } = useContext(UserContext);
        let associatedMembers = null;
        const [memberName, setMemberName] = useState(0);
        const [memberArray, setMemberArray] = useState([]);
        let changeMember = null;

        //query the database to autopopulate ProjectPage with members
        const getmembers = async (index) => {
            associatedMembers = await Axios.post("http://localhost:5000/users/getMember",
                { user: userData,
                    i: index
                });

            if(associatedMembers){
                console.log(associatedMembers.data);

                setMemberName(""+associatedMembers.data.retFName+" "+associatedMembers.data.retLName);

                let memberObject = ({memberID: ""+associatedMembers.data.retMemberID, fName: ""+associatedMembers.data.retFName, lName:""+associatedMembers.data.retLName,
                    role: ""+associatedMembers.data.retRole } );

                memberArray.push(memberObject);
            }else{
                setMemberName("No Associated Members");
            }
        }

        const updatemember = async (id, role, index) => {
            changeMember = await Axios.post("http://localhost:5000/users/updateMemberRole",
                { vesselID: userData.currVessel.id,
                    memberID: id,
                    newRole : role
                });

            if(changeMember){
                console.log(associatedMembers.data);

                memberArray[index].role = role;

                let memberObject = ({memberID: ""+associatedMembers.data.retMemberID, fName: ""+associatedMembers.data.retFName, lName:""+associatedMembers.data.retLName,
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
        const history = useHistory();
        const proj = (event) => {
            //brings user to the project page, and updates our currVessel attribute depending on the button user clicked:

            const id = event.target.id;
            let role = null;
            let index = null;
            console.log(id);

            for(let i = 0; i<memberArray.length; i++){
                if(memberArray[i].memberID == id){
                    index = i;
                    role = memberArray[i].role;
                    break;
                }
            }
            if(role == "Admin"){
                role = "Not Admin";
            }else{
                role = "Admin";
            }
            updatemember(id,role, index);

            /*if(index != null){
                history.push("/project")
                if(userData){
                    setUserData({
                        token: userData.user.token,
                        user: userData.user,
                        currVessel: vesselArray[index]
                    });
                }
                setVesselArray([]);
            }*/
        };


        let listOfMembers = memberArray.map(member =>
            `<div class="card bg-light mb-3" style="width: 18rem">
              <img class="card-img-top" src="" alt="Card image">
              <div class="card-body">
              <h3 class="card-title">${member.fName + " " + member.lName}</h3>
              <button id="${member.memberID}" onClick={proj} class="register-button ">Update User Roles</button> 
              <br>
              </div>
              </div>
              <br>
       
      `
        ).join('');

        return (
                <table border = "0" cellPadding = "25" cellSpacing = "10">
                    <div  onClick={proj} dangerouslySetInnerHTML={{__html: listOfMembers}}></div>
                </table>);


        /* let membersString = "No associated members";
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
        );
                */
    }

    export default GetAssociatedMembersComponent;