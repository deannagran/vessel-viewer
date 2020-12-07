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
        const [open, setOpen] = useState(false);
        let deleteMember = null;

        //query the database to autopopulate ProjectPage with members
        const getmembers = async (index) => {
            console.log(userData.currVessel);
            associatedMembers = await Axios.post("http://localhost:5000/users/getMember",
                { vessel: userData.currVessel,
                    i: index
                });

            if(associatedMembers){
                console.log(associatedMembers.data);

                setMemberName(""+associatedMembers.data.retFName+" "+associatedMembers.data.retLName);

                let memberObject = ({memberID: ""+associatedMembers.data.retMemberID, fName: ""+associatedMembers.data.retFName, lName:""+associatedMembers.data.retLName,
                    role: ""+associatedMembers.data.retRole, email: ""+associatedMembers.data.retEmail } );

                memberArray.push(memberObject);
            }else{
                setMemberName("No Associated Members");
            }
        }

        const updatemember = async (id, role) => {
            changeMember = await Axios.post("http://localhost:5000/users/updateMemberRole",
                { vesselID: userData.currVessel.id,
                    memberID: id,
                    rolesObject : role
                });

            if(changeMember){
                console.log(changeMember.data.retVessel);

                //memberArray[index].role = role;
            }
        }

        const deletemember = async (id) => {
            deleteMember = await Axios.post("http://localhost:5000/users/deleteMember",
                { vesselID: userData.currVessel.id,
                    memberID: id
                });
            if(deleteMember){
                console.log(deleteMember.data.retSuccess);
            }
        }

        if(userData.user && memberArray.length === 0){
            if(userData.currVessel) {
                //add to array of all associated members:
                for (let i = 0; i < userData.currVessel.associatedUsers.length; i++) {
                    getmembers(i);
                    //setMemberName("");
                }
            }
        }
        const history = useHistory();
        const proj = (event) => {
            //brings user to the project page, and updates our currVessel attribute depending on the button user clicked:
            let roles = null;
            let id = event.target.id;
            id = id + "";
            let first3 = id.substring(0,3);
            id = id.substring(3);
            if(first3 == "del"){
                console.log("DELETE: " +first3 + id);
                //deletemember(id);
            }else if(first3 == "set"){
                console.log("SET: " + first3 + id);
                roles = {canComment: true, canInvite: true, canEditRoles: true};

                /*const roleCheckBox = (`<input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">\n' +
                '<label for="vehicle1"> I have a bike</label><br>\n' +
                '<input type="checkbox" id="vehicle2" name="vehicle2" value="Car">\n' +
                '<label for="vehicle2"> I have a car</label><br>\n' +
                '<input type="checkbox" id="vehicle3" name="vehicle3" value="Boat">\n' +
                '<label for="vehicle3"> I have a boat</label><br>`).join('');
                return(
                    <div onClick={proj} dangerouslySetInnerHTML={{__html: roleCheckBox}}></div>
                );*/
            }

            /*for(let i = 0; i<memberArray.length; i++){
                if(memberArray[i].memberID == id){
                    roles = memberArray[i].role;
                    break;
                }
            }*/
            //updatemember(id,roles);

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
        function refreshPage() {
           setMemberName("");
        }
        const submit = () => {
            console.log("submitted");
            setOpen(false);
        }

        const closeModal = () => {
            setOpen(false);
        };
        if(userData) {
            let memberArrayCopy = memberArray.filter((v,i,a)=>a.findIndex(t=>(t.memberID === v.memberID))===i);
            //console.log(memberArrayCopy.length);
            console.log(memberArray.filter((v,i,a)=>a.findIndex(t=>(t.memberID === v.memberID))===i));
            if (userData.currVessel && memberArrayCopy.length === userData.currVessel.associatedUsers.length) {
                let listOfMembers = memberArrayCopy.map(member =>
                    `
                        <link rel="stylesheet" type="text/css" href="//netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css">
<hr>
<div class="container bootstrap snippets bootdey">
    <div class="row">
        <div class="col-lg-12">
            <div class="main-box no-header clearfix">
                <div class="main-box-body clearfix">
                    <div class="table-responsive">
                        <table class="table user-list">
                            
                            <tbody>
                                <tr>
                                    <td>
                                        <img src="https://bootdey.com/img/Content/user_1.jpg" alt="">
                                        <a href="#" class="user-link">${member.fName + " " + member.lName}</a>
                                        <span class="user-subhead">Member</span>
                                    </td>
                                    <td class="text-center">
                                    </td>
                                    <td>
                                        <a href="#">${member.email}</a>
                                    </td>
                                    <td style="width: 20%;">
                                        <a href="#" class="table-link text-info">
                                            <span class="fa-stack">
                                                <i class="fa fa-square fa-stack-2x" id = "set${member.memberID}"></i>
                                                <i class="fa fa-pencil fa-stack-1x fa-inverse" id = "set${member.memberID}"></i>
                                            </span>
                                        </a>
                                        <a href="#" class="table-link danger">
                                            <span class="fa-stack">
                                                <i class="fa fa-square fa-stack-2x" id = "del${member.memberID}"></i>
                                                <i class="fa fa-trash-o fa-stack-1x fa-inverse" id = "del${member.memberID}"></i>
                                            </span>
                                        </a>
                                        
                                    </td>
                                </tr>
                                
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
              
       
      `
                ).join('');

                return (

                    <table border="0" cellPadding="25" cellSpacing="20">

                        <div onClick={proj} dangerouslySetInnerHTML={{__html: listOfMembers}}></div>
                    </table>);
            } else {
                setTimeout(function () {
                    refreshPage();
                }, 1000);
                return ("hi");
            }
        }

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