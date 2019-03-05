//import Geocode from "react-geocode";

function initMap() { //initation
    map = new google.maps.Map(document.querySelector('#map'), { // where the map is located in HMTL
      center: {lat:21.4389, lng:-158.0001}, //where it will be defaulted too
      zoom: 10, //zoom of how close it is
      mapTypeId: 'satellite'
    });
}

// request to endpoint API
axios.get(`https://xmyg5r4knd.execute-api.us-west-2.amazonaws.com/dev/get`)
  .then(function (response) {
    let tempHold = JSON.parse(response.data.body);
    let superHold = tempHold.message.rows;
    pins = superHold;
    heatedPosition = pins.map(element => {
      return new google.maps.LatLng(element.lati, element.long);
    });
    

    
    pins.forEach((element, index) => { // Like Enuemrate, with index being int

      var marker = new google.maps.Marker({
        position: {lat:parseFloat(element.lati),lng:parseFloat(element.long)},
        map: map,
        title: 'Hello World!'
      });
      marker.addListener('click', function() {
        DisplayFromPin(element.littertype,element.comment);
        console.log(element);
        map.setZoom(10);
        map.setCenter(marker.getPosition());
      });
      heatMap = new google.maps.visualization.HeatmapLayer({
        data: heatedPosition,
        map: map
      });
      
      // Converts Long/Lat to Address
      var lat = superHold[index].lati;
      var lng = superHold[index].long;
      var latlng = new google.maps.LatLng(lat, lng);
      var geocoder = geocoder = new google.maps.Geocoder();
      var address;
      geocoder.geocode({ 'latLng': latlng }, function (results, status) {   // GEODCODE BUILT IN THEN
          if (status == google.maps.GeocoderStatus.OK) {
              if (results[1]) {
                  console.log(results[1].formatted_address)
                  address = results[1].formatted_address
              }
          }
          // Renders Data to Side Bar
          document.getElementById("content").innerHTML += `
          <p class="content"> ${address} </p> 
          `;
          // ${superHold[index].lati}, ${superHold[index].long}  ${element.littertype}: ${element.comment}
      })
    });
  });



function DisplayFromPin(type,comment) {
    let tempCard = document.createElement("DIV");
    tempCard.className = "cardContainer"
    tempCard.innerHTML = `
        <button class="close" onclick="Close()">X</button> 
        <div class="card">
            <h1 class="type">${type}</h1>
            <p class="comment">${comment}</p>
        </div>
    `;
    document.getElementById("root").appendChild(tempCard);
}


function Close() {
    document.getElementsByClassName("cardContainer")[0].remove();
}


