import React, { useState, useEffect, useContext } from "react";
import UserContext from "../context/UserContext";
import Axios from "axios";

export default function Comments(props) {
  const { userData } = useContext(UserContext);
  const [commentsArray, setCommentsArray] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [commentText, setCommentText] = useState("");
  useEffect(() => {
    if (!userData.user) props.history.push("/login");

    //query the database to autopopulate dashboard with vessels
    const findComments = async (index) => {
        let associatedComments = await Axios.post("http://localhost:5000/users/getComment",
        { vesselID: userData.currVessel.id,
          i: index
        }); 
      
        if(associatedComments){
            console.log(associatedComments.data);
            
            
            let commentObject = ({poster: ""+associatedComments.data.poster, date:""+associatedComments.data.postedDate, comment: ""+associatedComments.data.comment} );
        
            commentsArray.push(commentObject); 
        }else{
            console.log("didnt work");
        }
    }



/*     let numComments = 0;
    if(userData.user && userData.user.currVessel){
        numComments = userData.user.currVessel.numComments;
        console.log("finding " + userData.user.currVessel.numComments + " comments..." )
    }else{
        setTimeout(function() { refreshPage(); }, 3000);

    } */

    if(userData.user && userData.currVessel && commentsArray.length === 0){
        //add to array of all associated comments:
        for(let i = 0; i < userData.currVessel.numComments; i++){
            findComments(i);
            console.log("finding " + userData.currVessel.numComments + " comments..." )
        }
      }
}); 
function refreshPage() {
    setRefresh(true);
}

const postCommentToDatabase = async (content) => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    let postCommentResponse = await Axios.post("http://localhost:5000/users/postComment",
    { vesselID: userData.currVessel.id,
      posterID: userData.user.id,
      date: today,
      content: content
    });

    if(postCommentResponse){
        console.log("posted!");
    }
}

const del = (event) => {
    //delete the comment that the user clicked on:
    event.preventDefault();
    const id = event.target.id;
    let index = null;
    console.log("clicked: " + event.target.id); //the comment id is just the comment content itself

    for(let i = 0; i<commentsArray.length; i++){
        if(commentsArray[i].comment == id){
          index = i;
          break;
        }
    }

    if(index != null){
        //delete at this index in comment array!
        console.log("hey");
    }
}

const postComment = () => {
    console.log("posting " + commentText);
    postCommentToDatabase(commentText);
}

  if (userData.user){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;

    let listOfComments = commentsArray.map(comment =>
        `<li class="clearfix">
        <img src="https://www.clipartkey.com/mpngs/m/152-1520367_user-profile-default-image-png-clipart-png-download.png" class="avatar" alt=""></img>
        <div class="post-comments">
            <p class="meta" id="${comment.comment}" >${comment.date + "  "}<a href="#">${comment.poster}</a> says: <i class="pull-right"><button class="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button></i></p>
            <p>
                ${comment.comment}
            </p>
        </div>
      </li>
        `
      ).join('');

    if(commentsArray.length > 0){
        return (
            <div class="container bootstrap snippets bootdey">
            <div class="row">
                <div class="col-md-12">
                    <div class="blog-comment">
                        <h3 class="text-success">Comments</h3>
                        <hr/>
                        <ul class="comments">
                        <li class="clearfix">
                          <img src="https://www.clipartkey.com/mpngs/m/152-1520367_user-profile-default-image-png-clipart-png-download.png" class="avatar" alt=""></img>
                          <div class="post-comments">
                              <p class="meta"> {today} <a href="#">    Digital Twin Marine</a> says: <i class="pull-right"></i></p>
                              <p>
                                  Welcome to your project page! Here you can leave comments regarding your vessel and Digital Twin Marine will be notified.
                              </p>
                          </div>
                        </li>
                        <div onClick={del} dangerouslySetInnerHTML={{__html: listOfComments}}></div>
                        <div class="form-group">
                        
                        <label for="comment"></label>
                        <textarea onChange={(e) => setCommentText(e.target.value)} placeholder="Leave a comment..." class="form-control" rows="5" id="comment"></textarea>
                        <div class="float-right"><button onClick={postComment} class="btn btn-primary" type="submit">Post Comment</button></div>
                        </div>
                        
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        );
    }else if(userData.currVessel.numComments > 0){
        //finish loading comments
        setTimeout(function() { refreshPage(); }, 1000);
        return(      
            <div class="spinner-border text-primary" role="status">
            <span class="sr-only">Loading...</span>
            </div>
        );
    }else{
        return (
            <div class="container bootstrap snippets bootdey">
            <div class="row">
                <div class="col-md-12">
                    <div class="blog-comment">
                        <h3 class="text-success">Comments</h3>
                        <hr/>
                        <ul class="comments">
                        <li class="clearfix">
                          <img src="https://www.clipartkey.com/mpngs/m/152-1520367_user-profile-default-image-png-clipart-png-download.png" class="avatar" alt=""></img>
                          <div class="post-comments">
                              <p class="meta"> {today} <a href="#">    Digital Twin Marine</a> says: <i class="pull-right"></i></p>
                              <p>
                                  Welcome to your project page! Here you can leave comments regarding your vessel and Digital Twin Marine will be notified.
                              </p>
                          </div>
                        </li>
                        <div class="form-group">
                        <label for="comment"></label>
                        <textarea placeholder="Leave a comment..." class="form-control" rows="5" id="comment"></textarea>
                        </div>
                        <div class="float-right"><button class="btn btn-primary" type="submit">Post Comment</button></div>
                        </ul>
                        
                    </div>
                </div>
            </div>
        </div>
        );
    }
    } else{
        /* return (
            <div class="container bootstrap snippets bootdey">
            <div class="row">
                <div class="col-md-12">
                    <div class="blog-comment">
                        <h3 class="text-success">Comments</h3>
                        <hr/>
                        <ul class="comments">
                        <li class="clearfix">
                          <img src="https://www.clipartkey.com/mpngs/m/152-1520367_user-profile-default-image-png-clipart-png-download.png" class="avatar" alt=""></img>
                          <div class="post-comments">
                              <p class="meta">12/3/2020<a href="#">    Digital Twin Marine</a> says: <i class="pull-right"></i></p>
                              <p>
                                  Welcome to your project page! Here you can leave comments regarding your vessel and Digital Twin Marine will be notified.
                              </p>
                          </div>
                        </li>
                        <div class="form-group">
                        <label for="comment"></label>
                        <textarea placeholder="Leave a comment..." class="form-control" rows="5" id="comment"></textarea>
                        </div>
                        <div class="float-right"><button class="btn btn-primary" type="submit">Post Comment</button></div>
                        </ul>
                        
                    </div>
                </div>
            </div>
        </div>
        ); */
        return(null);
    }
}