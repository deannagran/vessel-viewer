import React, { useEffect, useContext } from "react";
import UserContext from "../../context/UserContext";

export default function MyAccount(props) {
  const { userData } = useContext(UserContext);
  useEffect(() => {
    if (!userData.user) props.history.push("/login");
  });
  
  return (
    <div className="page">
      <div className="account-name">
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
      </div>
    </div>
    );
}