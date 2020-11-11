import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Welcome from "./views/Welcome/Welcome";
import Home from "./views/Home/Home";
import Axios from "axios";
import NotFound from "./views/NotFound";
import ProjectPage from "./views/ProjectPage";
//import NavBar from "./components/Header/NavBar";
import Header from "./views/SiteHeader";
import Confirmation from "./views/Confirmation";
import Login from "./views/auth/Login";
import Dashboard from "./views/Dashboard/Dashboard";
import Contact from "./views/Contact/Contact";
import MyAccount from "./views/MyAccount/MyAccount";
import Register from "./views/auth/Register";
import UserContext from "./context/UserContext";
import "./style.css";

export default function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post(
        "http://localhost:5000/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await Axios.get("http://localhost:5000/users/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };
    checkLoggedIn();
  }, []);

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />          
              <Route path="/welcome" component={Welcome} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/contact" component={Contact} />
              <Route path="/project" component={ProjectPage} />
              <Route path="/myAccount" component={MyAccount} />
              <Route path="/confirmation" component={Confirmation} />
              <Route path="*" component={NotFound} />
            </Switch>
          </div>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}
