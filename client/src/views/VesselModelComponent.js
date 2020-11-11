import React, { Component } from "react";
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
            display model here:
            
          </div>
        );
      }
}