'use strict';

/**
 * @ngdoc function
 * @name weatherAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the weatherAppApp
 */
angular.module('weatherAppApp')
  .controller('MainCtrl', ['$scope','cityService', '$location', function ( $scope, cityService, $location) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.city = cityService.city;

    $scope.$watch('city', function (argument) {
    	cityService.city = $scope.city;
    });

    $scope.submit = function(){
      $location.path("/forecast");
    }
  }]);
