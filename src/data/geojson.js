define(function(require, exports, module) {
  'use strict';
  var flight = require('flight');
  var $ = require('jquery');
  var _ = require('lodash');



  module.exports = flight.component(function loader() {
    this.onConfig = function onConfig(ev, config) {
  // load the geojson
        var data_json = true;
        var data_source = "";
    if (config.data_type === "flat") {
           data_source = config.geojson_source;
      }
      else if(config.data_type === "soql") {
          data_json = false;

          data_source = encodeURI(config.geojson_source);

      }
       
        $.getJSON(data_source, function(data) {
            this.trigger('data', this.processData(data, data_json));
          }.bind(this));
    };


    this.processData = function processData(data, data_json) {
        if(data_json){
            data.features.forEach(function(feature, index) {
            if (!feature.id) {
              feature.id = 'finda-' + index;
            }
          });
          
      }else{

            data = {
            type: "FeatureCollection",
            features: _.chain(data)
              .filter('location')
              .map(function(item, index) {
                var id = item.id || 'finda-' + index;
                return {
                  id: id,
                  type: "Feature",
                  geometry: {
                    type: "Point",
                    coordinates: [parseFloat(item.location.longitude),
                                  parseFloat(item.location.latitude)]
                  },
                  properties: item
                };
              })
              .value()
          };
      }
        return data;  
    };

    this.after('initialize', function() {
      // load the data
      this.on(document, 'config', this.onConfig);
    });
  });
});
