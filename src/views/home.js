import {html} from "../../node_modules/lite-html/lite-html.js";

export default () => html`


  
  <div id="title">
    <h1>
          Welcome to RaceMe.com 
    </h1>
   
  
   <a href="https://github.com/login/oauth/authorize?client_id=717b8d2929d1a2a42222&scope=user:email">LOGIN WITH GITHUB</a>
   <p></p>
   <a href="https://www.facebook.com/v11.0/dialog/oauth?client_id=231495668836527&redirect_uri=http://localhost:8000/social-login&scope=email">LOGIN WITH FACEBOOk</a>
   <p></p>
   <a href="https://accounts.google.com/o/oauth2/v2/auth?client_id=903094524397-l5ahe7ri356a19p2iej65oagmp35sjud.apps.googleusercontent.com&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile&redirect_uri=http://localhost:8000/social-login">LOGIN WITH GOOGLE</a>
   </div>


`;

