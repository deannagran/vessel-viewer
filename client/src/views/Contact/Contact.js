import React, { useEffect, useContext } from "react";
import UserContext from "../../context/UserContext";

export default function Contact(props) {
  const { userData } = useContext(UserContext);
  useEffect(() => {
    if (!userData.user) props.history.push("/login");
  });
  return <div className="page"><h1>Contact Digital Twin Marine</h1></div>;
}