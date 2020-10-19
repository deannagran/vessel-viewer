import React, { useEffect, useContext } from "react";
import UserContext from "../../context/UserContext";

export default function Dashboard(props) {
  const { userData } = useContext(UserContext);
  useEffect(() => {
    if (!userData.user) props.history.push("/login");
  });
  return <div className="page"><h1>User Dashboard</h1></div>;
}