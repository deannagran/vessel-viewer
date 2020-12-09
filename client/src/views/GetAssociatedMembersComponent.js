import React, {useEffect, useContext, useState} from "react";
import UserContext from "../context/UserContext";
import VesselFinderComponent from "./VesselFinderComponent";
import VesselModelComponent from "./VesselModelComponent";
import AddProjectMembersComponent from "./AddProjectMembersComponent";
import Axios from "axios";
import {useHistory} from "react-router-dom";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import Alert from 'react-bootstrap/Alert'
import 'bootstrap/dist/css/bootstrap.min.css';

    const GetAssociatedMembersComponent = () => {
        const { userData, setUserData } = useContext(UserContext);
        let associatedMembers = null;
        let changeMember = null;
        let deleteMember = null;
        const [memberName, setMemberName] = useState(0);
        const [memberArray, setMemberArray] = useState([]);
        const [refresh, setRefresh] = useState(false);

        const [open, setOpen] = useState(false);
        const [showCB, setShowCB] = useState(false);
        const [email, setEmail] = useState(null);
        const [userButtonID, setUserButtonID] = useState("");

        const history = useHistory();
        if(userData.currVessel.associatedUsers.length === 0 ){
            history.push("/dashboard")
        }


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
                console.log(changeMember.data.retSuccess);

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

        const proj = (event) => {
            //brings user to the project page, and updates our currVessel attribute depending on the button user clicked:
            let roles = null;
            let id = event.target.id;
            id = id + "";
            let first3 = id.substring(0,3);
            console.log("WHAT BUTTON WAS CLICKED" + id);
            if(first3 == "can"){
                id = id.substring(5);
            }else{
                id = id.substring(3);
            }

            setUserButtonID(id);
            if(first3 == "del"){
                console.log("DELETE: " +first3 + id);
                deletemember(id);
                let memberArrayCopy = memberArray.filter((v,i,a)=>a.findIndex(t=>(t.memberID === v.memberID))===i);
                if(memberArrayCopy.length === 1){
                    //we are deleting the only user left
                    memberArrayCopy = [];
                    setMemberArray([]);
                    let vessel = {id: userData.currVessel.id, name: userData.currVessel.name, modelLink: userData.currVessel.modelLink,
                        numComments: userData.currVessel.numComments, VFlink: userData.currVessel.VFlink,
                        associatedUsers: []}
                    if(userData){
                        setUserData({
                            token: userData.user.token,
                            user: userData.user,
                            currVessel: vessel
                        });
                    }
                    return(null);
                }
                else{
                    let memberArrayCopy2 = [];
                    for(let i = 0; i<memberArrayCopy.length; i++){
                        if(memberArrayCopy[i].memberID != id){
                            memberArrayCopy2.push(memberArrayCopy[i]);
                        }
                    }
                    console.log("LENGTH OF MEMBER ARRRAYA COPY:" + memberArrayCopy.length);

                    let vessel = {id: userData.currVessel.id, name: userData.currVessel.name, modelLink: userData.currVessel.modelLink,
                        numComments: userData.currVessel.numComments, VFlink: userData.currVessel.VFlink,
                        associatedUsers: memberArrayCopy2}
                    if(userData){
                        setUserData({
                            token: userData.user.token,
                            user: userData.user,
                            currVessel: vessel
                        });
                    }
                    setMemberArray(memberArrayCopy2);

                }



                //return ("loading");

            }else if(first3 == "set"){
                console.log("SET: " + first3 + id);
                roles = {canComment: false, canInvite: false, canEditRoles: false};
                let cB = document.getElementById("checkbox");
                if (cB.style.display === "block") {
                    let canComment = document.getElementById("canCo"+id);
                    if(canComment.checked == true){
                        roles.canComment = true;
                    }
                    let canInvite = document.getElementById("canIn" + id);
                    if(canInvite.checked == true){
                        roles.canInvite = true;
                    }
                    let canEdit = document.getElementById("canEd" + id);
                    if(canEdit.checked == true){
                        roles.canEditRoles = true;
                    }
                    setShowCB(showCB=>(false));
                    console.log(roles);
                    console.log("ID: " + id);
                    updatemember(id, roles);
                    cB.style.display = "none";

                }else{
                    cB.style.display = "block";
                    setShowCB(showCB=>(true));

                }

            }

        };

        function refreshPage() {
           setRefresh(!refresh);
        }

        const submit = () => {
            console.log("submitted");
            setOpen(false);
        }

        const closeModal = () => {
            console.log("closed");
            setOpen(false);
        };


        if(userData.user && memberArray.length === 0){
            if(userData.currVessel) {
                //add to array of all associated members:
                for (let i = 0; i < userData.currVessel.associatedUsers.length; i++) {
                    getmembers(i);
                    //setMemberName("");
                }
            }
        }

        let role = null;
        if(userData && userData.currVessel){

            for(let i = 0; i < userData.currVessel.associatedUsers.length; i++){
                if(userData.currVessel.associatedUsers[i].userID == userData.user.id){
                    role = userData.currVessel.associatedUsers[i].role.canEditRoles;
                }
            }
            if(!role){
                let memberArrayCopy = memberArray.filter((v,i,a)=>a.findIndex(t=>(t.memberID === v.memberID))===i);
                let listOfMembers = memberArrayCopy.map(member =>
                    `
                        <link rel="stylesheet" type="text/css" href="//netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css">
<hr>

    <div class="row">
        <div class="col-lg-12">
            <div class="main-box no-header clearfix">
                <div class="main-box-body clearfix">
                    <div class="table-responsive">
                        <table class="table user-list">
                            
                            <tbody>
                                <tr>
                                    <td>
                                        <img src="default-profile-picture.png" width = "75" style="height: 7%" alt="">
                                        <a  class="user-link">${member.fName + " " + member.lName}</a>
                                        <span class="user-subhead">Member</span>
                                    </td>
                                    <td class="text-center">
                                    </td>
                                    <td>
                                        <a>${member.email}</a>
                                    </td>
                                   
                                    
                                </tr>
                                
                                
                            </tbody>
                        </table>
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
                    </table>

                );
            }
        }

        if(userData && memberArray.length>0) {
            let memberArrayCopy = memberArray.filter((v,i,a)=>a.findIndex(t=>(t.memberID === v.memberID))===i);
            //console.log(memberArrayCopy.length);
            if(memberArrayCopy.length != userData.currVessel.associatedUsers.length){
                console.log("the member array copy is not equal to associated users");
                console.log(memberArrayCopy.length + " != " + userData.currVessel.associatedUsers.length);
                setTimeout(function () {
                        refreshPage();
                    }, 1000
                );
                return ("loading");
            }
            console.log(memberArray.filter((v,i,a)=>a.findIndex(t=>(t.memberID === v.memberID))===i));
            if (userData.currVessel && memberArrayCopy.length === userData.currVessel.associatedUsers.length && !showCB) {
                let listOfMembers = memberArrayCopy.map(member =>
                    `
                        <link rel="stylesheet" type="text/css" href="//netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css">
<hr>

    <div class="row">
        <div class="col-lg-12">
            <div class="main-box no-header clearfix">
                <div class="main-box-body clearfix">
                    <div class="table-responsive">
                        <table class="table user-list">
                            
                            <tbody>
                                <tr>
                                    <td>
                                        <img src="default-profile-picture.png" width = "75" style="height: 7%" alt="">
                                        <a  class="user-link">${member.fName + " " + member.lName}</a>
                                        <span class="user-subhead">Member</span>
                                    </td>
                                    <td class="text-center">
                                    </td>
                                    <td>
                                        <a>${member.email}</a>
                                    </td>
                                    <td style="width: 20%;">
                                        <a class="table-link text-info">
                                            <span class="fa-stack">
                                                <i class="fa fa-square fa-stack-2x" id = "set${member.memberID}"></i>
                                                <i class="fa fa-pencil fa-stack-1x fa-inverse" id = "set${member.memberID}"></i>
                                            </span>
                                        </a>
                                        <a class="table-link danger">
                                            <span class="fa-stack">
                                                <i class="fa fa-square fa-stack-2x" id = "del${member.memberID}"></i>
                                                <i class="fa fa-trash-o fa-stack-1x fa-inverse" id = "del${member.memberID}"></i>
                                            </span>
                                        </a>
                                        
                                    </td>
                                    <td style = "display: none" id = "checkbox" >
                                        <div class="form-check">
                                          <input class="form-check-input" type="checkbox" value="" id="canCo${member.memberID}">
                                          <label class="form-check-label" for="canCo${member.memberID}">
                                            Can Comment?
                                          </label>
                                        </div>
                                        <div class="form-check">
                                          <input class="form-check-input" type="checkbox" value="" id="canIn${member.memberID}">
                                          <label class="form-check-label" for="canIn${member.memberID}">
                                            Can Invite Users?
                                          </label>
                                        </div>
                                        <div class="form-check">
                                          <input class="form-check-input" type="checkbox" value="" id="canEd${member.memberID}">
                                          <label class="form-check-label" for="canEd${member.memberID}">
                                            Can Edit Roles?
                                          </label>
                                        </div>
                                    </td>
                                </tr>
                                
                                
                            </tbody>
                        </table>
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
                    </table>

                );
            } else if(userData.currVessel && memberArrayCopy.length === userData.currVessel.associatedUsers.length && showCB){
                let checkboxCard = null;
                let normalCard = null;
                let cardArray = [];
                for(let i = 0; i<memberArrayCopy.length; i++){
                    let member = memberArrayCopy[i];
                    if(member.memberID === userButtonID){
                        checkboxCard = ` <link rel="stylesheet" type="text/css" href="//netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css"> <hr>

 <div class="row"> <div class="col-lg-12"> <div class="main-box no-header clearfix"> <div class="main-box-body clearfix"> <div class="table-responsive"> <table class="table user-list"> <tbody> <tr> <td> <img src="default-profile-picture.png" width = "75" style="height: 7%" alt=""> <a class="user-link">${member.fName + " " + member.lName}</a> <span class="user-subhead">Member</span> </td> <td class="text-center"> </td> <td> <a>${member.email}</a> </td> <td style="width: 20%;"> <a class="table-link text-info"> <span class="fa-stack"> <i id = "che${member.memberID}"></i> <img id = "set${member.memberID}" src = "green_checkmark.png" width = "25" style="height: 75%"></span> </span> </a> </td> <td style = "display: block;" id = "checkbox" > <div class="form-check"> <input class="form-check-input" type="checkbox" value="" id="canCo${member.memberID}"> <label class="form-check-label" for="canCo${member.memberID}"> Can Comment? </label> </div> <div class="form-check"> <input class="form-check-input" type="checkbox" value="" id="canIn${member.memberID}"> <label class="form-check-label" for="canIn${member.memberID}"> Can Invite Users? </label> </div> <div class="form-check"> <input class="form-check-input" type="checkbox" value="" id="canEd${member.memberID}"> <label class="form-check-label" for="canEd${member.memberID}"> Can Edit Roles? </label> </div> </td> </tr> </tbody> </table> </div> </div> </div> </div> </div>

 `
                        cardArray.push(checkboxCard);
                    }else{
                        normalCard = ` <link rel="stylesheet" type="text/css" href="//netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css"> <hr>

 <div class="row"> <div class="col-lg-12"> <div class="main-box no-header clearfix"> <div class="main-box-body clearfix"> <div class="table-responsive"> <table class="table user-list"> <tbody> <tr> <td> <img src="default-profile-picture.png" width = "75" style="height: 7%" alt=""> <a class="user-link">${member.fName + " " + member.lName}</a> <span class="user-subhead">Member</span> </td> <td class="text-center"> </td> <td> <a>${member.email}</a> </td> <td style="width: 20%;"> <a class="table-link text-info"> <span class="fa-stack"> <i class="fa fa-square fa-stack-2x" id = "set${member.memberID}"></i> <i class="fa fa-pencil fa-stack-1x fa-inverse" id = "set${member.memberID}"></i> </span> </a> <a class="table-link danger"> <span class="fa-stack"> <i class="fa fa-square fa-stack-2x" id = "del${member.memberID}"></i> <i class="fa fa-trash-o fa-stack-1x fa-inverse" id = "del${member.memberID}"></i> </span> </a> </td> <td style = "display: none" id = "checkbox" > <div class="form-check"> <input class="form-check-input" type="checkbox" value="" id="canCo${member.memberID}"> <label class="form-check-label" for="canCo${member.memberID}"> Can Comment? </label> </div> <div class="form-check"> <input class="form-check-input" type="checkbox" value="" id="canIn${member.memberID}"> <label class="form-check-label" for="canIn${member.memberID}"> Can Invite Users? </label> </div> <div class="form-check"> <input class="form-check-input" type="checkbox" value="" id="canEd${member.memberID}"> <label class="form-check-label" for="canEd${member.memberID}"> Can Edit Roles? </label> </div> </td> </tr> </tbody> </table> </div> </div> </div> </div> </div>

 `
                        cardArray.push(normalCard);

                    }
                }
                let listOfMembers = cardArray.join("");

                /*let listOfMembers = memberArrayCopy.map(member =>
                    `
                        <link rel="stylesheet" type="text/css" href="//netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css">
<hr>

    <div class="row">
        <div class="col-lg-12">
            <div class="main-box no-header clearfix">
                <div class="main-box-body clearfix">
                    <div class="table-responsive">
                        <table class="table user-list">
                            
                            <tbody>
                                <tr>
                                    <td>
                                        <img src="default-profile-picture.png" width = "75" style="height: 7%" alt="">
                                        <a class="user-link">${member.fName + " " + member.lName}</a>
                                        <span class="user-subhead">Member</span>
                                    </td>
                                    <td class="text-center">
                                    </td>
                                    <td>
                                        <a>${member.email}</a>
                                    </td>
                                    <td style="width: 20%;">
                                        <a class="table-link text-info">
                                            <span class="fa-stack">
                                                
                                                <i id = "set${member.memberID}"></i> 
                                                <img id = "set${member.memberID}" src = "green_checkmark.png" width = "25" style="height: 75%"></span>
                                            </span>
                                        </a>
                                        
                                    </td>
                                    <td style = "display: block;" id = "checkbox" >
                                        <div class="form-check">
                                          <input class="form-check-input" type="checkbox" value="" id="${member.memberID}canComment">
                                          <label class="form-check-label" for="canComment">
                                            Can Comment?
                                          </label>
                                        </div>
                                        <div class="form-check">
                                          <input class="form-check-input" type="checkbox" value="" id="${member.memberID}canInvite">
                                          <label class="form-check-label" for="canInvite">
                                            Can Invite Users?
                                          </label>
                                        </div>
                                        <div class="form-check">
                                          <input class="form-check-input" type="checkbox" value="" id="${member.memberID}canEdit">
                                          <label class="form-check-label" for="canEdit">
                                            Can Edit Roles?
                                          </label>
                                        </div>
                                    </td>
                                </tr>
                                
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

              
       
      `
                ).join('');*/

                return (

                    <table border="0" cellPadding="25" cellSpacing="20">

                        <div onClick={proj} dangerouslySetInnerHTML={{__html: listOfMembers}}></div>
                    </table>

                );
            }else {
                console.log("need to refresh");
                    setTimeout(function () {
                        refreshPage();
                    }, 1000
                );
                return ("loading");
            }
        }else if(userData.currVessel.associatedUsers.length === 0 ){

            return(null);
        }else{
            console.log("user data isnt valid or memberarray is empty");
            console.log("length: " + memberArray.length);
            setTimeout(function () {
                    refreshPage();
                }, 1000
            );
            return ("loading2");
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