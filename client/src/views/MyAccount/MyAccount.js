import React, { useEffect, useContext, useState } from "react";
import UserContext from "../../context/UserContext";
//import Accountinfo from './Accountinfo';

export default function MyAccount(props) {
  const { userData } = useContext(UserContext);
  useEffect(() => {
    if (!userData.user) props.history.push("/login");
  });

  const [users,setUsers] = useState([    {company: userData.user.companyName, email: userData.user.email},
  ]);
  //console.log(userData.user.email);
  return (
    /*<div className="page">
      {users.map(user => (
        <Accountinfo company ={user.company} email = {user.email}/>
      ))}
      
    </div>*/
      <div>
        <div className="acc-header">
        <img src="default-profile-picture.png" alt=""/>
        <h1>   {userData.user.firstName} {userData.user.lastName}</h1>
        </div>

      <div><h1 className="accountlabel">Account Info </h1></div>
      <div className="account-page-info">
        <h3>Company: {userData.user.companyName}</h3>
        <h3>Email: {userData.user.email}</h3>
      </div>
      </div>
      
    );
}
/*<div className="account-name">
        <img src="default-profile-picture.png" alt=""/>
        <customed-label-name>           {userData.user.firstName} {userData.user.lastName}</customed-label-name>
      </div>
      <div className="account-page-info">
        <my-account-label> My Account Info </my-account-label>
        <br></br>
        <br></br>
        <customed-label>Company: {userData.user.companyName}</customed-label>
        <br></br>
        <customed-label>Email: {userData.user.email}</customed-label>
      </div>
      <div className="account-inbox">
        <my-account-inbox>Inbox</my-account-inbox>
        <br></br>
        <my-account-box></my-account-box>
      </div>*/