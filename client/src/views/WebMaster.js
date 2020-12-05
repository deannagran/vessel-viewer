import React, { useState, useEffect, useContext, Component } from "react";
import UserContext from "../context/UserContext";
import WebMasterAddVessel from "./WebMasterAddVessel";
import WebMasterConnect from "./WebMasterConnect";
import WebMasterList from "./WebMasterList";

export default function WebMaster(props) {
    const { userData, setUserData } = useContext(UserContext);

    useEffect(() => {
      if (!userData){
        props.history.push("/login");
      }else if(userData.user && !userData.user.webMaster){
        props.history.push("/dashboard");
      }
    });

    return(
      <div>
        <br></br>
      <div className="modal">       
      <br></br>
      </div>
      <WebMasterAddVessel></WebMasterAddVessel>
      <br></br>
      <WebMasterConnect></WebMasterConnect>
      <main style={{ marginTop: "50px" }} className="main">
            <div class="ui two column grid">
            <div class="row">
            <div
                style={{ width: "55%" }}
                class="table-responsive"
                className="tableWrapper"
              >
                <table class="ui stackable single line fixed striped selectable table padded ">
                  <thead>
                    <tr>
                      <th>Vessels</th>
                      <th class="four wide" colspan="2">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  
                </table>
              </div>

              <div
                style={{ width: "35%", marginLeft: "50px", marginTop: "-20px" }}
                class="six wide column"
              >
              </div>

            </div>
              <div class="row">
              <div class="column">
              </div>
              <div class="column">
              </div>
              </div>
            </div>
          </main>
      </div>
    );
};