import React, { useEffect, useContext, useState } from "react";
import UserContext from "../context/UserContext";
import Axios from "axios";

const WebMasterList = () => {
    useEffect(() => { 
    let routeResponse;
    const axiosAddUser = async () => {
        routeResponse = await Axios.post("http://localhost:5000/users/webMasterList"); 
        
        if(routeResponse){
            console.log(routeResponse.data.docArray);
        }else{
            console.log("no reply");
        }
        
    }
    axiosAddUser();

    

    });

    return(<div>list</div>);
    
/*     const buildingList =
    routeResponse.length === 0
    ? routeResponse.map(() => {
        return (
            <tr key={routeResponse.name}>

            </tr>
        );
        })
    : routeResponse.map(() => {
        return (
            <tr key={routeResponse.name}>

            </tr>
        );
        });
    return <tbody>{buildingList}</tbody>; */
}
export default WebMasterList;