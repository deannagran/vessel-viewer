import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import Alert from 'react-bootstrap/Alert'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Contact(props) {

  const [show, setShow] = useState(true);
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

  const sent = () => 
  {
    setShow(true);
  }

  if (userData.user){
    if(show){
      return(<div className="page"> <Alert variant="success" onClose={() => setShow(false)} dismissible>
      <Alert.Heading>Your message has been sent successfully!</Alert.Heading>
      </Alert> <center><h1 className="accountlabel">Contact Digital Twin Marine</h1></center>
          <form className="contact" id="contact-form" action = "/users/sendContact" method = "post">
          <div className="contactlabel">
              <label htmlFor="name">Name</label>
              <input type="text" className="contactinput" defaultValue={cname}
               name = "user_name" />
          </div>
          <div className="contactlabel">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input type="email" className="contactinput" name = "user_email"
              aria-describedby="emailHelp" defaultValue={userData.user.email} />
          </div>
          <div className="contactlabel">
              <label htmlFor="name">Phone Number (Optional)</label>
              <input type="text" className="contactinput" name = "user_phone" />
          </div>
          <div className="contactlabel">
              <label htmlFor="message">Company (If Applicable)</label>
              <input type="text" className="contactinput" name = "user_company" />
          </div>
          <div className="contactlabel">
              <label htmlFor="message">Message</label>
              <textarea className="contactinput-message" name = "user_message" 
              rows="5"></textarea>
          </div>
          <button type="submit" onClick = {sent}  className="contactbutton">Submit</button>
          </form> 
        </div>);
      
    }else{
      return (
        <div className="page">
          <h1>Contact Digital Twin Marine</h1>
          <form id="contact-form" action = "/users/sendContact" method = "post">
          <div className="contactlabel">
              <label htmlFor="name">Name</label>
              <input type="text" className="contactinput" defaultValue={cname}
               name = "user_name" />
          </div>
          <div className="contactlabel">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input type="email" className="contactinput" name = "user_email"
              aria-describedby="emailHelp" defaultValue={userData.user.email} />
          </div>
          <div className="contactlabel">
              <label htmlFor="name">Phone Number (Optional)</label>
              <input type="text" className="contactinput" name = "user_phone" />
          </div>
          <div className="contactlabel">
              <label htmlFor="message">Company (If Applicable)</label>
              <input type="text" className="contactinput" name = "user_company" />
          </div>
          <div className="contactlabel">
              <label htmlFor="message">Message</label>
              <textarea className="contactinput-message" name = "user_message" 
              rows="5"></textarea>
          </div>
          <button type="submit" onClick = {sent}  className="contactbutton">Submit</button>
          </form> 
        </div>
        );
    }
  } else{
    return (
      <div className="page">
      <h1>Contact Digital Twin Marine</h1>
      <form id="contact-form" action = "/users/sendContact" method = "post">
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
      <button type="submit" onClick = {sent}  className="contactbutton">Submit</button>
      </form> 
    </div>
    );
  }
}