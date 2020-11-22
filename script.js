const FPS = 10;

var healthBar = document.getElementById('box');
var health = 10;

setInterval(update, 1000/FPS);

function update() {
	healthBar.style.width = health.toString() + "%";
	if (health > 100) {
		health = 100;
	}
	if (health < 0) {
		health = 0;
	}
}


function myMap() {
  var mapProp= {
    center:new google.maps.LatLng(51.508742,-0.120850),
    zoom:5,
  };
  var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
}