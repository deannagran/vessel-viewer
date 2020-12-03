import React, { useEffect, useContext } from "react";
import UserContext from "../../context/UserContext";

export default function Contact(props) {
  const { userData } = useContext(UserContext);
  useEffect(() => {
    if (!userData.user) props.history.push("/login");
  });
  if (userData.user){
    const fname = userData.user.firstName;
    const lname = userData.user.lastName;
    const fnameCapitalized = fname.charAt(0).toUpperCase() + fname.slice(1);
    const lnameCapitalized = lname.charAt(0).toUpperCase() + lname.slice(1);
    var cname = fnameCapitalized + ' ' + lnameCapitalized;
  } else {
    var cname = "";
  }
  if (userData.user){
  return (
  <div className="page">
    <h1>Contact Digital Twin Marine</h1>
    <form id="contact-form" /*onSubmit={handleSubmit.bind(this)} method="POST"*/>
    <div className="contactlabel">
        <label htmlFor="name">Name</label>
        <input type="text" className="contactinput" defaultValue={cname} />
    </div>
    <div className="contactlabel">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input type="email" className="contactinput" aria-describedby="emailHelp" defaultValue={userData.user.email} />
    </div>
    <div className="contactlabel">
        <label htmlFor="name">Phone Number (Optional)</label>
        <input type="text" className="contactinput" />
    </div>
    <div className="contactlabel">
        <label htmlFor="message">Company (If Applicable)</label>
        <input type="text" className="contactinput"  />
    </div>
    <div className="contactlabel">
        <label htmlFor="message">Message</label>
        <textarea className="contactinput-message" rows="5"></textarea>
    </div>
    <button type="submit" className="contactbutton">Submit</button>
    </form> 
  </div>
  );
  } else{
    return (
      <div className="page">
      <h1>Contact Digital Twin Marine</h1>
      <form id="contact-form" /*onSubmit={handleSubmit.bind(this)} method="POST"*/>
      <div className="contactlabel">
          <label htmlFor="name">Name</label>
          <input type="text" className="contactinput"  />
      </div>
      <div className="contactlabel">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="contactinput" aria-describedby="emailHelp" />
      </div>
      <div className="contactlabel">
          <label htmlFor="name">Phone Number (Optional)</label>
          <input type="text" className="contactinput" />
      </div>
      <div className="contactlabel">
          <label htmlFor="message">Company (If Applicable)</label>
          <input type="text" className="contactinput"  />
      </div>
      <div className="contactlabel">
          <label htmlFor="message">Message</label>
          <textarea className="contactinput-message" rows="5"></textarea>
      </div>
      <button type="submit" className="contactbutton">Submit</button>
      </form> 
    </div>
    );
  }
}