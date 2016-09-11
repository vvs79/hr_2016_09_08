'use strict';

angular.module("appResume", ['ngResource', 'ui.bootstrap', 'templates', 'ngRoute', 'ngLoad'])
.factory("Resume", function($resource) {
  return $resource("/resumes/:id/:action.json", {id: "@id"});
})
.factory("ResumePut", function($resource) {
  return $resource("/resumes/:id/:action.json", null, { 'update': {method: 'PATCH'} } );
})
.factory("Education", function($resource) {
  return $resource("/educations/:id.json", {id: "@id"});
})
.factory("Experience", function($resource) {
  return $resource("/experiences/:id.json", {id: "@id"});
})
.factory("Communication", function($resource) {
  return $resource("/communications/:id.json", {id: "@id"});
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
// .factory("AlertService", function($window) {
//   var message = false;

//   var getAlert = function() {
//     return message;
//   };

//   var setAlert = function(type, text) {
//     message = {};
//     message.type = type;
//     message.text = text;
//     setTimeout ( function() { message = false } , 1000 );
//     return message;
//   };

//   return { setAlert: setAlert, getAlert: getAlert };

// })



.controller('ResumeCtrl', function($scope, Resume, $window, Communication) {
  $scope.resumes = Resume.query(function(){ $scope.counter = $scope.resumes.length;
                                            //alert('$scope.resumes - ' + JSON.stringify($scope.resumes[13]));
                                             });
  //$scope.counter = $scope.resumes.length;
  //$scope.comm = 'no';


  //$scope.getComm = function(id) { Resume.get({id: id}).$promise
    //.then(
      //function (success) {
        //$scope.comm = id;
        //$scope.comm = (success.communications) ? success.communications : {};
        //$scope.comm = (JSON.stringify(success.communications)) ? JSON.stringify(success.communications) : 0;
      //},
      //function(error) {
        //
      //}
    //);
  //};

  // $scope.educ = Education.query(function(){
  //   for (var i=0;i<$scope.educ.length;i++) {if ($scope.educ[i].resume_id != $routeParams.id) { $scope.educ.splice(i, 1); --i; }}
  // });

  // $scope.getComm = function(person) {
  //   var dates = person.date.split(','), marks = person.mark.split(','), $scope.dm = [], i;
  //   for (i=0;i<dates.length;++i) {
      
  //   }
  // }
  

  $scope.queryPerson = "";
  $scope.searchAllow = false;
  $scope.searchVal = "Search";
  $scope.searchFunc = function() {
    $scope.searchAllow = !($scope.searchAllow);
    $scope.searchVal = ($scope.searchAllow) ? "Hide Search" : "Search";
    $scope.queryPerson = "";
  };

  $scope.settings = function(col) {
    $scope.queryPerson = "";
    document.getElementsByClassName("dv")[0].className = 'dv ' + col;
  };
  
  $scope.removeResume = function(res) {
    if (confirm("Are You Sure (delete " + res.name + ")?")) {
      res.$remove();
      $scope.resumes.splice($scope.resumes.indexOf(res), 1);
      $scope.counter = $scope.resumes.length;
    }
  }
})




.controller('newResumeCtrl', function($scope, Resume, $window, Education, Experience, Communication) {
  var counter_skill = 1, counter_proff = 1, counter_lang = 1, counter_comm = 1, counter_educ = 1, counter_job = 1;

  $scope.addSkill = function(){
    if (counter_skill < 3)  {
      var newspan = document.createElement('span');
      newspan.innerHTML = '<input type="text" class="form-control" name="personSkill" placeholder="Скіли"/>';
      ++counter_skill;
      document.getElementById('allSkills').appendChild(newspan);
    }
  };

  $scope.addProff = function(){
    if (counter_proff < 3)  {
      var newspan = document.createElement('span');
      newspan.innerHTML = '<input type="text" class="form-control" name="personProff" placeholder="Професійні навички"/>';
      ++counter_proff;
      document.getElementById('allProffs').appendChild(newspan);
    }
  };

  $scope.addLang = function(){
    if (counter_lang < 3)  {
      var newspan = document.createElement('span');
      newspan.innerHTML = '<div class="langDiv"><hr/><select class="form-control" name="lang"><option>Language</option><option>Англійська</option><option>Російська</option><option>Німецька</option><option>Французька</option><option>Італійська</option><option>Польська</option><option>Іспанська</option><option>Португальська</option></select><br/><select class="form-control" name="langLevel"><option>Рівень</option><option>Високий</option><option>Вище середнього</option><option>Середній</option><option>Нище середнього</option><option>Низький</option></select><br/></div>'
      ++counter_lang;
      document.getElementById('allLangs').appendChild(newspan);
    }
  };

  $scope.addCommun = function(){
    if (counter_comm < 3)  {
      var newspan = document.createElement('span');
      newspan.innerHTML = '<div class="commDiv"><hr/><h4 for="">Співбесіда</h4><input type="date" class="form-control" name="communDate" placeholder="Дата"/><br/><input type="text" class="form-control" name="communValue" placeholder="Кількість балів"/></div>'
      ++counter_comm;
      document.getElementById('allCommuns').appendChild(newspan);
    }
  };

  $scope.addEduc = function(){
    if (counter_educ < 3)  {
      var newspan = document.createElement('span');
      newspan.innerHTML = '<div class="educDiv"><hr/><h4 for="">Education</h4><input type="text" class="form-control" name="education" placeholder="Спеціальність"/><label for="">From</label><input type="date" class="form-control" name="educationFrom" placeholder="Навчався З"/><label for="">To</label><input type="date" class="form-control" name="educationTo" placeholder="Навчався До"/><br/><input type="text" class="form-control" name="educationPlace" placeholder="Навчальний заклад"/></div>'
      ++counter_educ;
      document.getElementById('allEduc').appendChild(newspan);
    }
  };

  $scope.addJob = function(){
    if (counter_job < 3)  {
      var newspan = document.createElement('span');
      newspan.innerHTML = '<div class="jobDiv"><hr/><h4 for="">Experience</h4><input type="text" class="form-control" name="job" placeholder="Спеціальність"/><label for="">From</label><input type="date" class="form-control" name="jobFrom" placeholder="Працював З"/><label for="">To</label><input type="date" class="form-control" name="jobTo" placeholder="Працював До"/><br/><input type="text" class="form-control" name="jobPlace" placeholder="Місце роботи"/></div>'
      ++counter_job;
      document.getElementById('allJobs').appendChild(newspan);
    }
  };

  $scope.addResume = function() {
    var proffessions = document.getElementsByName("proffession"), str_proffessions = "", i;
    for (i in proffessions) { if (proffessions[i].checked) str_proffessions += (proffessions[i].value + ',');  }
    $scope.newPerson.proffession = (str_proffessions) ? str_proffessions.slice(0, -1) : "";

    var status = document.getElementsByName("status"), str_status = "";
    for (i in status) { if (status[i].checked)  str_status += (status[i].value + ','); }
    $scope.newPerson.status = (str_status) ? str_status.slice(0, -1) : "";

    var skills = document.getElementsByName("personSkill"), str_skills = "";
    for (i=0; i<skills.length; i++) { if (skills[i].value) { str_skills += (skills[i].value + ','); skills[i].value = ""; } }
    for (i=0; i<=(skills.length-2); i++) { skills[i].parentNode.removeChild(skills[i]); }
    $scope.newPerson.skill= (str_skills) ? str_skills.slice(0, -1) : "";

    var dates = document.getElementsByName("communDate"), str_dates = "",
        marks = document.getElementsByName("communValue"), str_marks = "";
    for (i=0; i<dates.length; i++) { if (dates[i].value && marks[i].value) {
                                      str_dates += (dates[i].value.toString() + ',');
                                      str_marks += (marks[i].value.toString() + ',');
                                      dates[i].value = marks[i].value = "";
                                    }
    }
    if (dates.length > 1) {
      var comm_div = document.getElementsByClassName("commDiv");
      for (i=0;i<=(dates.length-2);++i) { comm_div[0].parentNode.removeChild(comm_div[0]);} }
    $scope.newPerson.date = (str_dates) ? str_dates.slice(0, -1) : "";
    $scope.newPerson.mark = (str_marks) ? str_marks.slice(0, -1) : "";

    var proffs = document.getElementsByName("personProff"), str_proffs = "";
    for (i=0; i<proffs.length; i++) { if (proffs[i].value) { str_proffs += (proffs[i].value + ','); proffs[i].value = ""; } }
    for (i=0; i<=(proffs.length-2); i++) { proffs[i].parentNode.removeChild(proffs[i]); }
    $scope.newPerson.proff= (str_proffs) ? str_proffs.slice(0, -1) : "";

    var works = document.getElementsByName("personWork"), str_works = "";
    for (i in works) { if (works[i].checked)  str_works += (works[i].value + ','); }
    $scope.newPerson.work = (str_works) ? str_works.slice(0, -1) : "";

    var str_lang = '', str_level = '', lang = document.getElementsByName("lang"), level =  document.getElementsByName("langLevel");
    for (i=0;i<lang.length;++i) {
      if (lang[i].value) { 
        str_lang += (lang[i].value + ',');
        str_level += (level[i].value + ',');
        lang[i].value = level[i].value = "";
      }
    }
    $scope.newPerson.language = (str_lang) ? str_lang.slice(0, -1) : "";
    $scope.newPerson.level = (str_level) ? str_level.slice(0, -1) : "";

    if (lang.length > 1) {
      var lang_div = document.getElementsByClassName("langDiv");
      for (i=0;i<=(lang.length-2);++i) { lang_div[0].parentNode.removeChild(lang_div[0]);}
    }


    Resume.save($scope.newPerson)
      .$promise
        .then(
          function (success) {
            //alert(JSON.stringify(success));
            var i, specialty = document.getElementsByName("education"), from_educ =  document.getElementsByName("educationFrom"),
                to_educ =  document.getElementsByName("educationTo"), place_educ = document.getElementsByName("educationPlace");
            for (i=0;i<specialty.length;++i) {
              Education.save({specialty: specialty[i].value, from: from_educ[i].value, to: to_educ[i].value, place: place_educ[i].value, resume_id: success.id}); 
            }
            for (i=0;i<specialty.length;++i) { specialty[i].value = from_educ[i].value = to_educ[i].value = place_educ[i].value = ""; }
            if (specialty.length > 1) {
              var educ_div = document.getElementsByClassName("educDiv");
              for (i=0;i<=(counter_educ-2);++i) { educ_div[0].parentNode.removeChild(educ_div[0]);}
            }

            var specialty = document.getElementsByName("job"), from_job =  document.getElementsByName("jobFrom"),
            to_job =  document.getElementsByName("jobTo"), place_job = document.getElementsByName("jobPlace");
            for (i=0;i<specialty.length;++i) {
              Experience.save({specialty: specialty[i].value, from: from_job[i].value, to: to_job[i].value, place: place_job[i].value, resume_id: success.id}); 
            }
            for (i=0;i<specialty.length;++i) { specialty[i].value = from_job[i].value = to_job[i].value = place_job[i].value = ""; }
            if (specialty.length > 1) {
              var job_div = document.getElementsByClassName("jobDiv");
              for (i=0;i<=(counter_job-2);++i) { job_div[0].parentNode.removeChild(job_div[0]);}
            }

            // var date = document.getElementsByName("communDate"), mark =  document.getElementsByName("communValue");
            // for (i=0;i<date.length;++i) {
            //   Communication.save({date: date[i].value, mark: mark[i].value, resume_id: success.id}); 
            // }
            // for (i=0;i<date.length;++i) { date[i].value = mark[i].value = ""; }
            // if (date.length > 1) {
            //   var comm_div = document.getElementsByClassName("commDiv");
            //   for (i=0;i<=(counter_comm-2);++i) { comm_div[0].parentNode.removeChild(comm_div[0]);}
            // }


            $scope.newResume = {};
            $window.location.href = '/#/'+success.id;
          },
          function(unsuccess) {
          }
        );
  }

})




.controller('editResumeCtrl', function ($scope, ResumePut, $routeParams, $window, Education, Experience, Communication) {
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

  // ResumePut.get({id: $routeParams.id}).$promise
  //     .then(
  //       function (success) {
  //         $scope.person = success.resume;
  //         $scope.comm = success.communication;
  //         $scope.educ = success.education;
  //         $scope.exp = success.experience;

  //       },
  //       function(error) {
  //         alert('ERROR EDIT');
  //       }
  //     );

  $scope.person = ResumePut.get({ id: $routeParams.id //}, function(){
    // var i, j, arr_proffessions = [], arr_status = [];

    // if ($scope.person.proffession) { 
    //   arr_proffessions = $scope.person.proffession.split(',');
    //   for (i in arr_proffessions) {
    //     for (j in $scope.checkboxProff) { 
    //       if (arr_proffessions[i] == $scope.checkboxProff[j].name) {
    //         $scope.checkboxProff[j].selected = true;
    //       }
    //     }
    //   };
    // };


    // if ($scope.person.status) {
    //   arr_status = $scope.person.status.split(',');
    //   for (i in arr_status) {
    //     for (j in $scope.checkboxStatus) {
    //       if (arr_status[i] == $scope.checkboxStatus[j].id) {
    //         $scope.checkboxStatus[j].selected = true;
    //       }
    //     }
    //   };
    // };
  })
  .$promise
      .then(
        function (success) {
          $scope.person = success.resume;
          $scope.educ = success.education;
          $scope.exp = success.experience;

          var i, j, arr_proffessions = [], arr_status = [];

          if ($scope.person.proffession) { 
            arr_proffessions = $scope.person.proffession.split(',');
            for (i in arr_proffessions) {
              for (j in $scope.checkboxProff) { 
                if (arr_proffessions[i] == $scope.checkboxProff[j].name) {
                  $scope.checkboxProff[j].selected = true;
                }
              }
            };
          };

          if ($scope.person.status) {
            arr_status = $scope.person.status.split(',');
            for (i in arr_status) {
              for (j in $scope.checkboxStatus) {
                if (arr_status[i] == $scope.checkboxStatus[j].id) {
                  $scope.checkboxStatus[j].selected = true;
                }
              }
            };
          };
        },
        function(error) {
          alert('ERROR EDIT');
        }
      );

 
  $scope.editResume = function (updatedResume) {
    ResumePut.update({id: $scope.person.id}, updatedResume).$promise
      .then(
        function (success) {
          $window.location.href = '/#/' + $scope.person.id;
        },
        function(error) {
          alert('ERROR');
          //$window.location.href = '/#';
        }
      )
  }
      
})





.controller('showResumeCtrl', function ($scope, Resume, $routeParams, Education, $window, Experience, Communication) {
  //$scope.person = Resume.get({id: $routeParams.id});
  Resume.get({id: $routeParams.id}).$promise
      .then(
        function (success) {
          $scope.person = success.resume;
          $scope.educ = success.education;
          $scope.exp = success.experience;

        },
        function(error) {
          alert('ERROR SHOW');
        }
      );
  //.$promise
    // .then(
    //   function(success) {
    //     $scope.person = resume;
    //   },
    //   function(error) {
    //     // errors
    //   });

  // $scope.educ = Education.query(function(){
  //   for (var i=0;i<$scope.educ.length;i++) {if ($scope.educ[i].resume_id != $routeParams.id) { $scope.educ.splice(i, 1); --i; }}
  // });
  // $scope.exp = Experience.query(function(){
  //   for (var i=0;i<$scope.exp.length;i++) {if ($scope.exp[i].resume_id != $routeParams.id) { $scope.exp.splice(i, 1); --i; }}
  // });
  //$scope.comm = Communication.query(function(){
    //for (var i=0;i<$scope.comm.length;i++) {if ($scope.comm[i].resume_id != $routeParams.id) { $scope.comm.splice(i, 1); --i; }}
  //});

  $scope.removeResume = function(res) {
    if (confirm("Are You Sure (delete " + res.name + ")?")) {
      res.$remove();
      $window.location.href = '/#';
    }
  }
  

});
