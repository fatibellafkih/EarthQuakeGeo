let map;

let magMin, magMax, timeMin, timeMax, apiData;

var getJSON = function (url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, false);
  xhr.onload = function () {
    var status = xhr.status;
    if (status === 200) {
      callback(null, xhr.response);
    } else {
      callback(status, xhr.response);
    }
  };
  xhr.send();
  return xhr;
};

// visualise worldwide map with france as a default position
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: {
      lat: 46.232192999999995,
      lng: 2.209666999999996
    },
    zoom: 2,
    mapTypeId: "terrain",
  });

  // Create a <script> tag and set the USGS URL as the source.
  const script = document.createElement("script");

  magMin = sessionStorage.getItem("magMin");
  magMax = sessionStorage.getItem("magMax");
  timeMin = new Date(sessionStorage.getItem("timeMin"));
  timeMax = new Date(sessionStorage.getItem("timeMax"));
  console.log(magMax);
  // load data from API and exctract them
  script.src =
    "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojsonp";
  document.getElementsByTagName("head")[0].appendChild(script);
  map.data.setStyle((feature) => {
    var magnitude = feature.getProperty("mag");
    var time = feature.getProperty("time");
    if ((timeMax != "Invalid Date" && timeMax != null) && (timeMin != "Invalid Date" && timeMin != null) && magMin != null && magMax != null) {
      if (magnitude <= magMin || magnitude >= magMax || time <= timeMin.getTime() || time >= timeMax.getTime()) {
        magnitude = 0;
      }
    }
    return {
      icon: getCircle(magnitude),
    };
  });

}

function getCircle(magnitude) {
  const circle = new google.maps.Circle({
    path: google.maps.SymbolPath.CIRCLE,
    fillColor: "red",
    title: "hey",
    fillOpacity: 0.2,
    scale: Math.pow(2, magnitude) / 2,
    strokeColor: "white",
    strokeWeight: 0.5,
  });

  //circle is the google.maps.Circle-instance
  google.maps.event.addListener(circle, 'mouseover', function () {
    this.getMap().getDiv().setAttribute('title', this.get('title'));
    alert(circle.title);
  });

  google.maps.event.addListener(circle, 'mouseout', function () {
    this.getMap().getDiv().removeAttribute('title');
  });

  return circle;
}

function eqfeed_callback(results) {
  map.data.addGeoJson(results);
  console.log(map.data);
}

function getInput() {

  const magn = {
    magnmin: document.getElementById("magnmin").value,
    magnmax: document.getElementById("magnmax").value,
  }
  const time = {
    timemin: new Date(document.getElementById("datemin").value),
    timemax: new Date(document.getElementById("datemax").value),
  }


  sessionStorage.setItem("magMin", magn.magnmin);
  sessionStorage.setItem("magMax", magn.magnmax);
  sessionStorage.setItem("timeMin", time.timemin);
  sessionStorage.setItem("timeMax", time.timemax);

  console.log("magnitude choosen : [" + magn.magnmin + "," + magn.magnmax + "] \n period of time between " + time.timemin + " and " + time.timemax);
  alert("magnitude choosen : [" + magn.magnmin + "," + magn.magnmax + "] \n period of time between " + time.timemin + " and " + time.timemax);
}





/* return {
  path: google.maps.SymbolPath.CIRCLE,
  fillColor: "red",
  fillOpacity: 0.2,
  scale: Math.pow(2, magnitude) / 2,
  strokeColor: "white",
  strokeWeight: 0.5,
};*/