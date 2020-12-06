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
            console.log(userData.currVessel);
            associatedMembers = await Axios.post("http://localhost:5000/users/getMember",
                { vessel: userData.currVessel,
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

        const updatemember = async (id, role) => {
            changeMember = await Axios.post("http://localhost:5000/users/updateMemberRole",
                { vesselID: userData.currVessel.id,
                    memberID: id,
                    newRole : role
                });

            if(changeMember){
                console.log(changeMember.data.retVessel);

                //memberArray[index].role = role;
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

            let id = event.target.id;
            id = id + "";
            let roles = null;
            console.log(id);

            for(let i = 0; i<memberArray.length; i++){
                if(memberArray[i].memberID == id){
                    roles = memberArray[i].role;
                    break;
                }
            }
            roles = {canComment: true, canInvite: true, canEditRoles: true};
            updatemember(id,roles);

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
        if(userData) {
            let memberArrayCopy = memberArray.filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))===i);
            //console.log(memberArrayCopy.length);
            console.log(memberArray.filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))===i));
            if (userData.currVessel && memberArrayCopy.length === userData.currVessel.associatedUsers.length) {
                let listOfMembers = memberArrayCopy.map(member =>
                    `<link rel="stylesheet" type="text/css"
                          href="//netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css">
                        <hr>
                            <div className="container bootstrap snippets bootdey">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="main-box no-header clearfix">
                                            <div className="main-box-body clearfix">
                                                <div className="table-responsive">
                                                    <table className="table user-list">
                                                        <thead>
                                                        <tr>
                                                            <th><span>User</span></th>
                                                            <th><span>Created</span></th>
                                                            <th className="text-center"><span>Status</span></th>
                                                            <th><span>Email</span></th>
                                                            <th>&nbsp;</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        <tr>
                                                            <td>
                                                                <img src="https://bootdey.com/img/Content/user_1.jpg"
                                                                     alt="">
                                                                    <a href="#" className="user-link">Full name 1</a>
                                                                    <span className="user-subhead">Member</span>
                                                                </img>
                                                            </td>
                                                            <td>2013/08/12</td>
                                                            <td className="text-center">
                                                                <span className="label label-default">pending</span>
                                                            </td>
                                                            <td>
                                                                <a href="#">marlon@brando.com</a>
                                                            </td>
                                                            <td style="width: 20%;">
                                                                <a href="#" className="table-link text-warning">
                                            <span className="fa-stack">
                                                <i className="fa fa-square fa-stack-2x"></i>
                                                <i className="fa fa-search-plus fa-stack-1x fa-inverse"></i>
                                            </span>
                                                                </a>
                                                                <a href="#" className="table-link text-info">
                                            <span className="fa-stack">
                                                <i className="fa fa-square fa-stack-2x"></i>
                                                <i className="fa fa-pencil fa-stack-1x fa-inverse"></i>
                                            </span>
                                                                </a>
                                                                <a href="#" className="table-link danger">
                                            <span className="fa-stack">
                                                <i className="fa fa-square fa-stack-2x"></i>
                                                <i className="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                                            </span>
                                                                </a>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <img src="https://bootdey.com/img/Content/user_3.jpg"
                                                                     alt="">
                                                                    <a href="#" className="user-link">Full name 2</a>
                                                                    <span className="user-subhead">Admin</span>
                                                                </img>
                                                            </td>
                                                            <td>2013/08/12</td>
                                                            <td className="text-center">
                                                                <span className="label label-success">Active</span>
                                                            </td>
                                                            <td>
                                                                <a href="#">marlon@brando.com</a>
                                                            </td>
                                                            <td style="width: 20%;">
                                                                <a href="#" className="table-link  text-warning">
                                            <span className="fa-stack">
                                                <i className="fa fa-square fa-stack-2x"></i>
                                                <i className="fa fa-search-plus fa-stack-1x fa-inverse"></i>
                                            </span>
                                                                </a>
                                                                <a href="#" className="table-link  text-info">
                                            <span className="fa-stack">
                                                <i className="fa fa-square fa-stack-2x"></i>
                                                <i className="fa fa-pencil fa-stack-1x fa-inverse"></i>
                                            </span>
                                                                </a>
                                                                <a href="#" className="table-link danger">
                                            <span className="fa-stack">
                                                <i className="fa fa-square fa-stack-2x"></i>
                                                <i className="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                                            </span>
                                                                </a>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <img src="https://bootdey.com/img/Content/user_2.jpg"
                                                                     alt="">
                                                                    <a href="#" className="user-link">Full name 3</a>
                                                                    <span className="user-subhead">Member</span>
                                                                </img>
                                                            </td>
                                                            <td>2013/08/12</td>
                                                            <td className="text-center">
                                                                <span className="label label-danger">inactive</span>
                                                            </td>
                                                            <td>
                                                                <a href="#">marlon@brando.com</a>
                                                            </td>
                                                            <td style="width: 20%;">
                                                                <a href="#" className="table-link  text-warning">
                                            <span className="fa-stack">
                                                <i className="fa fa-square fa-stack-2x"></i>
                                                <i className="fa fa-search-plus fa-stack-1x fa-inverse"></i>
                                            </span>
                                                                </a>
                                                                <a href="#" className="table-link  text-info">
                                            <span className="fa-stack">
                                                <i className="fa fa-square fa-stack-2x"></i>
                                                <i className="fa fa-pencil fa-stack-1x fa-inverse"></i>
                                            </span>
                                                                </a>
                                                                <a href="#" className="table-link danger">
                                            <span className="fa-stack">
                                                <i className="fa fa-square fa-stack-2x"></i>
                                                <i className="fa fa-trash-o fa-stack-1x fa-inverse"></i>
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
                        </hr>
                    </link>
              <br>
       
      `
                ).join('');

                return (
                    <table border="0" cellPadding="25" cellSpacing="10">
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