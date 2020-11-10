import React, { Component } from "react";
//import ScriptTag from 'react-script-tag';

export default class VesselFinderComponent extends Component {
    componentDidMount() {
        const script = document.createElement("script");
        script.src = "https://www.vesselfinder.com/aismap.js";
        script.async = true;
        script.setAttribute("imo", "9506291")
        script.onload = () => this.scriptLoaded();
      
      }
      
    
      render() {
        return (
          <div>
            <div id="scriptTarget" />
            <div className="main">
              // Other stuff

            </div>
          </div>
        );
      }
}