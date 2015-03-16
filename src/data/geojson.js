define(function(require, exports, module) {
  'use strict';
  var flight = require('flight');
  var $ = require('jquery');
  var GeoJSON = require(['../../lib/geojson'], function(){
    var data1 = [
    { name: 'Location A', category: 'Store', street: 'Market', lat: 39.984, lng: -75.343 },
    { name: 'Location B', category: 'House', street: 'Broad', lat: 39.284, lng: -75.833 },
    { name: 'Location C', category: 'Office', street: 'South', lat: 39.123, lng: -74.534 }
  ];

  console.log (data1);
    console.log(GeoJSON.parse(data1, {Point: ['lat', 'lng']}));
  });



  module.exports = flight.component(function loader() {
    this.onConfig = function onConfig(ev, config) {
      // load the geojson
      var encodedURL = encodeURI(config.geojson_source);

    console.log(encodedURL);

      $.getJSON(encodedURL, function(data) {
        this.trigger('data', this.processData(data));
      }.bind(this));
    };

    this.processData = function processData(data) {
      for (var i = 0; i < data.length; i++) {
      if (!data[i].id) {
          data[i].id = 'finda-' + i;
        }
        if(!data[i].location) {
          delete data[i];    }

        else {
            data[i].lat = data[i].location.latitude;
            data[i].lng = data[i].location.longitude;
        }
      }
      console.log("data processed");
      data = GeoJSON.parse(data, {Point: ['lat, lng']});
      console.log("geojson encoded");

  // give each feature an ID if it doesn't have one already
  // data.features.forEach(function(feature, index) {
  //   if (!feature.id) {
  //     feature.id = 'finda-' + index;
  //   }
  //   if(!feature.location) {
  //     delete feature[index];    }
  //
  //   else {
  //       feature.lat = feature.location.latitude;
  //       feature.lng = feature.location.longitude;
  //   }
  //
  // });
    return data;
  };

    this.after('initialize', function() {
      // load the data
      this.on(document, 'config', this.onConfig);
    });
  });
});
