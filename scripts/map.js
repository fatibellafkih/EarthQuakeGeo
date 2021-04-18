let map;

// visualise worldwide map with france as a default position
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 46.232192999999995, lng: 2.209666999999996 },
    zoom: 2,
    mapTypeId: "terrain",
  });

  // Create a <script> tag and set the USGS URL as the source.
  const script = document.createElement("script");

  // load data from API and exctract them
  script.src =
    "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojsonp";
  document.getElementsByTagName("head")[0].appendChild(script);
  map.data.setStyle((feature) => {
    const place = feature.getProperty("place");
    const magnitude = feature.getProperty("mag");
    const time = feature.getProperty("time");
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
   google.maps.event.addListener(circle,'mouseover',function(){
    this.getMap().getDiv().setAttribute('title',this.get('title'));
    alert(circle.title);
  });
   
    google.maps.event.addListener(circle,'mouseout',function(){
    this.getMap().getDiv().removeAttribute('title');});

    return circle;
}

function eqfeed_callback(results) {
  map.data.addGeoJson(results);
}

function getInput(){

  const magn = {
    magnmin : document.getElementById("magnmin").value,
    magnmax: document.getElementById("magnmax").value,
  }
  const time = {
    timemin : new Date(document.getElementById("datemin").value),
    timemax : new Date(document.getElementById("datemax").value),
  }

  // To calculate the time difference of two dates
  var timediff = time.timemax.getTime() - time.timemin.getTime();
  
  // To calculate the no. of days between two dates
  var days = timediff / (1000 * 3600 * 24);
  
  alert("magnitude choosen : [" +magn.magnmin+","+magn.magnmax+"] \n period of time between "+time.timemin+" and "+time.timemax);
}





  /* return {
    path: google.maps.SymbolPath.CIRCLE,
    fillColor: "red",
    fillOpacity: 0.2,
    scale: Math.pow(2, magnitude) / 2,
    strokeColor: "white",
    strokeWeight: 0.5,
  };*/