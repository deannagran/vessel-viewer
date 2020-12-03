import React, { useEffect, useContext } from "react";
import UserContext from "../context/UserContext";

export default function Comments(props) {
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

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;

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
				      <p class="meta">{today}<a href="#">    JohnDoe</a> says: <i class="pull-right"></i></p>
				      <p>
				          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				          Etiam a sapien odio, sit amet
				      </p>
				  </div>
				</li>
				<li class="clearfix">
				  <img src="https://www.clipartkey.com/mpngs/m/152-1520367_user-profile-default-image-png-clipart-png-download.png" class="avatar" alt=""></img>
				  <div class="post-comments">
				      <p class="meta">{today}<a href="#">    JohnDoe</a> says: <i class="pull-right"></i></p>
				      <p>
				          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				          Etiam a sapien odio, sit amet
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
  } else{
    return (null);
  }
}