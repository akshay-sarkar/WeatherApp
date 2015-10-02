'use strict';

/**
 * @ngdoc overview
 * @name weatherAppApp
 * @description
 * # weatherAppApp
 *
 * Main module of the application.
 */
angular
    .module('weatherAppApp', [
        'ngMessages',
        'ngResource',
        'ngRoute'
    ])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                controllerAs: 'main'
            })
            .when('/forecast', {
                templateUrl: 'views/forecast.html',
                controller: 'ForecastCtrl',
                controllerAs: 'forecast'
            })
            .when('/forecast/:days', {
                templateUrl: 'views/forecast.html',
                controller: 'ForecastCtrl',
                controllerAs: 'forecast'
            })
            .otherwise({
                redirectTo: '/'
            });
    }) // for data exchange between controllers
    .service('cityService', [function() {
        this.city = "Singapore, SG";
    }]) // weatherService for External API call
    .service('weatherService', ['$resource', function($resource) {

        this.getWeather = function(city, days) {

            var weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", {
                callback: "JSON_CALLBACK"
            }, {
                get: {
                    method: "JSONP"
                }
            });

            return weatherAPI.get({
                q: city,
                cnt: days
            });
        }
    }]) // Custom Directive restricted to Element using template
    .directive('weatherDirective', [function() {
        return {
            restrict: 'E',
            templateUrl : 'views/partials/weatherReport.html',
            replace: true,
            scope: {
                weatherObject: '=',
                convertToCelcius: '&',
                convertToDate: '&',
                dateFormat: '@'
            },
            link: function(scope, iElement, iAttrs) {

            }
        };
    }])
