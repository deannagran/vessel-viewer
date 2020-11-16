import React, { useEffect, useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import { useHistory } from "react-router-dom";
import Axios from "axios";

export default function Dashboard(props) {
  let associatedVessels = null;
  const { userData } = useContext(UserContext);
  const [vesselName, setVesselName] = useState(0);
  useEffect(() => {
    
    if (!userData.user) props.history.push("/login");

    const findvessels = async () => {
      let token = localStorage.getItem("auth-token");
      associatedVessels = await Axios.post("http://localhost:5000/users/findVessel",
      { user: userData, 
        name: "null",
        //headers: { "x-auth-token": token } 
      }); 

    if(associatedVessels){
      console.log(associatedVessels.data);
    } 
    setVesselName(""+associatedVessels.data.retInfo);
  }
    findvessels();
  });
  const history = useHistory();
  const proj = () => history.push("/project");
 
  if(vesselName && vesselName != 'null'){

  return (
  <div className="page"><h1>User Dashboard</h1>
  <h2>Welcome to your Dashboard! <br></br> Here you can view any Digital Twin Marine projects associated with your account.</h2>

    <table border = "0" cellPadding = "25" cellSpacing = "10"> 
            <tr>
                <h3>{vesselName}:</h3>
                  <td><button onClick={proj} class="register-button ">View Project Page</button></td>
            </tr>
    </table>


  </div>);
  }else{
    return (
      <div className="page"><h1>User Dashboard</h1>
      <h2>Welcome to your Dashboard! <br></br> Here you can view any Digital Twin Marine projects associated with your account.</h2>

      <h3>There are currently no vessels associated with this account. Please check back later.</h3>
    
      </div>);


  }
}