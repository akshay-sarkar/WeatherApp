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
    $scope.weatherResult.$promise.then(function (result) {
        $scope.weatherResult = result;
    });

    //calling current weather api
    weatherService.getCurrentWeather($scope.city);

    $scope.$on('currentWeather:updated', function(event,data) {
     // you could inspect the data to see if what you care about changed, or just update your own scope
     $scope.currentWeatherResult = data;
   });
      
    $scope.convertToCelcius = function(temp){
    	return Math.round(temp - 273.15);
    };

    $scope.convertToDate = function (dt) {
    	return new Date(dt * 1000);
    }

  }]);
