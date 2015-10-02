"use strict";angular.module("weatherAppApp",["ngMessages","ngResource","ngRoute"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/forecast",{templateUrl:"views/forecast.html",controller:"ForecastCtrl",controllerAs:"forecast"}).when("/forecast/:days",{templateUrl:"views/forecast.html",controller:"ForecastCtrl",controllerAs:"forecast"}).otherwise({redirectTo:"/"})}]).service("cityService",[function(){this.city="Singapore, SG"}]).service("weatherService",["$resource",function(a){this.getWeather=function(b,c){var d=a("http://api.openweathermap.org/data/2.5/forecast/daily",{callback:"JSON_CALLBACK"},{get:{method:"JSONP"}});return d.get({q:b,cnt:c})}}]).directive("weatherDirective",[function(){return{restrict:"E",templateUrl:"views/partials/weatherReport.html",replace:!0,scope:{weatherObject:"=",convertToCelcius:"&",convertToDate:"&",dateFormat:"@"},link:function(a,b,c){}}}]),angular.module("weatherAppApp").controller("MainCtrl",["$scope","cityService","$location",function(a,b,c){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],a.city=b.city,a.$watch("city",function(c){b.city=a.city}),a.submit=function(){c.path("/forecast")}}]),angular.module("weatherAppApp").controller("ForecastCtrl",["$scope","cityService","weatherService","$routeParams",function(a,b,c,d){a.city=b.city,a.days=d.days||"3",a.weatherResult=c.getWeather(a.city,a.days),a.convertToCelcius=function(a){return Math.round(a-273.15)},a.convertToDate=function(a){return new Date(1e3*a)}}]),angular.module("weatherAppApp").run(["$templateCache",function(a){a.put("views/forecast.html",'<p> <a href="#/">Back to Search</a></p> <h2>{{city}}</h2> <hr> Days : <a href="#/forecast/2">2</a> | <a href="#/forecast/5">5</a> | <a href="#/forecast/7">7</a> <hr> <div ng-repeat="w in weatherResult.list"> <div class="row"> <div class="col-md-12"> <weather-directive weather-object="w" convert-to-celcius="convertToCelcius(dayTimeTemp)" convert-to-date="convertToDate(date)" date-format="yyyy, MMMM d"></weather-directive> </div> </div> </div>'),a.put("views/main.html",'<!-- <div class="jumbotron">\n  <h1>\'Allo, \'Allo!</h1>\n  <p class="lead">\n    <img src="images/yeoman.c582c4d1.png" alt="I\'m Yeoman"><br>\n    Always a pleasure scaffolding your apps.\n  </p>\n  <p><a class="btn btn-lg btn-success" ng-href="#/">Splendid!<span class="glyphicon glyphicon-ok"></span></a></p>\n</div> --> <div class="row marketing"> <div class="col-md-6 col-md-offset-3"> <h4>Forecast by City</h4> <form ng-submit="submit()"> <div class="form-group"> <input type="text" class="form-control" ng-model="city"> </div> <input type="submit" class="btn btn-primary" value="Get Forecast"> </form> </div> </div>'),a.put("views/partials/weatherReport.html",'<div class="panel panel-default"> <div class="panel-heading"> <h3 class="panel-title">{{convertToDate({date: weatherObject.dt}) | date : dateFormat}}</h3> </div> <div class="panel-body"> Daytime Temperature : {{convertToCelcius({dayTimeTemp: weatherObject.temp.day})}} </div> </div>')}]);