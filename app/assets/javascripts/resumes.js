'use strict';

angular.module("appResume", ['ngResource', 'ui.bootstrap', 'templates', 'ngRoute'])
.factory("Resume", function($resource) {
  return $resource("/resumes/:id/:action.json", {id: "@id"});
})
.factory("ResumePut", function($resource) {
  return $resource("/resumes/:id/:action.json", null, { 'update': {method: 'PATCH'} } );
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
    .when('/:id', {
        templateUrl: "resumes/show.html",
        controller: 'showResumeCtrl'
    })
   .otherwise({
      template : "<h1>None</h1><p>Nothing has been selected</p>"
    });
})
.factory("AlertService", function($window) {
  var message = false;

  var getAlert = function() {
    return message;
  };

  var setAlert = function(type, text) {
    message = {};
    message.type = type;
    message.text = text;
    setTimeout ( function() { message = false } , 1000 );
    return message;
  };

  return { setAlert: setAlert, getAlert: getAlert };

})
.controller('ResumeCtrl', function($scope, Resume) {
  $scope.resumes = Resume.query();
  
  $scope.removeResume = function(res) {
    res.$remove();
    $scope.resumes.splice($scope.resumes.indexOf(res), 1);
  }
})
.controller('newResumeCtrl', function($scope, Resume, $window, AlertService) {
  $scope.alert = AlertService.getAlert();
  alert($scope.alert);

  $scope.addResume = function() {
    var proffessions = document.getElementsByName("proffession"), str_proffessions = "", i;
    for (i in proffessions) { if (proffessions[i].checked)  
                                str_proffessions += (proffessions[i].value + ',');  }

    var status = document.getElementsByName("status"), str_status = "";
    for (i in status) { if (status[i].checked)  str_status += (status[i].value + ','); }
    
    $scope.newPerson.proffession = str_proffessions.slice(0, -1);
    $scope.newPerson.status = str_status.slice(0, -1);

    Resume.save($scope.newPerson).$promise
      .then(
        function (success) {
          AlertService.setAlert('success', success.response);
          $scope.newResume = {};
          $window.location.href = '/#';
        },
        function(unsuccess) {
          AlertService.setAlert('danger', unsuccess.data.error);
          $scope.alert = AlertService.getAlert();
        }
      );
  }

})
.controller('editResumeCtrl', function ($scope, ResumePut, $routeParams, $window) {
  $scope.checkboxProff = [
    { name: 'Front-end', selected: false },
    { name: 'Back-end',  selected: false }
  ];

  $scope.checkboxStatus = [
    { name: 'Нове',               id: 'New',      selected: false },
    { name: 'В розгляді',         id: 'Consider', selected: false },
    { name: 'Пройшов співбесіду', id: 'Yes',      selected: false },
    { name: 'Резерв',             id: 'Reserve',  selected: false },
    { name: 'Відмовився',         id: 'Refused',  selected: false },
    { name: 'Не підходить',       id: 'No',       selected: false }
  ];

  $scope.person = ResumePut.get({ id: $routeParams.id }, function(){
    var i, j,
        arr_proffessions = $scope.person.proffession.split(','),
        arr_status = $scope.person.status.split(',');

    for (i in arr_status) {
      for (j in $scope.checkboxStatus) {
        if (arr_status[i] == $scope.checkboxStatus[j].id) {
          $scope.checkboxStatus[j].selected = true;
        }
      }
    };

    for (i in arr_proffessions) {
      for (j in $scope.checkboxProff) { 
        if (arr_proffessions[i] == $scope.checkboxProff[j].name) {
          $scope.checkboxProff[j].selected = true;
        }
      }
    };

  });

 
  $scope.editResume = function (updatedResume) {
    ResumePut.update({id: $scope.person.id}, updatedResume).$promise
      .then(
        function (success) {
          $window.location.href = '/#/' + $scope.person.id;
        },
        function(error) {
          $window.location.href = '/#';
        }
      )
  }
      
})
.controller('showResumeCtrl', function ($scope, Resume, $routeParams) {
  $scope.person = Resume.get({id: $routeParams.id});//.$promise
    // .then(
    //   function(success) {
    //     $scope.person = resume;
    //   },
    //   function(error) {
    //     // errors
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
