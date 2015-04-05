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
        
      for (var i = 0; i < data.length; i++) {
      if (!data[i].id) {
          data[i].id = 'finda-' + i;
        }
        if(!data[i].location) {
          delete data[i];    }

        else {
            data[i].lat = Number(data[i].location.latitude);
            data[i].lng = Number(data[i].location.longitude);
            delete data[i].location;
        }
      }
      console.log("data processed");
//        console.log(JSON.stringify(data));
        
      var data2 = GeoJSON.parse(data, {Point: ['lat', 'lng']});

      console.log("geojson encoded");
//        console.log(JSON.stringify(data2));

      return data2;
    };

    this.after('initialize', function() {
      // load the data
      this.on(document, 'config', this.onConfig);
    });
  });
});
