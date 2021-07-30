import {html} from "../../node_modules/lite-html/lite-html.js";


let chatObj;
let stompClient;
const url = "http://localhost:8080";

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

const attribution =  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
var mymap;
var points= [];

var currentUser = JSON.parse(localStorage.getItem("user"));

let markers = [];
        

export default () => {
   

  currentUser = JSON.parse(localStorage.getItem("user"));

    connectToChat();
    navigator.geolocation.watchPosition(success, error, options);

    return html`

    <div id="latitude"></div>
    <div id="longitude"></div>
    <div id="mapid"></div>
    
    `;
 
 
 }

 function success(pos) {

    var crd = pos.coords;

    if(stompClient.connected){
      sendMsg(crd.latitude,crd.longitude);
    }

    if(!mymap){
      mymap = L.map('mapid').setView([0.0, 0.0], 1);
      tiles.addTo(mymap);
    }

    for (let i=0;i<points.length;i++) {
      mymap.removeLayer(points[i]);
    }
    points=[];

    document.getElementById("latitude").innerText="Your latitude is " + crd.latitude + ". ";
    document.getElementById("longitude").innerText="Your longitude is " + crd.longitude+". " ;

    let icon = L.icon({
      iconUrl: JSON.parse(localStorage.getItem("user")).picUrl,
      iconSize: [45,45]
    })


    const marker = L.marker([crd.latitude, crd.longitude],{icon: icon}).addTo(mymap);
    points.push(marker);

    mymap.setView([crd.latitude, crd.longitude], 16);
  }
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }


   function connectToChat(){

    console.log("connection to chat...");

    let socket = new SockJS(url+"/chat");
    console.log(url);

    stompClient = Stomp.over(socket);

    stompClient.connect({},function(frame){

      
        console.log("connected to "+ frame);

        stompClient.subscribe("/topic/messages",function(response){
            let data = JSON.parse(response.body);


            console.log("RECIEVING MESSAGE")
            console.log()

            console.log(data);
            console.log(currentUser.id)

            if(data.user.id!=currentUser.id){

              let icon = L.icon({
                iconUrl: data.user.picUrl,
                iconSize: [45,45]
              })



              for (let i=0;i<markers.length;i++) {
                if(markers[i].options.uniqueId===data.user.id){
                  console.log("removing layer");
                  
                  mymap.removeLayer(markers[i]);
                  
                  markers.splice(i, 1);
                  
                  break;
                }
              }

              const marker = L.marker([data.latitude, data.longitude],{icon: icon,uniqueId: data.user.id}).addTo(mymap);

              markers.push(marker);
            }
          
        });
    })
    
}


function sendMsg(latitude, longitude){

  console.log("SENDING MESSAGE");

  stompClient.send("/app/chat",{},JSON.stringify({latitude: latitude, longitude: longitude,user: currentUser}));
}