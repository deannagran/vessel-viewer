import React, { useEffect, useContext, useState } from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Axios from "axios";

const WebMasterList = () => {
    const [vesselArray, setVesselArray] = useState([]);
    const [vesselName, setVesselName] = useState(0);
    let axiosdeleteVessel;
    let axiosGetVessels;
    useEffect(() => { 
    let routeResponse;
    
    axiosGetVessels = async () => {
        console.log("getting vessels");
        routeResponse = await Axios.post("http://localhost:5000/users/webMasterList"); 
        
        if(routeResponse){
            setVesselArray(routeResponse.data.docArray);
            console.log(routeResponse.data.docArray);
        }else{
            //console.log("no reply");
        }
        
    }
    axiosdeleteVessel = async (vesselid) => {
        //console.log("deleteVessel" + vesselid);
        let routeResponse2 = await Axios.post("http://localhost:5000/users/webMasterListDelete",
        { 
          name: vesselid
        }); 
        //console.log(routeResponse2.data.users);
    }
    });

    const deleteVessel = (event) => {
        const id = event.target.id;
        //console.log(id);
        axiosdeleteVessel(id);
        setTimeout(axiosGetVessels, 1000);
    };

    const updateVessels = () => {axiosGetVessels();};

    if(vesselArray.length > 0){
        let listOfVessels = vesselArray.map(vessel =>
          `<h3 class="card-title">${vessel.name} 
          <button id="${vessel.name}" onClick={deleteVessel} class="webMasterList-button ">Delete</button> 
          </h3>`
        ).join('');
    
        return (
        <div className="page">
            <button type="button" className="register-button" onClick={updateVessels}>Update</button>
        <h2>List of Vessels</h2>
          <table border = "0" cellPadding = "25" cellSpacing = "10"> 
            <div  onClick={deleteVessel} dangerouslySetInnerHTML={{__html: listOfVessels}}></div>
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