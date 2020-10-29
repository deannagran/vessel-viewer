import React from "react"

import { useHistory } from "react-router-dom";

export default function Welcome(){

      const history = useHistory();
      const login = () => history.push("/login");
      const register = () => history.push("/register");

      return(
      <div className="page">
      <h1>Welcome!</h1>
      <table border = "0" cellPadding = "25" cellSpacing = "10"> 
            <tr>
                  <td><h2>New here?</h2><button onClick={register} class="register-button ">Register</button></td>
            </tr>
            <tr>
                  <td><h2>Already have an account?</h2> <button onClick={login} class="login-button ">Log In</button></td>
            </tr>
      </table>
    </div>
  );
}