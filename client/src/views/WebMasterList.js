import React, { useEffect, useContext, useState } from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Axios from "axios";

const WebMasterList = () => {
    const [vesselArray, setVesselArray] = useState([]);
    const [open, setOpen] = useState(false);
    let axiosdeleteVessel;
    let axiosGetVessels;
    useEffect(() => { 
    let routeResponse;
    
    axiosGetVessels = async () => {
        routeResponse = await Axios.post("http://localhost:5000/users/webMasterList"); 
        
        if(routeResponse){
            setVesselArray(routeResponse.data.docArray);
            console.log(vesselArray);
        }else{
            console.log("no reply");
        }
        
    }
    axiosdeleteVessel = async (vesselid) => {
        let routeResponse2 = await Axios.post("http://localhost:5000/users/webMasterListDelete",
        { 
          name: vesselid
        }); 
    }
    });

    const deleteVessel = (event) => {
        const id = event.target.id;
        console.log(id);
        axiosdeleteVessel(id);
        axiosGetVessels();
        setOpen(true);
        return(
            <div>
            <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                <h2>Are you sure you want to delete this Vessel</h2>
                    <button class="register-button " type="webMasterList-button" onClick={deleteVessel}>
                        Yes
                    </button>
                    <button type="button" className="webMasterList-button" onClick={closeModal}>No</button>
            </Popup>
            </div>
        );
    };

    const updateVessels = () => {axiosGetVessels();};

    const closeModal = () => {
        setOpen(false);
    };

    if(vesselArray.length > 0){
        let listOfVessels = vesselArray.map(vessel =>
          `<h3 class="card-title">${vessel.name} 
          <button id="${vessel.name}"  class="webMasterList-button">Delete</button> 
          </h3>`
        ).join('');
    
        return (
        <div className="page">
            <button type="button" className="register-button" onClick={updateVessels}>Update</button>
        <h2>List of Vessels</h2>
          <table border = "0" cellPadding = "25" cellSpacing = "10"> 
            <div  onClick={() => setOpen(o => !o)} dangerouslySetInnerHTML={{__html: listOfVessels}}></div>
            
          </table>
        </div>);
    }
    else{
        return(
            <div>
                <br></br>
            <button type="button" className="register-button" onClick={updateVessels}>Update</button>
            <div>There are no vessels in the database</div>
            </div>
        );
    }
}
export default WebMasterList;