var type = document.querySelector("#type");
var image = document.querySelector("#sumbittedImage");
var long;
var lati;
var comment = document.querySelector("#comment");

window.onload = function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setCoords);
      } else {
        console.log('oof');
      }
}

function setCoords(position) {
    long = position.coords.longitude;
    lati = position.coords.latitude;
    console.log(long);
    console.log(lati);
}

function SubmitForm() {
    axios.post('https://xmyg5r4knd.execute-api.us-west-2.amazonaws.com/dev/post', {
      litterType: type.value,
      comment: comment.value,
      long: long,
      lati: lati,
      image: 'cool! doesn\'t work'
    })
    .then(function (response) {
      window.location.replace("../html/index.htm");
    })
}


