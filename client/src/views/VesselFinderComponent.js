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
/*         const script = document.createElement("script");
        const script2 = document.createElement("script");
         script.src =
          "https://www.vesselfinder.com/aismap.js"; 
        script2.src =
          "https://s3.tradingview.com/external-embedding/embed-widget-hotlists.js";
        script.async = true;
        script2.async = true;

        script.setAttribute("width", "100%");
        script.setAttribute("height", "300");
        script.setAttribute("imo", "9506291");
        script.setAttribute("show_track", "true");
        //script.setAttribute("names", "true");
        

        this.myRef.appendChild(script);
        this.myRef.appendChild(script2);

         */
      }
      render() {
        return (
          <div
            ref={DOMNodeRef => {
              this.myRef = DOMNodeRef;
            }}
          >
            
            <div dangerouslySetInnerHTML={{ __html: '<iframe name="vesselfinder" id="vesselfinder" '
              + ' width="' + "100%" + '"'
              + ' height="' + "300" + '"'
              + ' frameborder="0"'
              + ' src="https://www.vesselfinder.com/aismap?'
              + 'zoom=' + ((window.zoom === undefined) ? 'undefined' : window.zoom)
              + ((window.latitude === undefined) ? '&amp;lat=undefined' : '&amp;lat='+window.latitude)
              + ((window.longitude === undefined) ? '&amp;lon=undefined' : '&amp;lon='+window.longitude)
              + '&amp;width=' + window.width
              + '&amp;height=' + window.height
              + '&amp;names='+"false"
              + ((window.mmsi === undefined) ? '' : '&amp;mmsi=' + window.mmsi)
              + ((window.imo === undefined) ? '&amp;imo=9506291' : '&amp;imo=' + window.imo) //EDIT THE IMO HERE TO TRACK A SPECIFIC SHIP!!!!!
              + '&amp;track=' + "true"
              + ((window.fleet === undefined) ? '&amp;fleet=false' : '&amp;fleet='+window.fleet)
              + ((window.fleet_name === undefined) ? '&amp;fleet_name=false' : '&amp;fleet_name='+window.fleet_name)
              + ((window.fleet_timespan !== undefined) ? '&amp;fleet_timespan=' + window.fleet_timespan : '')
              + ((window.fleet_hide_old_positions === undefined) ? '&amp;fleet_hide_old_positions=false' : '&amp;fleet_hide_old_positions='+window.fleet_hide_old_positions)
              + '&amp;clicktoact=' + window.click_to_activate
              + '&amp;store_pos=' + window.store_position
              + ((window.fil === undefined) ? '' : '&amp;fil=' + window.fil)
              + ((window.default_maptype === undefined) ? '' : '&amp;default_maptype=' + window.default_maptype)
              + '&amp;ra='+window.ra
              + '">Browser does not support embedded objects.<br/>Visit directly <a href="https://www.vesselfinder.com" target="_blank">www.vesselfinder.com</a>'
              + '</iframe>'}}>
                </div>
          </div>
        );
      }
}