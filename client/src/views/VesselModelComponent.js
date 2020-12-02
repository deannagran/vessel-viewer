import React, { Component } from "react";
import ReactDOM from "react-dom";
//import Iframe from 'react-iframe'
//import ScriptTag from 'react-script-tag';
//Reference : https://stackoverflow.com/questions/60346201/how-to-embed-external-js-script-file-into-react-component

export default class VesselModelComponent extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
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
          + ' src="https://urldefense.proofpoint.com/v2/url?u=https-3A__3d.digitaltwinmarine.com_embed.html-3Fkey-3DWMj4r7wl&d=DwMGaQ&c=sJ6xIWYx-zLMB3EPkvcnVg&r=esKfyh5rIunhCC29WCfEiGMpVff7K3zmMQ0Omkr0Svs&m=yMfLgIWssDimaMedqHbegz0xrWhHc0cDP84PoR19pbM&s=FO9CZFew0DUOQ0sSeV0_3uovZQ6DB6FVoZX-oDgErpM&e='
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
