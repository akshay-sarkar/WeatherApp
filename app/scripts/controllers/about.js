'use strict';

/**
 * @ngdoc function
 * @name weatherAppApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the weatherAppApp
 */
angular.module('weatherAppApp')
  .controller('ForecastCtrl', ['$scope', 'cityService', 'weatherService', '$routeParams', function ( $scope, cityService, weatherService, $routeParams ) {

    $scope.city = cityService.city;

    $scope.days = $routeParams.days || '3';


    $scope.weatherResult = weatherService.getWeather($scope.city, $scope.days);

    $scope.convertToCelcius = function(temp){
    	return Math.round(temp - 273.15);
    };

    $scope.convertToDate = function (dt) {
    	return new Date(dt * 1000);
    }

  }]);
