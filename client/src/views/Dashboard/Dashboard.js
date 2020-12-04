import React, { useEffect, useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';

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
        VFlink: ""+associatedVessels.data.retVFLink, associatedUsers:associatedVessels.data.retAssociatedUsers, id: ""+associatedVessels.data.retId, numComments: ""+associatedVessels.data.retNumComments} );

      vesselArray.push(vesselObject); 
    }
  }

  if(userData.user && vesselArray.length === 0){
    //add to array of all associated vessels:
    for(let i = 0; i < userData.user.associatedVessels.length; i++){
      findvessels(i);
      //setVesselName("");
    }
  }
  });

  const history = useHistory();
  const proj = (event) => {
    //brings user to the project page, and updates our currVessel attribute depending on the button user clicked:
    
    const id = event.target.id;
    let index = null;
    console.log(id);

    for(let i = 0; i<vesselArray.length; i++){
      if(vesselArray[i].name == id){
        index = i;
        break;
      }
    }

    if(index != null){
      history.push("/project")
      if(userData){
        setUserData({
          token: userData.user.token,
          user: userData.user,
          currVessel: vesselArray[index]
        });
      }
      setVesselArray([]);
    }
  };

  function refreshPage() {
    setVesselName('');
  }

  //conditionally render this bizzz
  //if(userData.user && vesselArray.length == userData.user.associatedVessels.length){
  if(vesselArray.length > 0 && userData.user && vesselArray.length == userData.user.associatedVessels.length){
    let listOfVessels = vesselArray.map(vessel =>
      `<div class="card bg-light mb-3" style="width: 18rem">
      <img class="card-img-top" src="" alt="Card image">
      <div class="card-body">
      <h3 class="card-title">${vessel.name}</h3>
      <button id="${vessel.name}" onClick={proj} class="register-button ">View Project Page</button> 
      <br>
      </div>
      </div>
      <br>
       
      `
    ).join('');

    return (
    <div className="page"><h1>User Dashboard</h1>
    <h2>Welcome to your Dashboard! <br></br> Here you can view any Digital Twin Marine projects associated with your account.</h2>
      <table border = "0" cellPadding = "25" cellSpacing = "10"> 
        <div  onClick={proj} dangerouslySetInnerHTML={{__html: listOfVessels}}></div>
      </table>
    </div>);
  }else if(userData.user && userData.user.associatedVessels.length == 0){
    return (
      <div className="page"><h1>User Dashboard</h1>
      <h2>Welcome to your Dashboard! <br></br> Here you can view any Digital Twin Marine projects associated with your account.</h2>
      <h3>There are currently no vessels associated with this account. Please check back later.</h3>
      </div>);
  }else if(userData.user && userData.user.associatedVessels.length !== 0){
    setTimeout(function() { refreshPage(); }, 1000);
    return(
      <div className="page"><h1>User Dashboard</h1>
      <h2>Welcome to your Dashboard! <br></br> Here you can view any Digital Twin Marine projects associated with your account.</h2>

      Hang tight! We're loading your vessels. <br></br>
      
      <div class="spinner-border text-primary" role="status">
      <span class="sr-only">Loading...</span>
      </div>
      <br></br>
      <button class="register-button " onClick={refreshPage}>Click to reload</button>
      </div> 
    );
  }else{
    return (
      <div className="page"><h1>User Dashboard</h1>
      <h2>Welcome to your Dashboard! <br></br> Here you can view any Digital Twin Marine projects associated with your account.</h2>
      <h3>There are currently no vessels associated with this account. Please check back later.</h3>
      </div>);
  }
}