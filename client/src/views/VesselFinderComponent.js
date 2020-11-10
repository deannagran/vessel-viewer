import React, { Component } from "react";
//import ScriptTag from 'react-script-tag';
//Reference : https://stackoverflow.com/questions/60346201/how-to-embed-external-js-script-file-into-react-component

export default class VesselFinderComponent extends Component {
/*     componentDidMount() {
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
      } */

      constructor(props) {
        super(props);
        this.myRef = React.createRef();
      }
      componentDidMount() {
        const script = document.createElement("script");
        const script2 = document.createElement("script");
        script.src =
          "https://www.vesselfinder.com/aismap.js";
        script2.src =
          "https://s3.tradingview.com/external-embedding/embed-widget-hotlists.js";
        script.async = true;
        script2.async = true;
    
        this.myRef.appendChild(script);
        this.myRef.appendChild(script2);
      }
      render() {
        return (
          <div
            ref={DOMNodeRef => {
              this.myRef = DOMNodeRef;
            }}
          >
            display embedded scripts:
          </div>
        );
      }
}