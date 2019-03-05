import Geocode from "react-geocode";
// Enable or disable logs. Its optional.
Geocode.enableDebug();
 
// Get address from latidude & longitude.
Geocode.fromLatLng("48.8583701", "2.2922926").then(
  response => {
    const address = response.results[0].formatted_address;
    console.log(address);
  },
  error => {
    console.error(error);
  }
);

console.log("OOOOOOF")