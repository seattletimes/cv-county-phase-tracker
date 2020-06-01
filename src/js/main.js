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


//   var onEachFeature = function(feature, layer) {
//     layer.bindPopup(ich.popup(feature.properties))
//     layer.on({
//       mouseover: function(e) {
//         layer.setStyle({ weight: 2, fillOpacity: .8 });
//       },
//       mouseout: function(e) {
//         if (focused && focused == layer) { return }
//         layer.setStyle({ weight: 1, fillOpacity: 0.6 });
//       }
//     });
//   };

  var getColor = function(d) {
    var value = window.phaseMap[d.JURLBL].phase;

    if (typeof value == "string") {
      value = Number(value.replace(/,/, ""));
    }

    // console.log(value)
    if (typeof value != "undefined") {
      // condition ? if-true : if-false;
     return value >= 4 ? '#fadcbb' :
            value >= 3 ? '#f4bd71' :
            value >= 2 ? '#ea8229' :
             
             '#ab5928' ;
    } else {
      return "gray"
    }
  };

  var getStroke = function(d) {
    var value = window.phaseMap[d.JURLBL].eligible;

    if (typeof value == "string") {
      value = Number(value.replace(/,/, ""));
    }
    // console.log(value)
    if (typeof value != "undefined") {
      // condition ? if-true : if-false;
     return value >= 1 ? '#000' :
             '#fff' ;
    } else {
      return "white"
    }
  };

  var style = function(feature) {
    var s = {
      fillColor: getColor(feature.properties),
      weight: 2,
      opacity: .75,
      color: getStroke(feature.properties),
      fillOpacity: 0.7
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

 map.setView([47.2, -120.9], 7);
