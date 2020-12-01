import React, { useState, useEffect, useContext, Component } from "react";
import UserContext from "../context/UserContext";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Axios from "axios";

//const AddProjectMembersComponent = (props) => {

/* const [addMember, setAddMember] = useState({
        visible: false,
        id: null,
    });
    
    const cancel = () => {
    setAddMember({
        visible: false,
        id: null,
    });
    }

    const showAdd = () => {
    setAddMember({
        visible: true,
        id: null,
    });
    } */

   // const [email, setEmail] = useState(null);

   //WORKING HERE=================
 /*    const submit = () => { }
    

    export default () => (
        <Popup trigger={<button class="register-button "> Add Project Member </button>} position="right center">
          <div>Add a new user to this project via email address. ‏‏‎ ‎‏‏‎ ‎
          ‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‎‎
          <form class="ui form small fluid">
              <div class="required field">
                <input
                  style={{ height: "35px" }}
                  type="text"
                  required
                  placeholder="Email"
                  //onChange={(e) => setEmail(e.target.value)}
                ></input>
              </div>
              <button class="register-button " type="submit" onClick={submit}>
                Submit
              </button>
            </form>

          </div>
        </Popup>
      ); */
      const axiosAddUser = async (emailstring) => {
        let routeResponse = await Axios.post("http://localhost:5000/users/addProjectMember",
        { email: emailstring
        }); 
  
        if(routeResponse){
            console.log("response: " + routeResponse.data.nameOfAddedUser);
        }else{
            console.log("no response!");
        }
      }

      const  AddProjectMembersComponent = () => {
        const [email, setEmail] = useState(null);
        const submit = () => {
        if(email){
            console.log(email);
            setOpen(false); 
            axiosAddUser(email);
            setEmail(null);
        }
        
        }
        const [open, setOpen] = useState(false);
        const closeModal = () => {
            setOpen(false);
            setEmail(null);
        };

        return(
/*             <Popup trigger={<button className="register-button "> Add Project Member </button>} position="right center">
            <div>Add a new user to this project via email address. ‏‏‎ ‎‏‏‎ ‎
            ‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‎‎
           <form class="ui form small fluid">
                <div class="required field">
                  <input
                    style={{ height: "35px" }}
                    type="text"
                    required
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </div>
                <button class="register-button " type="submit" onClick={close}>
                  Submit
                </button>
              </form>
            </div> 
          </Popup> */
          <div>
          <button type="button" className="register-button" onClick={() => setOpen(o => !o)}>
            Add New Project Member
          </button>
          <Popup open={open} closeOnDocumentClick onClose={closeModal}>
              
            <div className="modal">
                
            Add a new user to this project via email address. ‏‏‎ ‎
            <br></br>
‏‏‎
            

            </div>
            <form class="ui form small fluid">
                <div class="required field">
                  <input
                    style={{ height: "35px" }}
                    type="text"
                    required
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </div>
                <button type="button" className="register-button" onClick={closeModal}>Cancel</button>
                <button class="register-button " type="submit" onClick={submit}>
                  Submit
                </button>
                
              </form>
            
          </Popup>

        </div>
        )
        }
      
        export default AddProjectMembersComponent;
//}
