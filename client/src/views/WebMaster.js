import React, { useState, useEffect, useContext, Component } from "react";
import UserContext from "../context/UserContext";
import WebMasterAddVessel from "./WebMasterAddVessel";
import WebMasterConnect from "./WebMasterConnect";
import WebMasterList from "./WebMasterList";

export default function WebMaster(props) {
    const { userData, setUserData } = useContext(UserContext);

    useEffect(() => {
      if (!userData){
        props.history.push("/login");
      }else if(userData.user && !userData.user.webMaster){
        props.history.push("/dashboard");
      }
    });

    return(
      <div>
        <br></br>
      <div className="modal">       
      <br></br>
      </div>
      <WebMasterAddVessel></WebMasterAddVessel>
      <br></br>
      <WebMasterConnect></WebMasterConnect>
      <WebMasterList></WebMasterList>
      </div>
    );
};