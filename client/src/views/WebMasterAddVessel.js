import React, { useState, useEffect, useContext, Component } from "react";
import UserContext from "../context/UserContext";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Axios from "axios";
import Alert from 'react-bootstrap/Alert'
import 'bootstrap/dist/css/bootstrap.min.css';

const WebMasterAddVessel = () => {
    const [name, setName] = useState(null);
    const [modelLink, setModelLink] = useState(null);
    const [IMOnumber, setIMOnumber] = useState(null);
    const [open, setOpen] = useState(false);
    const { userData, setUserData } = useContext(UserContext);

    const axiosAddUser = async (nameString, modelLinkString, IMOnumberString) => {
        let routeResponse = await Axios.post("http://localhost:5000/users/WebMasterAddVessel",
        {   name: nameString,
            model_link: modelLinkString,
            vesselfinder_link: IMOnumberString
        }); 
    }
    const submit = () => {
        if(name){
            console.log(name);
            setOpen(false); 
            axiosAddUser(name, modelLink, IMOnumber);
            setName(null);
            setModelLink(null);
            setIMOnumber(null);
        }
      }
      const closeModal = () => {
          setOpen(false);
          setName(null);
          setModelLink(null);
          setIMOnumber(null);
      };
      return(
        <div>
        <button type="button" className="register-button" onClick={() => setOpen(o => !o)}>
        Add New Vessel
        </button>
        <Popup open={open} closeOnDocumentClick onClose={closeModal}>
            
        <div className="modal">
            
        Add a new user to this project via email address. ‏‏‎ ‎
        <br></br>

        </div>
        <form class="ui form small fluid">
            <label for="exampleInputEmail1">Please enter the name of the vessel you would like to add. ‏‏‎ ‎</label>
            <div class="required field">
                <input
                style={{ height: "35px" }}
                type="text"
                required
                placeholder="Vessel Name"
                onChange={(e) => setName(e.target.value)}
                ></input>
            </div>

            <label for="exampleInputEmail1">Please enter the Model Link of the vessel you would like to add. ‏‏‎ ‎</label>
            <div class="required field">
                <input
                style={{ height: "35px" }}
                type="text"
                required
                placeholder="Model Link"
                onChange={(e) => setModelLink(e.target.value)}
                ></input>
            </div>

            <label for="exampleInputEmail1">Please enter the IMO number of the vessel you would like to add. ‏‏‎ ‎</label>
            <div class="required field">
                <input
                style={{ height: "35px" }}
                type="text"
                required
                placeholder="IMO number"
                onChange={(e) => setIMOnumber(e.target.value)}
                ></input>
            </div>

            <button class="register-button " type="submit" onClick={submit}>
                Submit
            </button>
            <button type="button" className="register-button" onClick={closeModal}>Cancel</button>
            </form>
        </Popup>

    </div>
    )
}
export default WebMasterAddVessel;