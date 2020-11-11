import React, { useEffect, useContext } from "react";
import UserContext from "../../context/UserContext";
import { useHistory } from "react-router-dom";

export default function Dashboard(props) {
  const { userData } = useContext(UserContext);
  useEffect(() => {
    console.log(userData.user);
    if (!userData.user) props.history.push("/login");
    
  });
  const history = useHistory();
  const proj = () => history.push("/project");

  return (
  <div className="page"><h1>User Dashboard</h1>
{/*     <div className="dashboard-3d-template">
      <dashboard-template></dashboard-template>
    </div>

    <div className="dashboard-projectMember-template">
      <dashboard-template></dashboard-template>
    </div> */}

    <table border = "0" cellPadding = "25" cellSpacing = "10"> 
            <tr>
                  <td><button onClick={proj} class="register-button ">View Project Page</button></td>
            </tr>
    </table>


  </div>);
}