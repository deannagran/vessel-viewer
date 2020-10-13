import React, { useEffect, useContext } from "react";
import UserContext from "../../context/UserContext";

export default function Home(props) {
  const { userData } = useContext(UserContext);
  useEffect(() => {
    if (!userData.user) props.history.push("/login");
  });
  return <div>Home Page</div>;
}