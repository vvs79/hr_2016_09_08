'use strict';

angular.module("appResume", ['ngResource', 'ui.bootstrap', 'templates', 'ngRoute'])
.factory("Resume", function($resource) {
  return $resource("/resumes/:id/:action.json", {id: "@id", 'update': {method: 'PUT'} });
})
.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: "resumes/index.html",
      controller: 'ResumeCtrl'
    })
    .when('/new', {
      templateUrl: "resumes/new.html",
      controller: 'newResumeCtrl'
    })
    .when('/:id/edit', {
        templateUrl: "resumes/edit.html",
        controller: 'editResumeCtrl'
    })
    .when('/:id/show', {
        templateUrl: "resumes/show.html",
        controller: 'showResumeCtrl'
    })
   .otherwise({
      template : "<h1>None</h1><p>Nothing has been selected</p>"
    });
})
.controller('ResumeCtrl', function($scope, Resume) {
  $scope.resumes = Resume.query();

  // $scope.addResume = function() {
  //   var resum = Resume.save($scope.newResume);
  //   $scope.resumes.push(resum);
  //   $scope.newResume = {};
  // }

  $scope.removeResume = function(res) {
    res.$remove();
    $scope.resumes.splice($scope.resumes.indexOf(res), 1);
  }
})
.controller('newResumeCtrl', function($scope, Resume) {

  $scope.addResume = function() {
    var resum = Resume.save($scope.newResume);
    $scope.resumes.push(resum);
    $scope.newResume = {};
  }

})
.controller('editResumeCtrl', function ($scope, $window, Resume, $http, $routeParams) {
  $scope.person = Resume.get({id: $routeParams.id});//, action: 'edit'});
  $scope.editResume = function (updatedResume) {
    Resume.update({id: $scope.person.id}, updatedResume);//.$promise
      // .then(
      //   function (success) {
      //     //$window.location.href = '/resumes#/' + $scope.person.id;
      //   },
      //   function(unsuccess) {
      //   }
      // )
  }
      
})
.controller('showResumeCtrl', function ($scope, $window, Resume, $http, $routeParams) {
  $scope.person = Resume.get({id: $routeParams.id});//.$promise
    // .then(
    //   function(success) {
    //     $scope.person = resume;
    //   },
    //   function(error) {
    //    // fail
    //   });
  //$scope.person = Resume.get({id: $routeParams.id});
  // $scope.getResume = function() { 
  //   Resume.get({id: $routeParams.id}).$promise
  //     .then(
  //       function(success) {
  //         $scope.person = success.resume;
  //       },
  //       function(unsuccess) {
  //        // $window.location.href = '/resumes#/';
  //       }
  //     )
  //   }
  // $scope.getResume();
});
