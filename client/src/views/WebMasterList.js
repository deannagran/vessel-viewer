import React from "react";
import UserContext from "../context/UserContext";
import Axios from "axios";

const WebMasterList = () => {
    let routeResponse;
    const axiosAddUser = async () => {
        routeResponse = await Axios.post("http://localhost:5000/users/webMasterList"); 
    }
    axiosAddUser();
    const buildingList =
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
    return <tbody>{buildingList}</tbody>;
}
export default WebMasterList;