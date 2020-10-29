import React, { useEffect, useContext } from "react";
import UserContext from "../../context/UserContext";

export default function MyAccount(props) {
  const { userData } = useContext(UserContext);
  useEffect(() => {
    if (!userData.user) props.history.push("/login");
  });
  return (
    <label htmlFor="my-account-info-label">My Account Info</label>
    
    );
}