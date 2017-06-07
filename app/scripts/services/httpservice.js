'use strict';

/**
 * @ngdoc service
 * @name luZhouApp.httpService
 * @description
 * # httpService
 * Service in the luZhouApp.
 */
angular.module('luZhouApp')
  .service('httpService', function ($http,$q) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.getData = function(endpoint, method, headers, params){
      var defer = $q.defer();
      $http({
        url: endpoint,
        method: "GET",
        headers: headers,
        params: params,
      }).success(function (data) {
        defer.resolve(data);
      }).
      error(function (data, status, headers, config) {
        // defer.resolve(data);
        defer.reject(data);
      });
      return defer.promise;

    }
  });
