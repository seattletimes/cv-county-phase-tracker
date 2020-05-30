//load our custom elements
require("component-leaflet-map");
require("component-responsive-frame");

//get access to Leaflet and the map
var element = document.querySelector("leaflet-map");
var L = element.leaflet;
var map = element.map;


var ich = require("icanhaz");
var templateFile = require("./_popup.html");
ich.addTemplate("popup", templateFile);

var data = require("./countyWA.geo.json");

var mapElement = document.querySelector("leaflet-map");

if (mapElement) {
  var L = mapElement.leaflet;
  var map = mapElement.map;

  map.scrollWheelZoom.disable();

  var focused = false;

  var all = "phase";

//   var commafy = s => (s * 1).toLocaleString().replace(/\.0+$/, "");

  // data.features.forEach(function(f) {
  //   ["percent", "single", "joint"].forEach(function(prop) {
  //     f.properties[prop] = (f.properties[prop] * 100).toFixed(1);
  //   });
  //   ["returns"].forEach(function(prop) {
  //     f.properties[prop] = commafy ((f.properties[prop]));
  //   });
  // });


  var onEachFeature = function(feature, layer) {
    layer.bindPopup(ich.popup(feature.properties))
    layer.on({
      mouseover: function(e) {
        layer.setStyle({ weight: 2, fillOpacity: .8 });
      },
      mouseout: function(e) {
        if (focused && focused == layer) { return }
        layer.setStyle({ weight: 1, fillOpacity: 0.6 });
      }
    });
  };

  var getColor = function(d) {
    var value = d[all];
    if (typeof value == "string") {
      value = Number(value.replace(/,/, ""));
    }
    // console.log(value)
    if (typeof value != "undefined") {
      // condition ? if-true : if-false;
     return value >= 4 ? '#B22118' :
            value >= 3 ? '#ED8A52' :
            value >= 2 ? '#F4BD6E' :
             
             '#FAE2C1' ;
    } else {
      return "gray"
    }
  };

  var style = function(feature) {
    var s = {
      fillColor: getColor(feature.properties),
      weight: 1,
      opacity: .25,
      color: '#000',
      fillOpacity: 0.6
    };
    return s;
  }

  var geojson = L.geoJson(data, {
    style: style,
    onEachFeature: onEachFeature
  }).addTo(map);

}

var onEachFeature = function(feature, layer) {
  layer.bindPopup(ich.popup(feature.properties))
};

 map.scrollWheelZoom.disable();