define(function(require, exports, module) {
  'use strict';
  var flight = require('flight');
  var $ = require('jquery');
  
    
    
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
        console.log("Fake Data");
        var data1 = [
    { name: 'Location A', category: 'Store', street: 'Market', lat: 39.984, lng: -75.343 },
    { name: 'Location B', category: 'House', street: 'Broad', lat: 39.284, lng: -75.833 },
    { name: 'Location C', category: 'Office', street: 'South', lat: 39.123, lng: -74.534 }
  ];

  console.log (data1);
    console.log(GeoJSON.parse(data1, {Point: ['lat', 'lng']}));
        
        
        console.log("Data");
        console.log(data);
      for (var i = 0; i < data.length; i++) {
      if (!data[i].id) {
          data[i].id = 'finda-' + i;
        }
        if(!data[i].location) {
          delete data[i];    }

        else {
            data[i].lat = parseFloat(data[i].location.latitude);
            data[i].lng = parseFloat(data[i].location.longitude);
            delete data[i].location;
        }
      }
      console.log("data processed");
        console.log(JSON.stringify(data));
        var data2 = data;
      data2 = GeoJSON.parse(data2, {Point: ['lat, lng']});
      console.log("geojson encoded");
        console.log(JSON.stringify(data2));

      return data2;
    };

    this.after('initialize', function() {
      // load the data
      this.on(document, 'config', this.onConfig);
    });
  });
});
