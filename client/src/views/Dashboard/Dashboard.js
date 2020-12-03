import React, { useEffect, useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import { useHistory } from "react-router-dom";
import Axios from "axios";

export default function Dashboard(props) {
  let associatedVessels = null;
  const { userData, setUserData } = useContext(UserContext);
  const [vesselName, setVesselName] = useState(0);
  const [vesselArray, setVesselArray] = useState([]);

  useEffect(() => {
    // if user isnt logged in/has an invalid token, push them to login:
    if (!userData.user) props.history.push("/login");

    //query the database to autopopulate dashboard with vessels
    const findvessels = async (index) => {
      associatedVessels = await Axios.post("http://localhost:5000/users/findVessel",
      { user: userData,
        i: index
      }); 

    if(associatedVessels){
      console.log(associatedVessels.data);
    
      setVesselName(""+associatedVessels.data.retInfo);
    
      let vesselObject = ({name: ""+associatedVessels.data.retInfo, modelLink:""+associatedVessels.data.retModelLink, 
        VFlink: ""+associatedVessels.data.retVFLink, associatedUsers:associatedVessels.data.retAssociatedUsers, id: ""+associatedVessels.data.retId } );

      vesselArray.push(vesselObject); 
    }
  }

  if(userData.user && vesselArray.length === 0){
    //add to array of all associated vessels:
    for(let i = 0; i < userData.user.associatedVessels.length; i++){
      findvessels(i);
    }
  }
  });

  const history = useHistory();
  const proj = (event) => {history.push("/project")

  const id = event.target.id;
  let index = id;
  console.log(id);

  for(let i = 0; i<vesselArray.length; i++){
    if(vesselArray[i].name == id){
      index = i;
      break;
    }
  }

    if(userData){
      setUserData({
        token: userData.user.token,
        user: userData.user,
        currVessel: vesselArray[index]
      });
    }
    setVesselArray([]);
  };

  //conditionally render this bizzz
  if(vesselName){
    let listOfVessels = vesselArray.map(vessel =>
      `<h3>${vessel.name}</h3><button id="${vessel.name}" onClick={proj} class="register-button ">View Project Page</button> <br>
      `
    ).join('');

    return (
    <div className="page"><h1>User Dashboard</h1>
    <h2>Welcome to your Dashboard! <br></br> Here you can view any Digital Twin Marine projects associated with your account.</h2>
      <table border = "0" cellPadding = "25" cellSpacing = "10"> 
        <div className="content" onClick={proj} dangerouslySetInnerHTML={{__html: listOfVessels}}></div>
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