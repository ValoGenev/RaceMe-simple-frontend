
 
  import {render,html} from "../node_modules/lite-html/lite-html.js";
  import home from "../src/views/home.js"
  import socialLogin from "../src/views/social-login.js";
  import notFound from "../src/views/not-found.js";
  import map from "../src/views/map.js";


let routes = [
    {
        pathName : "/",
        template: home,
    },
    {
        pathName : "/social-login",
        template: socialLogin,
        mandatoryFunction : checkCredentials
    },
    {
        pathName : "/not-found",
        template: notFound
    },
    {
        pathName : "/map",
        template: map
    }

];

export default  async function router(currentPath){

    let route = routes.find(r=>new RegExp(`^${r.pathName}$`,`i`).test(currentPath)) || routes.find(r=>r.pathName=="/not-found");
    
    console.log(route);

    

    if(route.mandatoryFunction){
    
        route.mandatoryFunction();
        
    }else {
        history.pushState({},"",currentPath);
        render(route.template(),document.getElementById("root"));
    }

    
}

async function checkCredentials(){

        let params = new URLSearchParams(window.location.search);
        let code = params.get("code");
        let type = params.get("type");


        const response  = await fetch(`http://localhost:8080/social/login?code=${code}&type=${type}`,{
        method: 'POST', 
        mode: 'cors', 
        credentials: 'include', 
        headers: {
            'Content-Type': 'application/json'
          }

     })


    let jsonResult = await response.json();

    console.log(response.status);

    if(response.status==200){
        localStorage.setItem("user",JSON.stringify(jsonResult));
        router("/map");
    }else {
        router("/");
    }
    
}


