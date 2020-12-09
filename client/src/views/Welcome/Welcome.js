import React, { useEffect, useContext } from "react";
import UserContext from "../../context/UserContext";
import { useHistory } from "react-router-dom";

export default function Welcome(props){
      const { userData } = useContext(UserContext);
      useEffect(() => {
        if (userData.user){
            if(userData.user.webMaster){ 
                  props.history.push("/webMaster");
            }
            else{
                  props.history.push("/dashboard");
            }
        }
      });

      const history = useHistory();
      const login = () => history.push("/login");
      const register = () => history.push("/register");

      return(
      <div className="page">
      <center><h1 class="h1-responsive font-weight-bold text-center my-4">Welcome to the Digital Twin Marine Vessel Viewer!</h1>
      <table border = "0" cellPadding = "25" cellSpacing = "10"> 
            <tr>
                  <center><td><h2>New here?</h2><button onClick={register} class="register-button ">Register</button></td></center>
            </tr>
            <tr>
            <center><td><h2>Already have an account?</h2> <button onClick={login} class="login-button ">Log In</button></td></center>
            </tr>
      </table></center>
    </div>
  );
}