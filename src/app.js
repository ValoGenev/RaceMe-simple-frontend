 import  router from "./router.js"


  router(location.pathname);

  window.addEventListener("popstate",(e)=>{
     console.log(location.pathname);
     router(location.pathname);
})