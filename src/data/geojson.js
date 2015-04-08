define(function(require, exports, module) {
  'use strict';
  var flight = require('flight');
  var $ = require('jquery');
  var _ = require('lodash');



  module.exports = flight.component(function loader() {
    this.onConfig = function onConfig(ev, config) {
  // load the geojson
      var encodedURL = encodeURI(config.geojson_source);


      $.getJSON(encodedURL, function(data) {
        this.trigger('data', this.processData(data));
      }.bind(this));
    };


    this.processData = function processData(data) {
      return {
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
    };

    this.after('initialize', function() {
      // load the data
      this.on(document, 'config', this.onConfig);
    });
  });
});
