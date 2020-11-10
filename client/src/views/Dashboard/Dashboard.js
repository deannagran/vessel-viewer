import React, { useEffect, useContext } from "react";
import UserContext from "../../context/UserContext";
//import {findOneVessel} from "../../../server/queries";

export default function Dashboard(props) {
  const { userData } = useContext(UserContext);
  useEffect(() => {
    if (!userData.user) props.history.push("/login");
  });
  //const data = findOneVessel();
  return (
      <div className="page">
        <h1>User Dashboard</h1>
      </div>
  );
}