import React, { useState, useEffect, useContext, Component } from "react";
import UserContext from "../context/UserContext";
import Axios from "axios";
import Alert from 'react-bootstrap/Alert'
import 'bootstrap/dist/css/bootstrap.min.css';
import WebMasterAddVessel from "./WebMasterAddVessel";

export default function WebMaster(props) {
    const [email, setEmail] = useState(null);
    const [vessel, setVessel] = useState(null);
    const [addedUser, setAddedUser] = useState(null);
    const { userData, setUserData } = useContext(UserContext);
    const [show, setShow] = useState(true);

    useEffect(() => {
      if (!userData){
        props.history.push("/login");
      }else if(userData.user && !userData.user.webMaster){
        props.history.push("/dashboard");
      }
    });

    const axiosAddUser = async (emailString, vesselString) => {
      let routeResponse = await Axios.post("http://localhost:5000/users/webMaster",
      { email: emailString,
        vesselID: vesselString
      }); 

      if(routeResponse){
        if(routeResponse.data.nameOfAddedUser){
          setAddedUser(routeResponse.data.nameOfAddedUser);
          console.log(routeResponse.data.nameOfAddedUser + " has been added to the project.");
          setShow(true);
        }else{
          setAddedUser('invalid');
          setShow(true);
        }
          
      }else{
        setAddedUser('invalid');
        setShow(true);
      }
    } 
    const submit = () => {
      if(email && vessel){
          console.log(email);
          axiosAddUser(email, vessel);
          setEmail(null);
          setVessel(null);
      }
    }
    if(addedUser && show){
      const name = addedUser;
      const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1);
      
      if(addedUser == 'invalid'){
        //setAddedUser(null);
        return (
          <Alert variant="danger" onClose={() => setShow(false)} dismissible>
            <Alert.Heading>Sorry!</Alert.Heading>
            <p>
              The user email address you entered does not currently exist in our system. 
            </p>
          </Alert>
        );

      }else{
        return (
          <Alert variant="success" onClose={() => setShow(false)} dismissible>
            <Alert.Heading>User successfully added to project!</Alert.Heading>
            <p>
              {nameCapitalized} has been added to the project. This user now has immediate access to the project page and should recieve an email alert shortly.
            </p>
          </Alert>
        );
      }    
    }
    return(
      <div>
        <br></br>
      <div className="modal">       
      <br></br>
      </div>
      <WebMasterAddVessel></WebMasterAddVessel>
      <br></br>
      <h2>Connect User with Vessel</h2>
        <form class="ui form small fluid">
          <label for="exampleInputEmail1">Please enter the email address of the user you would like to add to a project. ‏‏‎ ‎</label>
          <div class="required field">
            <input
              style={{ height: "35px" }}
              type="text"
              required
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <label for="exampleInputEmail1">Please enter the name of the vessel you would like to connect with the user. ‏‏‎ ‎</label>
          <div class="required field">
            <input
              style={{ height: "35px" }}
              type="text"
              required
              placeholder="Vessel Name"
              onChange={(e) => setVessel(e.target.value)}
            ></input>
          </div>
          <button class="register-button " type="submit" onClick={submit}>
            Submit
          </button>
        </form>
      </div>
    );
};