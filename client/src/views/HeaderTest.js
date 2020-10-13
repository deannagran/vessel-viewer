import React from "react";
import { Link } from "react-router-dom";
import AuthOptions from "./auth/AuthOptions";
//import dtmlogo from './assets/dtmlogo.png';

export default function HeaderTest() {
  return (
    <header id="header">
      <Link to="/">
        <h1 className="title">DIGITAL TWIN MARINE</h1>
      </Link>
      <AuthOptions />
    </header>
  );
}